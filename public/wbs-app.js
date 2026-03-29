const PHASES=[
  {id:1,short:'F1',start:0,end:6,color:'#3B8BD4',desc:'Projektowanie i prototypowanie: architektura systemu, projekt PCB, zamek i gateway (M1–6).'},
  {id:2,short:'F2',start:6,end:14,color:'#1D9E75',desc:'Testy jednostkowe i integracyjne, certyfikacja ZigBee i normy bezpieczeństwa (M7–14).'},
  {id:3,short:'F3',start:14,end:20,color:'#D85A30',desc:'Uruchomienie systemu u pierwszych klientów, zbieranie feedbacku (M15–20).'},
  {id:4,short:'F4',start:20,end:24,color:'#9B59B6',desc:'Wprowadzenie na rynek, zarządzanie 1000+ lokalizacji (M21–24).'},
];
const WBS=[
  {code:'1',  name:'Zamek Elektroniczny',              level:1,start:0, end:8, phase:1},
  {code:'1.1',name:'Projekt PCB i elektroniki',        level:2,start:0, end:4, phase:1},
  {code:'1.2',name:'Moduł ZigBee',                    level:2,start:1, end:5, phase:1},
  {code:'1.3',name:'Pinpad i interfejs',               level:2,start:2, end:6, phase:1},
  {code:'1.4',name:'Zasilanie i klucz awaryjny',       level:2,start:3, end:7, phase:1},
  {code:'1.5',name:'Obudowa i mechanika',              level:2,start:4, end:8, phase:1},
  {code:'2',  name:'Gateway Komunikacyjny',            level:1,start:0, end:7, phase:1},
  {code:'2.1',name:'Projekt PCB gateway',              level:2,start:0, end:3, phase:1},
  {code:'2.2',name:'Integracja sieci ZigBee',          level:2,start:1, end:5, phase:1},
  {code:'2.3',name:'Moduł serwer–urządzenie',          level:2,start:2, end:6, phase:1},
  {code:'2.4',name:'Integracja z siecią domową',       level:2,start:3, end:7, phase:1},
  {code:'3',  name:'Aplikacja Webowa',                 level:1,start:2, end:16,phase:1},
  {code:'3.1',name:'Architektura i backend',           level:2,start:2, end:8, phase:1},
  {code:'3.2',name:'Panel zarządzania dostępem',       level:2,start:5, end:12,phase:2},
  {code:'3.3',name:'Moduł serwisantów',                level:2,start:7, end:13,phase:2},
  {code:'3.4',name:'Zdalne administrowanie',           level:2,start:8, end:14,phase:2},
  {code:'3.5',name:'Interfejs UI/UX',                  level:2,start:10,end:16,phase:2},
  {code:'4',  name:'Algorytm Rotacyjny Kluczy',        level:1,start:1, end:11,phase:1},
  {code:'4.1',name:'Implementacja 12-cyfrowego seed',  level:2,start:1, end:5, phase:1},
  {code:'4.2',name:'Synchronizacja zamek–serwer',      level:2,start:3, end:7, phase:1},
  {code:'4.3',name:'Kody czasowe dla gości',           level:2,start:4, end:8, phase:2},
  {code:'4.4',name:'Jednorazowe kody serwisowe',       level:2,start:6, end:9, phase:2},
  {code:'4.5',name:'Autoryzacja lokalna (offline)',    level:2,start:7, end:11,phase:2},
  {code:'5',  name:'Testy i Certyfikacja',             level:1,start:6, end:14,phase:2},
  {code:'5.1',name:'Testy jednostkowe i integracyjne', level:2,start:6, end:10,phase:2},
  {code:'5.2',name:'Testy bezpieczeństwa',             level:2,start:8, end:12,phase:2},
  {code:'5.3',name:'Certyfikacja ZigBee',              level:2,start:9, end:13,phase:2},
  {code:'5.4',name:'Certyfikacja norm',                level:2,start:10,end:14,phase:2},
  {code:'5.5',name:'Testy użyteczności',               level:2,start:11,end:14,phase:2},
  {code:'6',  name:'Wdrożenie i Skalowanie',           level:1,start:14,end:24,phase:3},
  {code:'6.1',name:'Wdrożenie pilotażowe',             level:2,start:14,end:17,phase:3},
  {code:'6.2',name:'Feedback i iteracja',              level:2,start:16,end:20,phase:3},
  {code:'6.3',name:'Wdrożenie produkcyjne',            level:2,start:19,end:23,phase:4},
  {code:'6.4',name:'Panel 1000+ lokalizacji',          level:2,start:20,end:24,phase:4},
  {code:'6.5',name:'Szkolenia i dokumentacja',         level:2,start:21,end:24,phase:4},
  {code:'7',  name:'Zarządzanie Projektem',            level:1,start:0, end:24,phase:1},
  {code:'7.1',name:'Planowanie i harmonogramowanie',   level:2,start:0, end:6, phase:1},
  {code:'7.2',name:'Zarządzanie ryzykiem',             level:2,start:0, end:24,phase:1},
  {code:'7.3',name:'Komunikacja z EasyRentals',        level:2,start:2, end:24,phase:1},
  {code:'7.4',name:'Raportowanie i budżet',            level:2,start:4, end:24,phase:1},
  {code:'7.5',name:'Zarządzanie dostawcami',           level:2,start:0, end:14,phase:1},
];
const WBS_BASE=WBS.map(i=>({start:i.start,end:i.end}));
const GRP_COLORS=['#3B8BD4','#1D9E75','#D4A017','#D85A30','#9B59B6','#E74C3C','#888070'];

