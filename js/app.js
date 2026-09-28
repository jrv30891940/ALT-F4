const $=s=>document.querySelector(s);
const C={blue:'#A9D8E8',mint:'#B9DFC8',yel:'#F7D98A',pink:'#E8B8C8',lav:'#C9BCE8',cor:'#E9A88F'};
const cats=[['Juegos','Fichas y datos','blue'],['Plataformas','PC, consola, mobile','mint'],['Franquicias','Sagas y universos','yel'],['Estudios','Quién los crea','pink'],['Géneros','Por tipo de juego','lav'],['Buscar','Encuentra algo','cor']];
$('#cats').innerHTML=cats.map(([n,d,c])=>`<button class="cat" style="--c:${C[c]}"${n==='Buscar'?' data-open-search':''}><b>${n}</b><small>${d}</small></button>`).join('');
const demo=[['Juego de ejemplo 1','RPG · Acción','PC','blue'],['Juego de ejemplo 2','Mundo abierto','Consola','mint'],['Juego de ejemplo 3','Estrategia','PC · Mobile','yel'],['Juego de ejemplo 4','Terror · Historia','Consola','pink'],['Juego de ejemplo 5','Anime · Acción','Mobile','lav'],['Juego de ejemplo 6','Multijugador','PC · Consola','cor']];
const vt='Verificado por ALT-F4 indica que la información mostrada fue revisada y contrastada según los criterios editoriales de ALT-F4. Esto no implica afiliación oficial con los propietarios del juego.';
const ot='Descripción original de ALT-F4 indica que este texto fue redactado específicamente para ALT-F4 a partir de información investigada y registrada. Esto no implica afiliación oficial con los propietarios del juego.';
$('#games').innerHTML=demo.map(([n,g,p,c],i)=>`<article class="card"><div class="cover" style="--c:${C[c]}" role="img" aria-label="Portada de demostración">PORTADA</div><div class="in"><h3>${n}</h3><p><b class="demo">DEMO</b>${g}</p><p>${p}</p>
<span class="tip"><button class="badge" aria-describedby="v${i}">✓ Verificado</button><span role="tooltip" id="v${i}">${vt}</span></span>
<span class="tip"><button class="badge o" aria-describedby="o${i}">✦ Original</button><span role="tooltip" id="o${i}">${ot}</span></span></div></article>`).join('');
$('#flow').innerHTML=[['FUENTES','blue'],['NORMALIZACIÓN','mint'],['REVISIÓN','yel'],['PUBLICACIÓN','pink']].map(([n,c])=>`<li style="--c:${C[c]}"><i></i>${n}</li>`).join('');
const chips=(id,l)=>{$(id).innerHTML=l.map((n,i)=>`<button class="chip" style="--c:${Object.values(C)[i%6]}66" aria-pressed="${n==='Todos'}">${n}</button>`).join('');$(id).onclick=e=>{const b=e.target.closest('.chip');if(b)[...$(id).children].forEach(x=>x.setAttribute('aria-pressed',x===b))}};
chips('#catChips',['Todos','Acción','RPG','Mundo abierto','Anime','Historia','Terror','Estrategia','Multijugador']);
chips('#platChips',['PC','Consola','Mobile']);
const P={games:['#gamesSheet','#gamesBtn'],profile:['#profilePanel','#profileBtn'],search:['#searchOv','#searchBtn']};
let open=null,last=null;
function show(k){close();const[p,b]=P[k];last=document.activeElement;open=k;$(p).hidden=false;if(k!=='search')$('#scrim').hidden=false;$(b).setAttribute('aria-expanded','true');
 if(k==='search')setTimeout(()=>$('#q').focus(),30);else $(p).querySelector('button')?.focus();}
function close(){if(!open)return;const[p,b]=P[open];$(p).hidden=true;$('#scrim').hidden=true;$(b).setAttribute('aria-expanded','false');open=null;last?.focus();}
const tog=k=>open===k?close():show(k);
$('#gamesBtn').onclick=()=>tog('games');
$('#profileBtn').onclick=()=>tog('profile');
$('#searchBtn').onclick=()=>tog('search');
document.addEventListener('click',e=>{if(e.target.closest('[data-open-search]'))show('search');else if(e.target.closest('[data-close]')||e.target.id==='scrim'||e.target.id==='searchOv')close();});
document.addEventListener('keydown',e=>{if(e.key==='Escape')close()});
if(location.hash==="#juegos")show("games");else if(location.hash==="#buscar")show("search");
