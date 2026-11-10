// One accessible dialog shared by all examination cards.
const helpDialog=document.createElement('dialog');
helpDialog.className='help-dialog';
helpDialog.setAttribute('aria-labelledby','help-title');
helpDialog.innerHTML='<form method="dialog"><button class="help-close" aria-label="关闭检查说明">关闭 ×</button></form><span class="eyebrow">检查说明 · HELP</span><h2 id="help-title"></h2><div id="help-body"></div><p class="muted">这是检查项目的简明介绍，不能替代医生建议。具体检查、准备要求和预约安排请向就诊医院确认。</p>';
document.body.append(helpDialog);
let helpTrigger;
document.querySelector('#cards').addEventListener('click',event=>{
 const button=event.target.closest('[data-help]');
 if(!button)return;
 const p=PLAN.find(p=>p[0]===button.dataset.help);
 if(!p)return;
 helpTrigger=button;
 const d=dates(p);
 helpDialog.querySelector('#help-title').textContent=p[1];
 helpDialog.querySelector('#help-body').innerHTML=`<h3>这项检查做什么？</h3><p>${escape(p[10])}</p><h3>什么时候安排？</h3><p>参考窗口：${d.start} 至 ${d.end}。<br>当前建议：${d.date}，${week(d.date)}。</p><h3>去之前准备什么？</h3><p>建议从 ${add(d.date,-p[9])} 起询问号源。带上身份证、医保凭证及既往检查报告；向医院确认是否空腹、憋尿或需先开检查单。已有实际预约时，以预约信息和医生安排为准。</p>`;
 helpDialog.showModal();
});
helpDialog.addEventListener('click',event=>{
 if(event.target!==helpDialog)return;
 const r=helpDialog.getBoundingClientRect();
 if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)helpDialog.close();
});
helpDialog.addEventListener('close',()=>{if(helpTrigger?.isConnected)helpTrigger.focus()});