let currentMonth=0, selectedCode=null;
let PROJECT={budget:1500000,reserve:10,f1:6,f2:8,f3:6,f4:4,dev:5,eng:10,mgmt:10};
const DEFAULTS={...PROJECT};

function MONTHS(){return PROJECT.f1+PROJECT.f2+PROJECT.f3+PROJECT.f4;}
function phaseAt(m){for(const p of[...PHASES].reverse())if(m>=p.start)return p;return PHASES[0];}
function iProg(item,m){if(m<=item.start)return 0;if(m>=item.end)return 100;return Math.round((m-item.start)/(item.end-item.start)*100);}
function iStat(item,m){if(m>=item.end)return'done';if(m>item.start)return'active';return'pending';}
function overall(m){const w=WBS.map(i=>i.end-i.start),tw=w.reduce((a,b)=>a+b,0);return Math.round(WBS.reduce((s,it,ix)=>s+iProg(it,m)/100*w[ix],0)/tw*100);}
function phColor(phase){return PHASES.find(p=>p.id===phase)?.color||'#888';}

/* ── TABS ── */
function switchTab(tab){
  document.querySelectorAll('.nav-tab').forEach(t=>t.classList.remove('active'));
  document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));
  document.getElementById('tab-'+tab).classList.add('active');
  document.getElementById('page-'+tab).classList.add('active');
  if(tab==='tree')renderBlockTree();
}

/* ── WBS LIST ── */
function renderWBS(){
  document.getElementById('wbsTree').innerHTML=WBS.map(item=>{
    const st=iStat(item,currentMonth),pct=iProg(item,currentMonth);
    let pc='prog-pending',pl='Oczekuje';
    if(st==='done'){pc='prog-done';pl='✓';}else if(st==='active'){pc='prog-active';pl=pct+'%';}
    return`<div class="wbs-item level${item.level}${selectedCode===item.code?' active':''}" onclick="sel('${item.code}')">
      <span class="wbs-code">${item.code}</span>
      <span class="wbs-name">${item.name}</span>
      ${item.level<3?`<span class="progress-pill ${pc}">${pl}</span>`:''}
    </div>`;
  }).join('');
}

