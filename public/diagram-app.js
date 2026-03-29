// ══ DATA ══
const PHASES=[
  {id:1,short:'F1',start:0, end:6, color:'#3B8BD4',desc:'Projektowanie i prototypowanie: architektura systemu, projekt PCB, zamek i gateway (M1–6).'},
  {id:2,short:'F2',start:6, end:14,color:'#1D9E75',desc:'Testy jednostkowe i integracyjne, certyfikacja ZigBee i normy bezpieczeństwa (M7–14).'},
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
  {code:'5.1',name:'Testy jednostkowe/integracyjne',   level:2,start:6, end:10,phase:2},
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
const GRP_COLORS=['#3B8BD4','#1D9E75','#D4A017','#D85A30','#9B59B6','#E74C3C','#888070'];
const COL_W = 190; // px per L1 column

let currentMonth = 0;

function phaseAt(m){ for(const p of[...PHASES].reverse())if(m>=p.start)return p; return PHASES[0]; }
function iProg(item,m){ if(m<=item.start)return 0; if(m>=item.end)return 100; return Math.round((m-item.start)/(item.end-item.start)*100); }
function iStat(item,m){ if(m>=item.end)return'done'; if(m>item.start)return'active'; return'pending'; }
function overall(m){
  const w=WBS.map(i=>i.end-i.start), tw=w.reduce((a,b)=>a+b,0);
  return Math.round(WBS.reduce((s,it,ix)=>s+iProg(it,m)/100*w[ix],0)/tw*100);
}

// ══ RENDER ══
function render(){
  const ov = overall(currentMonth);
  document.getElementById('bigProg').textContent = `M${currentMonth} – ${ov}%`;
  document.getElementById('progChip').textContent = ov + '%';

  const roots = WBS.filter(i=>i.level===1);
  const kids  = code => WBS.filter(i=>i.level===2 && i.code.startsWith(code+'.'));
  const n = roots.length;

  let h = '<div class="tree-root-wrap">';

  // ── Root node ──
  h += `<div class="root-box">
    🔑 BeeSecure – KeyLock
    <div class="root-sub">24 miesiące &nbsp;·&nbsp; 1,5 mln zł &nbsp;·&nbsp; ~25 osób &nbsp;·&nbsp; Partner: EasyRentals</div>
  </div>`;

  // Vertical line down from root
  h += `<div class="vline" style="width:2px;height:32px"></div>`;

  // Horizontal crossbar
  const barW = n * COL_W - 10;
  h += `<div style="position:relative;width:${barW}px">`;
  h += `<div class="hline" style="width:100%"></div>`;
  roots.forEach((_,i)=>{
    const lp = ((i+0.5)/n*100).toFixed(2);
    h += `<div class="vline" style="position:absolute;top:0;left:${lp}%;transform:translateX(-50%);width:2px;height:18px"></div>`;
  });
  h += `</div>`;

  // ── L1 columns ──
  h += `<div class="l1-row">`;
  roots.forEach((root, gi)=>{
    const c   = GRP_COLORS[gi];
    const rPct = iProg(root, currentMonth);
    const rSt  = iStat(root, currentMonth);
    const cs   = kids(root.code);

    h += `<div class="l1-col" style="width:${COL_W}px">`;

    // L1 box
    h += `<div class="l1-box" style="width:${COL_W-10}px;background:${c}24;border-color:${c}70;color:${c}f0"
      onmouseenter="tipShow(event,'${root.code}','${root.name.replace(/'/g,"\\'")}',${rPct},'${rSt}')"
      onmouseleave="tipHide()">
      <div class="l1-code">${root.code}</div>
      ${root.name}
      ${rSt==='done'?`<span class="pbadge pb-done">✓ Gotowe</span>`:rSt==='active'?`<span class="pbadge pb-act">${rPct}%</span>`:''}
      <div class="pbar" style="width:${rPct}%;background:${c}bb"></div>
    </div>`;

    // Connector line to children
    if(cs.length){
      h += `<div class="vline" style="width:2px;height:16px;background:${c}50"></div>`;
      h += `<div class="l2-list" style="width:${COL_W-10}px">`;
      cs.forEach(k=>{
        const kPct = iProg(k, currentMonth);
        const kSt  = iStat(k, currentMonth);
        h += `<div class="l2-box" style="width:${COL_W-10}px;background:${c}12;border-color:${c}48;color:${c}d8"
          onmouseenter="tipShow(event,'${k.code}','${k.name.replace(/'/g,"\\'")}',${kPct},'${kSt}')"
          onmouseleave="tipHide()">
          <div class="l2-code">${k.code}</div>
          ${k.name}
          ${kSt==='done'?`<span class="pbadge pb-done" style="font-size:9px">✓</span>`:kSt==='active'?`<span class="pbadge pb-act" style="font-size:9px">${kPct}%</span>`:''}
          <div class="pbar" style="width:${kPct}%;background:${c}80"></div>
        </div>`;
      });
      h += `</div>`;
    }

    h += `</div>`; // l1-col
  });
  h += `</div></div>`; // l1-row + tree-root-wrap

  document.getElementById('blockTree').innerHTML = h;
}

// ══ TIME ══
function updateTime(val){
  currentMonth = parseInt(val);
  const sl = document.getElementById('slider');
  sl.style.setProperty('--pct', (currentMonth/24*100).toFixed(1)+'%');
  document.getElementById('timeBadge').textContent = currentMonth===0 ? 'Start' : `Miesiąc ${currentMonth}`;
  const ph = phaseAt(currentMonth);
  const pp = document.getElementById('phasePill');
  pp.style.borderColor = ph.color; pp.style.color = ph.color;
  pp.textContent = '▶ ' + ph.short;
  render();
}

// ══ TOOLTIP ══
function tipShow(e, code, name, pct, st){
  const t = document.getElementById('tip');
  const item = WBS.find(i=>i.code===code);
  const stLbl = st==='done' ? '✓ Gotowe' : st==='active' ? `W toku – ${pct}%` : 'Oczekuje';
  const dur = (item?.end||0)-(item?.start||0);
  t.innerHTML = `<strong>${code} – ${name}</strong>Status: ${stLbl}<br>Czas: M${(item?.start||0)+1} – M${item?.end||0} &nbsp;(${dur} mies.)`;
  t.classList.add('on');
  tipMove(e);
}
function tipHide(){ document.getElementById('tip').classList.remove('on'); }
function tipMove(e){ const t=document.getElementById('tip'); t.style.left=(e.clientX+16)+'px'; t.style.top=(e.clientY-10)+'px'; }
document.addEventListener('mousemove', e=>{ if(document.getElementById('tip').classList.contains('on')) tipMove(e); });

// ══ INIT ══
Object.assign(window, { updateTime, tipShow, tipHide, tipMove });
updateTime(0);
