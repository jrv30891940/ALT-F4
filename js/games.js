const $=s=>document.querySelector(s);
const COL={blue:'#A9D8E8',mint:'#B9DFC8',yel:'#F7D98A',pink:'#E8B8C8',lav:'#C9BCE8',cor:'#E9A88F'};

// Datos DEMO: mismo formato que tendrá data/games.json luego.
const GAMES=[
 {id:'ALT-P-000001',name:'Juego de ejemplo 1',genres:['RPG','Acción'],platforms:['PC'],category:'ALT-RPG',state:'Activo',avail:'Compra única',year:2019,c:'blue'},
 {id:'ALT-C-000002',name:'Juego de ejemplo 2',genres:['Mundo abierto'],platforms:['Consola'],category:'ALT-MUNDO-ABIERTO',state:'Activo',avail:'Compra única',year:2021,c:'mint'},
 {id:'ALT-P-000003',name:'Juego de ejemplo 3',genres:['Estrategia'],platforms:['PC','Mobile'],category:'ALT-ESTRATEGIA',state:'Early Access',avail:'Acceso anticipado',year:2024,c:'yel'},
 {id:'ALT-C-000004',name:'Juego de ejemplo 4',genres:['Terror','Historia'],platforms:['Consola'],category:'ALT-HISTORIA',state:'Activo',avail:'Compra única',year:2017,c:'pink'},
 {id:'ALT-M-000005',name:'Juego de ejemplo 5',genres:['Anime','Acción'],platforms:['Mobile'],category:'ALT-ANIME',state:'Activo',avail:'Free to Play',year:2023,c:'lav'},
 {id:'ALT-P-000006',name:'Juego de ejemplo 6',genres:['Multijugador'],platforms:['PC','Consola'],category:'ALT-ACCIÓN',state:'Mantenimiento',avail:'Gratis',year:2015,c:'cor'},
 {id:'ALT-M-000007',name:'Juego de ejemplo 7',genres:['RPG','Anime'],platforms:['Mobile'],category:'ALT-ANIME',state:'Preregistro',avail:'Preregistro',year:2026,c:'blue'},
 {id:'ALT-P-000008',name:'Juego de ejemplo 8',genres:['Acción'],platforms:['PC'],category:'ALT-ACCIÓN',state:'Servidores cerrados',avail:'Compra única',year:2012,c:'mint'},
];

const CATS=['ALT-RPG','ALT-ACCIÓN','ALT-MUNDO-ABIERTO','ALT-ANIME','ALT-HISTORIA','ALT-ESTRATEGIA'];
const uniq=k=>[...new Set(GAMES.flatMap(g=>Array.isArray(g[k])?g[k]:[g[k]]))];

let state={q:'',cat:'',plat:'',gen:'',estado:'',disp:'',anio:'',order:'az'};

function fillSelect(id,vals){const sel=$(id);vals.sort().forEach(v=>{const o=document.createElement('option');o.value=v;o.textContent=v;sel.appendChild(o)})}
fillSelect('#fPlat',uniq('platforms'));
fillSelect('#fGen',uniq('genres'));
fillSelect('#fEstado',uniq('state'));
fillSelect('#fDisp',uniq('avail'));
fillSelect('#fAnio',[...new Set(GAMES.map(g=>g.year))].map(String));

$('#catRow').innerHTML=CATS.map(c=>`<button type="button" class="chip" data-cat="${c}" aria-pressed="false">${c}</button>`).join('');

function card(g){
 return `<a class="card" href="juego.html?id=${g.id}">
  <div class="in">
   <div class="cover" style="--c:${COL[g.c]}" role="img" aria-label="Portada de demostración">PORTADA</div>
   <span class="state">${g.state}${g.avail!=='Compra única'?' · '+g.avail:''}</span>
   <div style="padding:12px 14px 14px">
    <h3>${g.name}</h3>
    <p><span class="demoflag">DEMO · EJEMPLO</span></p>
    <p>${g.genres.join(' · ')}</p>
    <p>${g.platforms.join(' · ')}</p>
    <span class="altid">${g.id}</span>
   </div>
  </div>
 </a>`;
}