/* ── GANTT ── */
function renderGantt(){
  const el=document.getElementById('ganttPanel');
  const M=MONTHS(),p100=100/M,labs=Array.from({length:M},(_,i)=>i+1);
  const mPh=labs.map(m=>{for(const p of[...PHASES].reverse())if(m>p.start)return p;return PHASES[0];});
  let h=`<div style="min-width:660px">`;
  h+=`<div class="gantt-header"><div class="gantt-label-col">Pakiet prac</div><div class="gantt-months">`;
  labs.forEach((m,i)=>{const cur=m===currentMonth;h+=`<div class="gantt-month${cur?' current':''}" style="color:${cur?'var(--gold)':mPh[i].color+'88'}">${m}</div>`;});
  h+=`</div></div>`;
  h+=`<div class="gantt-phase-row"><div class="gantt-phase-label" style="color:var(--text-muted)">Fazy</div><div class="gantt-phase-bar-row">`;
  for(let m=0;m<=M;m++)h+=`<div class="gantt-grid-line" style="left:${m*p100}%"></div>`;
  h+=`<div class="today-line" style="left:${currentMonth*p100}%" data-month="${currentMonth}"></div>`;
  PHASES.forEach(p=>{h+=`<div class="gantt-phase-span" style="left:${p.start*p100}%;width:${(p.end-p.start)*p100}%;background:${p.color}22;border:1px solid ${p.color}44;color:${p.color}">${p.short}</div>`;});
  h+=`</div></div>`;
  WBS.forEach(item=>{
    const st=iStat(item,currentMonth),pct=iProg(item,currentMonth),c=phColor(item.phase),l1=item.level===1;
    h+=`<div class="gantt-row" onclick="sel('${item.code}')" style="${l1?'background:'+c+'08':''} ${selectedCode===item.code?'background:'+c+'14;':''}">
      <div class="gantt-row-label" style="${l1?'color:'+c+';font-weight:500':'font-size:9px;color:var(--text-muted)'}"><span style="color:var(--text-muted);font-size:8px">${item.code}</span> ${item.name}</div>
      <div class="gantt-bar-area">`;
    for(let m=0;m<=M;m++)h+=`<div class="gantt-grid-line" style="left:${m*p100}%"></div>`;
    h+=`<div class="today-line" style="left:${currentMonth*p100}%" data-month="${currentMonth}"></div>`;
    h+=`<div class="gantt-bar" style="left:${item.start*p100}%;width:${(item.end-item.start)*p100}%;min-width:2px">
      <div class="gantt-bar-bg" style="background:${c}18;border:1px solid ${c}33"></div>
      <div class="gantt-bar-progress" style="width:${pct}%;background:${st==='done'?c+'cc':c+'55'}"></div>
      <div class="gantt-bar-label">${st==='done'?'✓ ':st==='active'?pct+'% ':''}</div></div>`;
    h+=`</div></div>`;
  });
  h+=`</div>`;
  el.innerHTML=h;
}

/* ── BLOCK TREE ── */
function renderBlockTree(){
  const ov=overall(currentMonth);
  document.getElementById('tree-prog').textContent=`M${currentMonth} – ${ov}%`;
  const roots=WBS.filter(i=>i.level===1);
  const kids=code=>WBS.filter(i=>i.level===2&&i.code.startsWith(code+'.'));

  // Root node
  let h=`<div class="tree-root">`;
  h+=`<div class="root-box" onclick="sel('0')">🔑 BeeSecure – KeyLock
    <div class="root-sub">${MONTHS()} miesięcy • ${(PROJECT.budget/1000000).toFixed(1)} mln zł • ~${PROJECT.dev+PROJECT.eng+PROJECT.mgmt} osób</div>
  </div>`;
  h+=`<div class="tree-vline"></div>`;

  // Horizontal connector
  const n=roots.length, colW=154;
  const lineW=n*colW;
  h+=`<div style="position:relative;width:${lineW}px;height:2px;background:rgba(212,160,23,0.2)">`;
  roots.forEach((_,i)=>{h+=`<div style="position:absolute;top:0;left:${((i+0.5)/n*100).toFixed(2)}%;width:2px;height:12px;background:rgba(212,160,23,0.2);transform:translateX(-50%)"></div>`;});
  h+=`</div>`;

  // L1 columns
  h+=`<div class="l1-row">`;
  roots.forEach((root,gi)=>{
    const c=GRP_COLORS[gi];
    const rPct=iProg(root,currentMonth), rSt=iStat(root,currentMonth);
    const cs=kids(root.code);
    h+=`<div class="l1-col">`;
    h+=`<div class="l1-box" style="background:${c}1a;border:1px solid ${c}55;color:${c}cc"
      onmouseenter="tip(event,'${root.code}','${root.name}',${rPct},'${rSt}')"
      onmouseleave="tipHide()" onclick="sel('${root.code}')">
      <div class="l1-code">${root.code}</div>${root.name}
      ${rSt==='done'?`<span class="pbadge pb-done">✓</span>`:rSt==='active'?`<span class="pbadge pb-act">${rPct}%</span>`:''}
      <div class="pbar" style="width:${rPct}%;background:${c}88"></div>
    </div>`;
    if(cs.length){
      h+=`<div class="l1-tick2" style="background:${c}44"></div>`;
      h+=`<div class="l2-list">`;
      cs.forEach(k=>{
        const kPct=iProg(k,currentMonth), kSt=iStat(k,currentMonth);
        h+=`<div class="l2-box" style="background:${c}0d;border:1px solid ${c}33;color:${c}aa"
          onmouseenter="tip(event,'${k.code}','${k.name.replace(/'/g,"\\'")}',${kPct},'${kSt}')"
          onmouseleave="tipHide()" onclick="sel('${k.code}')">
          <div class="l2-code">${k.code}</div>${k.name}
          ${kSt==='done'?`<span class="pbadge pb-done" style="font-size:6px">✓</span>`:kSt==='active'?`<span class="pbadge pb-act" style="font-size:6px">${kPct}%</span>`:''}
          <div class="pbar" style="width:${kPct}%;background:${c}66"></div>
        </div>`;
      });
      h+=`</div>`;
    }
    h+=`</div>`;
  });
  h+=`</div></div>`;
  document.getElementById('blockTree').innerHTML=h;
}

