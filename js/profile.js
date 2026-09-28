const $=s=>document.querySelector(s);
const C={blue:'#A9D8E8',mint:'#B9DFC8',yel:'#F7D98A',pink:'#E8B8C8',lav:'#C9BCE8',cor:'#E9A88F'},K=Object.keys(C);
let S={avatar:4,cover:0,badges:[[0,1],[1,1],[2,1],[3,0]],priv:{seguidos:'Público',listas:'Público',marcados:'Público',historial:'Privado',reciente:'Público'},games:[['NieR:Automata (DEMO)','Público'],['Minecraft (DEMO)','Público'],['Cyberpunk 2077 (DEMO)','Privado']]};
try{Object.assign(S,JSON.parse(localStorage.getItem('altf4-perfil')||'{}'))}catch(e){}
const BN=['Explorador','Curioso','Coleccionista','Reseñador'];
const col=i=>C[K[i%6]];
if($('#tabs')){
 const other=location.search.includes('visita'),P=S.priv;
 $('#cover').style.setProperty('--c',col(S.cover));$('#avatar').style.setProperty('--c',col(S.avatar));
 $('#badges').innerHTML=S.badges.filter(b=>b[1]).map(b=>`<li class="bdg" style="--c:${col(b[0])}">${BN[b[0]]}</li>`).join('');
 if(other){$('#editBtn').remove();$('#name').textContent='Usuario DEMO';$('.user').textContent='@usuario_demo';$('#viewSwitch').textContent='Ver mi perfil';$('#viewSwitch').href='perfil.html';if(P.seguidos==='Privado')$('#followed').textContent='';}
 else{if(S.bio)$('.bio').textContent='“'+S.bio+'”';if(S.name)$('#name').textContent=S.name;if(S.user)$('.user').textContent=S.user}
 const acts=[['Comenzó a seguir NieR:Automata.','blue'],['Publicó una reseña de Cyberpunk 2077.','pink'],['Añadió Minecraft a sus juegos marcados.','mint'],['Creó una lista llamada “Juegos que quiero probar”.','yel']];
 const D='Septiembre de 2026';
 const li=(t,c)=>`<li class="item"><i class="ico" style="--c:${C[c]}"></i><div>${t}<small>${D}</small></div></li>`;
 const hid=(k,txt)=>other&&P[k]==='Privado'?`<p class="empty">Este usuario mantiene ${txt} en privado.</p>`:null;
 const T={
 'Actividad':()=>`<ul class="list">${acts.map(a=>li(...a)).join('')}</ul>`,
 'Reseñas':()=>`<ul class="list">${[['Cyberpunk 2077','★★★★☆','Una ciudad enorme con mucho por descubrir','pink'],['NieR:Automata','★★★★★','Una historia que se queda contigo','blue']].map(r=>`<li class="item"><div class="mini" style="--c:${C[r[3]]}"></div><div><b>${r[0]} (DEMO)</b> <span class="stars">${r[1]}</span><br>${r[2]}<small>Reseña de ejemplo · ${D}</small></div></li>`).join('')}</ul>`,
 'Valoraciones':()=>`<ul class="list">${['Minecraft','NieR:Automata','Cyberpunk 2077'].map((n,i)=>`<li class="item"><div class="mini" style="--c:${col(i+1)}"></div><div><b>${n} (DEMO)</b><br><span class="stars">${'★'.repeat(5-i)}${'☆'.repeat(i)}</span><small>${D}</small></div></li>`).join('')}</ul>`,
 'Listas':()=>hid('listas','sus listas')||`<ul class="list">${[['Juegos que quiero jugar','Pendientes de ejemplo',3,'Público'],['Mis RPG favoritos','Lista de demostración',2,'Público'],['Juegos terminados','Lista de demostración',1,'Privado']].filter(l=>!(other&&l[3]==='Privado')).map(l=>`<li class="item"><div><b>${l[0]}</b> <span class="priv">${l[3]}</span><br>${l[1]}<small>${l[2]} juegos</small><div class="covers">${Array.from({length:l[2]},(_,i)=>`<div class="mini" style="--c:${col(i+2)}"></div>`).join('')}</div></div></li>`).join('')}</ul>`,
 'Juegos marcados':()=>hid('marcados','sus juegos marcados')||`<div class="cards">${[['Minecraft','Mundo abierto','PC','mint'],['NieR:Automata','RPG · Acción','PC · Consola','blue'],['Cyberpunk 2077','RPG','PC','pink']].map(g=>`<article class="card"><div class="cover" style="--c:${C[g[3]]}" role="img" aria-label="Portada de demostración">PORTADA</div><div class="in"><h3>${g[0]}</h3><p><b class="demo">DEMO</b>${g[1]}</p><p>${g[2]} · Marcado</p></div></article>`).join('')}</div>`,
 'Historial':()=>hid('historial','su historial')||`<ul class="list">${['Consultó la ficha de NieR:Automata.','Consultó la ficha de Minecraft.','Valoró Cyberpunk 2077.'].map(t=>li(t,'lav')).join('')}</ul>`,
 'Actividad reciente':()=>hid('reciente','su actividad reciente')||`<ul class="list">${acts.slice(0,3).map(a=>li(...a)).join('')}</ul>`};
 const names=Object.keys(T);
 $('#tabs').innerHTML=names.map((n,i)=>`<button class="tab" role="tab" id="t${i}" aria-controls="panel" aria-selected="${i==0}" tabindex="${i?-1:0}">${n}</button>`).join('');
 const sel=i=>{names.forEach((_,j)=>{const t=$('#t'+j);t.setAttribute('aria-selected',j==i);t.tabIndex=j==i?0:-1});$('#panel').innerHTML=T[names[i]]();$('#panel').setAttribute('aria-labelledby','t'+i)};
 $('#tabs').addEventListener('click',e=>{const t=e.target.closest('.tab');if(t)sel(+t.id.slice(1))});
 $('#tabs').addEventListener('keydown',e=>{const c=+document.activeElement.id.slice(1),n=e.key==='ArrowRight'?(c+1)%7:e.key==='ArrowLeft'?(c+6)%7:null;if(n!==null){sel(n);$('#t'+n).focus()}});
 sel(0);
}
if($('#editForm')){
 const gal=(id,key,n)=>{$(id).innerHTML=Array.from({length:n},(_,i)=>`<button type="button" class="opt" role="radio" aria-checked="${S[key]==i}" aria-label="${key==='avatar'?'Avatar':'Portada'} ${i+1}" style="--c:${col(i)}" data-i="${i}"></button>`).join('');$(id).onclick=e=>{const b=e.target.closest('.opt');if(!b)return;S[key]=+b.dataset.i;[...$(id).children].forEach(x=>x.setAttribute('aria-checked',x===b))}};
 gal('#avG','avatar',8);gal('#cvG','cover',6);
 const rb=(f)=>{$('#bList').innerHTML=S.badges.map((b,i)=>`<li class="${b[1]?'':'off'}"><span class="bdg" style="--c:${col(b[0])}">${BN[b[0]]}</span><span class="g"></span><button type="button" class="sm" data-a="up" data-i="${i}" aria-label="Subir ${BN[b[0]]}">↑</button><button type="button" class="sm" data-a="dn" data-i="${i}" aria-label="Bajar ${BN[b[0]]}">↓</button><button type="button" class="sm" data-a="tg" data-i="${i}">${b[1]?'Ocultar':'Mostrar'}</button></li>`).join('');if(f)$('#bList').querySelector(`[data-a="${f[0]}"][data-i="${f[1]}"]`)?.focus()};rb();
 $('#bList').onclick=e=>{const b=e.target.closest('[data-a]');if(!b)return;const i=+b.dataset.i,a=S.badges,k=b.dataset.a;let n=i;if(k==='tg')a[i][1]=a[i][1]?0:1;else{n=k==='up'?i-1:i+1;if(n<0||n>=a.length)return;[a[i],a[n]]=[a[n],a[i]]}rb([k,n])};
 const sl=(v,at)=>`<select ${at}>${['Público','Privado'].map(x=>`<option${x==v?' selected':''}>${x}</option>`).join('')}</select>`;
 $('#gList').innerHTML=S.games.map((g,i)=>`<li><span class="g">${g[0]}</span>${sl(g[1],`id="g${i}" aria-label="Privacidad de ${g[0]}"`)}</li>`).join('');
 const pn={seguidos:'Juegos seguidos',listas:'Listas',marcados:'Juegos marcados',historial:'Historial',reciente:'Actividad reciente'};
 $('#privG').innerHTML=Object.keys(pn).map(k=>`<div class="row"><label for="p_${k}">${pn[k]}</label>${sl(S.priv[k],`id="p_${k}" data-k="${k}"`)}</div>`).join('');
 const chg={name:['#fName','#hName','Podrás cambiar tu nombre nuevamente en 6 días.'],user:['#fUser','#hUser','Podrás cambiar tu nombre de usuario nuevamente en 29 días.']};
 document.querySelectorAll('[data-change]').forEach(b=>b.onclick=()=>{const i=chg[b.dataset.change][0];$(i).disabled=false;$(i).focus();b.hidden=true});
 $('#editForm').onsubmit=e=>{e.preventDefault();
  Object.keys(chg).forEach(k=>{const[i,h,m]=chg[k];if(!$(i).disabled){$(i).disabled=true;$(h).textContent=m;S[k]=$(i).value}});
  S.bio=$('#fBio').value;document.querySelectorAll('[data-k]').forEach(s=>S.priv[s.dataset.k]=s.value);
  S.games=S.games.map((g,i)=>[g[0],$('#g'+i).value]);
  try{localStorage.setItem('altf4-perfil',JSON.stringify(S))}catch(x){}
  $('#saved').textContent='Cambios guardados.'};
}
