const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');const vm=require('node:vm');
const ctx={window:{}};vm.createContext(ctx);vm.runInContext(fs.readFileSync('core.js','utf8'),ctx);vm.runInContext(fs.readFileSync('data.js','utf8'),ctx);
const C=ctx.window.SAMT_CORE,D=ctx.window.SAMT_DATA;
test('fixed programme commitments and bilingual content are intact',()=>{
  assert.equal(D.stations.reduce((n,s)=>n+s.weeks,0),16);assert.equal(D.stations.map(s=>s.id).join(','),'uae,uk,fr,us');assert.equal(D.weeks.length,16);assert.equal(D.domains.reduce((n,d)=>n+d.weight,0),100);
  function check(v){if(v&&typeof v==='object'){if('ar'in v||'en'in v){assert.ok(v.ar&&v.en);}else Object.values(v).forEach(check);}}check(D);
});
test('a nomination must progress through eligibility and a second assessor before selection',()=>{
  const s=C.seed();const id=C.nominate(s,{kind:'civilian',career:'early',function:'finance',eligibility:{mod:true,release:false,evidence:true}});
  assert.throws(()=>C.transition(s,id,'eligible','Evidence checked'),/eligibility_required/);
  s.candidates.at(-1).eligibility.release=true;C.transition(s,id,'eligible','Eligibility reviewed');C.transition(s,id,'assessing','Assessment started');
  assert.throws(()=>C.transition(s,id,'selected','Strong evidence'),/invalid_transition/);
  assert.throws(()=>C.transition(s,id,'panel','Strong evidence'),/second_assessor/);
  s.candidates.at(-1).secondAssessor=true;C.transition(s,id,'panel','Independent review completed');
  s.candidates.at(-1).secondAssessor=false;
  assert.throws(()=>C.transition(s,id,'selected','Panel recommends admission'),/second_assessor/);
  assert.throws(()=>C.transition(s,id,'waitlist','Panel recommends reserve'),/second_assessor/);
  s.candidates.at(-1).secondAssessor=true;C.transition(s,id,'selected','Panel recommends admission');
  assert.ok(s.fellows.some(f=>f.id===id));assert.equal(C.validState(s),true);
});
test('capacity cannot exceed 20, undercut selected fellows, or admit beyond its limit',()=>{
  const s=C.seed();assert.throws(()=>C.setCapacity(s,21),/invalid_capacity/);assert.throws(()=>C.setCapacity(s,3),/invalid_capacity/);C.setCapacity(s,4);
  assert.throws(()=>C.transition(s,'D-005','selected','Panel recommends admission'),/capacity_full/);
  C.transition(s,'D-005','waitlist','Cohort capacity is full');assert.equal(s.fellows.length,4);
});
test('scores, learning completion and assessment require valid values and evidence',()=>{
  const s=C.seed();assert.equal(C.weighted([5,5,5,5,5]),100);assert.equal(C.weighted([1,1,1,1,1]),20);assert.throws(()=>C.weighted([6,3,3,3,3]),/invalid_scores/);
  assert.throws(()=>C.saveWeek(s,'D-001',7,'',true),/evidence_required/);C.saveWeek(s,'D-001',7,'Fictional evidence describing a readiness review.',true);assert.ok(s.fellows[0].completed.includes(7));
  C.saveWeek(s,'D-001',7,'Draft sample evidence only.',false);assert.ok(!s.fellows[0].completed.includes(7));
  assert.throws(()=>C.saveAssessment(s,'D-001',Array(8).fill(4),''),/evidence_required/);C.saveAssessment(s,'D-001',Array(8).fill(4),'Sample assessor evidence and follow-up action.');assert.equal(s.fellows[0].assessmentSaved,true);
});
test('cost scenarios use 91 days abroad and reject invalid entries',()=>{
  assert.equal(C.budget().base,1947500);assert.equal(Math.round(C.budget().total),2239625);assert.equal(Math.round(C.budget({n:20}).total),4272250);assert.throws(()=>C.budget({n:21}),/invalid_budget/);assert.throws(()=>C.budget({lodging:-1}),/invalid_budget/);
});
test('malformed saved state is rejected',()=>{assert.equal(C.validState(C.seed()),true);assert.equal(C.validState({version:1}),false);const s=C.seed();s.candidates[0].scores=[100];assert.equal(C.validState(s),false);});