/* ── TOOLTIP ── */
function tip(e,code,name,pct,st){
  const t=document.getElementById('tip');
  const item=WBS.find(i=>i.code===code);
  const stLbl=st==='done'?'✓ Gotowe':st==='active'?`W toku – ${pct}%`:'Oczekuje';
  t.innerHTML=`<strong>${code} – ${name}</strong>Status: ${stLbl}<br>Czas: M${(item?.start||0)+1}–M${item?.end||0} (${(item?.end||0)-(item?.start||0)} mies.)`;
  t.classList.add('on');
  tipMove(e);
}
function tipHide(){document.getElementById('tip').classList.remove('on');}
function tipMove(e){const t=document.getElementById('tip');t.style.left=(e.clientX+12)+'px';t.style.top=(e.clientY-8)+'px';}
document.addEventListener('mousemove',e=>{if(document.getElementById('tip').classList.contains('on'))tipMove(e);});

/* ── SELECT ── */
function sel(code){
  selectedCode=selectedCode===code?null:code;
  const item=WBS.find(i=>i.code===code);
  if(item){const ph=PHASES.find(p=>p.id===item.phase);document.getElementById('phaseDesc').textContent=ph?ph.desc:'';}
  renderWBS();renderGantt();
  if(document.getElementById('page-tree').classList.contains('active'))renderBlockTree();
}

/* ── UPDATE TIME ── */
function updateTime(val){
  currentMonth=parseInt(val);
  const M=MONTHS(),sl=document.getElementById('timeSlider');
  sl.style.setProperty('--pct',(currentMonth/M*100).toFixed(1)+'%');
  document.getElementById('timeBadge').textContent=currentMonth===0?'Start':`Miesiąc ${currentMonth}`;
  document.getElementById('stat-month').textContent='M'+currentMonth;
  const ph=phaseAt(currentMonth);
  const pb=document.getElementById('phaseBadge');
  pb.style.borderColor=ph.color;pb.style.color=ph.color;pb.textContent='▶ '+ph.short;
  document.getElementById('stat-phase').textContent='Faza '+ph.id;
  document.getElementById('phaseDesc').textContent=ph.desc;
  const ov=overall(currentMonth);
  document.getElementById('stat-done').textContent=ov+'%';
  const circ=2*Math.PI*38;
  document.getElementById('ringArc').setAttribute('stroke-dasharray',`${(circ*ov/100).toFixed(1)} ${circ.toFixed(1)}`);
  document.getElementById('ringPct').textContent=ov+'%';
  renderWBS();renderGantt();
  if(document.getElementById('page-tree').classList.contains('active'))renderBlockTree();
}

