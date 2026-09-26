const fs=require('node:fs');const vm=require('node:vm');const path=require('node:path');
const base=path.resolve(__dirname,'..');const ctx={window:{}};vm.createContext(ctx);vm.runInContext(fs.readFileSync(path.join(base,'data.js'),'utf8'),ctx);
const d=ctx.window.SAMT_DATA;fs.writeFileSync(path.join(base,'docs','programme-content.json'),JSON.stringify(d,null,2));
for(const lang of ['ar','en']){
  const t=x=>typeof x==='object'?x[lang]:x;
  const lines=[`# ${lang==='ar'?'مقترح اعتماد مبادرة سمت لإعداد قيادات وزارة الدفاع':'SAMT proposal for Ministry of Defence leadership development'}`,'',lang==='ar'?'مقدم المبادرة أحمد يونس يوسف الحمادي | 25 سبتمبر 2026 | الإصدار 1.0':'Proposed by Ahmed Younis Yousif Alhammadi | 25 September 2026 | Version 1.0',''];
  d.proposal.forEach(s=>{lines.push('## '+t(s.title),'');if(s.paragraphs)s.paragraphs.forEach(p=>lines.push(t(p),''));if(s.rows){lines.push('| '+s.rows[0].map(t).join(' | ')+' |','| '+s.rows[0].map(()=>'---').join(' | ')+' |');s.rows.slice(1).forEach(r=>lines.push('| '+r.map(t).join(' | ')+' |'));lines.push('');}});
  lines.push('## '+(lang==='ar'?'ملحق المحطات والجهات المقترحة':'Appendix on stations and proposed hosts'),'');
  d.stations.forEach(s=>lines.push('### '+t(s.country),`${lang==='ar'?'الأسابيع':'Weeks'} ${s.start}–${s.end}`,'',t(s.description),'',s.hosts.map(t).join(' · '),'',t(s.output),'',t(s.note),''));
  lines.push('## '+(lang==='ar'?'ملحق خطة الأسابيع':'Appendix on the weekly plan'),'');d.weeks.forEach(([h,p],i)=>lines.push(`### ${i+1} ${t(h)}`,'',t(p),''));
  lines.push('## '+(lang==='ar'?'ملحق الجدارات والأدلة':'Appendix on competencies and evidence'),'');d.domains.forEach(s=>lines.push('### '+t(s.name)+` (${s.weight}%)`,'',t(s.description),'',t(s.evidence),''));
  lines.push('## '+(lang==='ar'?'المراجع وحدود الاستدلال':'References and limits of evidence'),'');d.sources.forEach(s=>lines.push(`- [${s.id}] [${t(s.title)}](${s.url}) — ${s.publisher}. ${t(s.use)}`));
  fs.writeFileSync(path.join(base,'docs',`SAMT_Approval_Proposal_${lang.toUpperCase()}.md`),lines.join('\n')+'\n');
}