const FILTER_LABELS={cat:'Categoría',plat:'Plataforma',gen:'Género',estado:'Estado',disp:'Disponibilidad',anio:'Año'};

function activeChips(){
 const keys=Object.keys(FILTER_LABELS).filter(k=>state[k]);
 $('#activeFilters').innerHTML=keys.map(k=>`<span class="active-chip">${FILTER_LABELS[k]}: ${state[k]}<button type="button" data-clear="${k}" aria-label="Quitar filtro ${FILTER_LABELS[k]}">✕</button></span>`).join('');
 $('#clearFilters').hidden=!keys.length && !state.q;
}

function render(){
 let list=GAMES.filter(g=>{
  if(state.q){const q=state.q.toLowerCase();if(!g.name.toLowerCase().includes(q))return false}
  if(state.cat && g.category!==state.cat)return false;
  if(state.plat && !g.platforms.includes(state.plat))return false;
  if(state.gen && !g.genres.includes(state.gen))return false;
  if(state.estado && g.state!==state.estado)return false;
  if(state.disp && g.avail!==state.disp)return false;
  if(state.anio && String(g.year)!==state.anio)return false;
  return true;
 });
 list=list.sort((a,b)=>{
  if(state.order==='az')return a.name.localeCompare(b.name);
  if(state.order==='za')return b.name.localeCompare(a.name);
  if(state.order==='new')return b.year-a.year;
  if(state.order==='old')return a.year-b.year;
  return 0;
 });
 $('#results').innerHTML=list.map(card).join('');
 $('#count').textContent=list.length?`${list.length} resultado${list.length===1?'':'s'}`:'';
 $('#emptyState').hidden=list.length>0;
 $('#results').hidden=list.length===0;
 activeChips();
}

$('#searchForm').addEventListener('submit',e=>e.preventDefault());
$('#gq').addEventListener('input',e=>{state.q=e.target.value.trim();render()});
['fPlat','fGen','fEstado','fDisp','fAnio','fOrden'].forEach(id=>{
 const map={fPlat:'plat',fGen:'gen',fEstado:'estado',fDisp:'disp',fAnio:'anio',fOrden:'order'};
 $('#'+id).addEventListener('change',e=>{state[map[id]]=e.target.value;render()});
});
$('#catRow').addEventListener('click',e=>{
 const b=e.target.closest('.chip');if(!b)return;
 const c=b.dataset.cat;
 state.cat = state.cat===c ? '' : c;
 [...$('#catRow').children].forEach(x=>x.setAttribute('aria-pressed', x.dataset.cat===state.cat));
 render();
});
function resetAll(){
 state={q:'',cat:'',plat:'',gen:'',estado:'',disp:'',anio:'',order:'az'};
 $('#gq').value='';['fPlat','fGen','fEstado','fDisp','fAnio'].forEach(id=>$('#'+id).value='');
 $('#fOrden').value='az';
 [...$('#catRow').children].forEach(x=>x.setAttribute('aria-pressed','false'));
 render();
}
$('#clearFilters').addEventListener('click',resetAll);
$('#clearFilters2').addEventListener('click',resetAll);
$('#activeFilters').addEventListener('click',e=>{
 const b=e.target.closest('[data-clear]');if(!b)return;
 const k=b.dataset.clear;
 state[k]='';
 const idMap={cat:null,plat:'fPlat',gen:'fGen',estado:'fEstado',disp:'fDisp',anio:'fAnio'};
 if(idMap[k])$('#'+idMap[k]).value='';
 if(k==='cat')[...$('#catRow').children].forEach(x=>x.setAttribute('aria-pressed','false'));
 render();
});

render();
