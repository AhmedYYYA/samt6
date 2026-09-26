(function (root) {
  'use strict';
  const selectionWeights = [30,25,20,15,10];
  const competencyWeights = [20,15,15,15,10,10,10,5];
  const stages = ['nominated','eligible','assessing','panel','selected','waitlist','rejected'];
  const functions = ['operations','capability','people','finance','logistics','technology'];
  const transitions = {nominated:['eligible','rejected'],eligible:['assessing','rejected'],assessing:['panel','rejected'],panel:['selected','waitlist','rejected'],waitlist:['panel'],selected:[],rejected:[]};
  const clone = x => JSON.parse(JSON.stringify(x));
  function weighted(values,weights=selectionWeights) {
    if (!Array.isArray(values) || values.length!==weights.length || values.some(x=>!Number.isFinite(x)||x<1||x>5)) throw new Error('invalid_scores');
    return Math.round(values.reduce((sum,v,i)=>sum+v*weights[i],0)/5);
  }
  function seed() {
    const stageList=['selected','selected','selected','selected','panel','panel','assessing','assessing','eligible','eligible','nominated','nominated'];
    return {version:1,capacity:10,sequence:12,
      candidates:stageList.map((stage,i)=>({id:`D-${String(i+1).padStart(3,'0')}`,kind:i%2?'civilian':'military',career:i%3?'mid':'early',function:functions[i%6],stage,eligibility:{mod:true,release:true,evidence:true},scores:[3+i%3,4,3+(i+1)%3,4,3+i%2],secondAssessor:i<8,notes:[],created:'2026-09-01'})),
      fellows:Array.from({length:4},(_,i)=>({id:`D-${String(i+1).padStart(3,'0')}`,completed:Array.from({length:3+i},(_,j)=>j+1),reflections:{},baseline:[2,2,3,2,2,3,2,2],current:[3+i%2,3,4,3,3,4,3,3],assessmentNote:'',assessmentSaved:false,mentor:[1,2].slice(0,i%3),project:i===0?'progress':'planned',projectNote:''})),
      audit:[{at:'2026-09-01T09:00:00Z',type:'seed',id:'DEMO'}]
    };
  }
  function record(state,type,id){state.audit.unshift({at:new Date().toISOString(),type,id});state.audit=state.audit.slice(0,200);}
  function nominate(state,details) {
    if(!['military','civilian'].includes(details.kind)||!['early','mid'].includes(details.career)||!functions.includes(details.function))throw new Error('invalid_nomination');
    if(!details.eligibility?.mod)throw new Error('mod_required');
    const id=`D-${String(++state.sequence).padStart(3,'0')}`;
    state.candidates.push({id,kind:details.kind,career:details.career,function:details.function,stage:'nominated',eligibility:clone(details.eligibility),scores:[3,3,3,3,3],secondAssessor:false,notes:[],created:new Date().toISOString().slice(0,10)});
    record(state,'nomination',id);return id;
  }
  function transition(state,id,target,reason){
    const c=state.candidates.find(x=>x.id===id);
    if(!c||!stages.includes(target)||!transitions[c.stage].includes(target))throw new Error('invalid_transition');
    if(!reason||reason.trim().length<8)throw new Error('reason_required');
    if(['eligible','assessing','panel','selected','waitlist'].includes(target)&&!Object.values(c.eligibility).every(Boolean))throw new Error('eligibility_required');
    if(target==='panel'&&!c.secondAssessor)throw new Error('second_assessor');
    if(target==='selected'&&state.fellows.length>=state.capacity)throw new Error('capacity_full');
    weighted(c.scores);
    c.stage=target;c.notes.push({at:new Date().toISOString(),text:reason.trim()});
    if(target==='selected')state.fellows.push({id,completed:[],reflections:{},baseline:Array(8).fill(2),current:Array(8).fill(2),assessmentNote:'',assessmentSaved:false,mentor:[],project:'planned',projectNote:''});
    record(state,'decision',id);
  }
  function setCapacity(state,n){if(!Number.isInteger(n)||n<1||n>20||n<state.fellows.length)throw new Error('invalid_capacity');state.capacity=n;record(state,'capacity','DEMO');}
  function saveWeek(state,id,week,note,done){
    const f=state.fellows.find(x=>x.id===id);
    if(!f||!Number.isInteger(week)||week<1||week>16)throw new Error('invalid_week');
    if(done&&(!note||note.trim().length<12))throw new Error('evidence_required');
    f.reflections[week]=String(note).trim().slice(0,1500);
    f.completed=f.completed.filter(x=>x!==week);if(done)f.completed.push(week);f.completed.sort((a,b)=>a-b);record(state,'learning',id);
  }
  function saveAssessment(state,id,scores,note){
    const f=state.fellows.find(x=>x.id===id);if(!f)throw new Error('invalid_fellow');
    weighted(scores,competencyWeights);if(!note||note.trim().length<12)throw new Error('evidence_required');
    f.current=clone(scores);f.assessmentNote=note.trim().slice(0,1500);f.assessmentSaved=true;record(state,'assessment',id);
  }
  function budget({n=10,fee=45000,lodging=900,daily=350,travel=18000,fixed=180000,contingency=15}={}){
    if(!Number.isInteger(n)||n<1||n>20||[fee,lodging,daily,travel,fixed,contingency].some(x=>!Number.isFinite(x)||x<0)||contingency>100)throw new Error('invalid_budget');
    const perPerson=fee+91*(lodging+daily)+travel, base=fixed+n*perPerson;
    return {perPerson,base,contingency:base*contingency/100,total:base*(1+contingency/100)};
  }
  function validState(s){
    if(!s||s.version!==1||!Array.isArray(s.candidates)||!Array.isArray(s.fellows)||!Array.isArray(s.audit)||!Number.isInteger(s.sequence)||s.sequence<s.candidates.length)return false;
    if(!Number.isInteger(s.capacity)||s.capacity<1||s.capacity>20||s.fellows.length>s.capacity)return false;
    const ids=s.candidates.map(c=>c.id);if(new Set(ids).size!==ids.length)return false;
    try {for(const c of s.candidates){if(!/^D-\d{3,}$/.test(c.id)||!stages.includes(c.stage)||!c.eligibility||['mod','release','evidence'].some(k=>typeof c.eligibility[k]!=='boolean')||!Array.isArray(c.notes)||!['military','civilian'].includes(c.kind)||!['early','mid'].includes(c.career)||!functions.includes(c.function))return false;weighted(c.scores);}
      for(const f of s.fellows){if(!ids.includes(f.id)||s.candidates.find(c=>c.id===f.id).stage!=='selected'||!Array.isArray(f.completed)||!f.reflections||!Array.isArray(f.mentor)||f.completed.some(w=>!Number.isInteger(w)||w<1||w>16))return false;weighted(f.baseline,competencyWeights);weighted(f.current,competencyWeights);}
      if(new Set(s.fellows.map(f=>f.id)).size!==s.fellows.length)return false;
    }catch{return false;}return true;
  }
  root.SAMT_CORE={seed,clone,weighted,stages,functions,transitions,nominate,transition,setCapacity,saveWeek,saveAssessment,budget,validState,record,selectionWeights,competencyWeights};
})(typeof window!=='undefined'?window:globalThis);