/* ── SETTINGS ── */
function openSettings(){document.getElementById('sOverlay').classList.add('open');syncInputs();}
function closeSettings(){document.getElementById('sOverlay').classList.remove('open');}
function handleOverlayClick(e){if(e.target===document.getElementById('sOverlay'))closeSettings();}
function syncInputs(){
  ['budget','reserve','f1','f2','f3','f4','dev','eng','mgmt'].forEach(k=>{document.getElementById('inp-'+k).value=PROJECT[k];});
  refreshPreviews();
}
function refreshPreviews(){
  const b=+document.getElementById('inp-budget').value||1500000;
  const r=+document.getElementById('inp-reserve').value||10;
  const f1=+document.getElementById('inp-f1').value||6,f2=+document.getElementById('inp-f2').value||8;
  const f3=+document.getElementById('inp-f3').value||6,f4=+document.getElementById('inp-f4').value||4;
  const dv=+document.getElementById('inp-dev').value||5,en=+document.getElementById('inp-eng').value||10,mg=+document.getElementById('inp-mgmt').value||10;
  const tot=dv+en+mg,tm=f1+f2+f3+f4,op=Math.round(b*(1-r/100)),rs=Math.round(b*r/100);
  document.getElementById('budget-mln').textContent=(b/1e6).toFixed(2).replace('.',',')+' mln zł';
  document.getElementById('total-months-preview').textContent=tm+' miesięcy';
  document.getElementById('total-team-preview').textContent=tot+' osób';
  document.getElementById('cost-op').textContent=op.toLocaleString('pl-PL')+' zł';
  document.getElementById('cost-res').textContent=rs.toLocaleString('pl-PL')+' zł';
  document.getElementById('cost-per-person').textContent=(tot>0?Math.round(op/tot/tm):0).toLocaleString('pl-PL')+' zł';
}
['budget','reserve','f1','f2','f3','f4','dev','eng','mgmt'].forEach(k=>{
  setTimeout(()=>{const el=document.getElementById('inp-'+k);if(el)el.addEventListener('input',refreshPreviews);},50);
});
function applySettings(){
  ['budget','reserve','f1','f2','f3','f4','dev','eng','mgmt'].forEach(k=>{PROJECT[k]=+document.getElementById('inp-'+k).value||PROJECT[k];});
  const T=MONTHS(),tot=PROJECT.dev+PROJECT.eng+PROJECT.mgmt;
  const mln=(PROJECT.budget/1e6).toFixed(2).replace('.',',')+' mln zł';
  document.getElementById('stat-budget').textContent=mln;
  document.getElementById('stat-team').textContent=tot;
  document.getElementById('detail-budget').textContent=mln;
  document.getElementById('detail-time').textContent=T+' miesięcy';
  document.getElementById('detail-team').textContent='~'+tot+' osób';
  const f1e=PROJECT.f1,f2e=f1e+PROJECT.f2,f3e=f2e+PROJECT.f3,f4e=f3e+PROJECT.f4;
  PHASES[0].end=f1e;PHASES[1].start=f1e;PHASES[1].end=f2e;PHASES[2].start=f2e;PHASES[2].end=f3e;PHASES[3].start=f3e;PHASES[3].end=f4e;
  WBS_BASE.forEach((b,i)=>{WBS[i].start=Math.round(b.start/24*T);WBS[i].end=Math.max(WBS[i].start+1,Math.round(b.end/24*T));});
  const sl=document.getElementById('timeSlider');sl.max=T;
  if(currentMonth>T){currentMonth=T;sl.value=T;}
  updateTime(currentMonth);closeSettings();
}
function resetSettings(){
  PROJECT={...DEFAULTS};
  PHASES[0].start=0;PHASES[0].end=6;PHASES[1].start=6;PHASES[1].end=14;PHASES[2].start=14;PHASES[2].end=20;PHASES[3].start=20;PHASES[3].end=24;
  WBS_BASE.forEach((b,i)=>{WBS[i].start=b.start;WBS[i].end=b.end;});
  document.getElementById('timeSlider').max = MONTHS();
  syncInputs();updateTime(0);
}

Object.assign(window, {
  switchTab,
  openSettings,
  closeSettings,
  handleOverlayClick,
  updateTime,
  sel,
  tip,
  tipHide,
  applySettings,
  resetSettings,
});
updateTime(0);
