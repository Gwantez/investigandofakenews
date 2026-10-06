'use strict';
window.Scenes={
 escape:v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])),
 text(s){
  return [s.app,s.title,s.subtitle,s.date,s.author,s.text,s.meta,
   ...(s.messages||[]).map(m=>m[0]+', '+m[2]+': '+m[1]),
   ...(s.results||[]).map(r=>r.title+'. '+r.url+'. '+r.text),
   ...(s.extra||[]).map(e=>e.label+': '+e.text),
   ...(s.chart?[s.chart.title+'. Eixo de '+s.chart.min+' a '+s.chart.max+'. '+s.chart.labels.map((l,i)=>l+': '+s.chart.values[i]+' '+s.chart.unit).join('; ')]:[])
  ].filter(Boolean).join('\n');
 },
 render(s){
  const e=this.escape,lines=t=>e(t).replaceAll('\n','<br>');
  const paths={heart:'M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z',like:'M7 10v11H3V10h4Zm0 0 5-7c2 0 2 2 2 3l-1 4h6c1 0 2 1 2 2l-2 7c0 1-1 2-2 2H7',comment:'M21 11.5a8.4 8.4 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.4 8.4 0 0 1-3.8-.9L3 21l1.9-5.7a8.4 8.4 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.4 8.4 0 0 1 3.8-.9H13a8.5 8.5 0 0 1 8 8v.5Z',share:'m22 2-7 20-4-9-9-4 20-7Zm0 0L11 13'};
  const icon=name=>`<svg class="case-ui-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="${paths[name]}" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
  const avatar=(t,cls='')=>`<span class="case-avatar ${cls}" aria-hidden="true">${e(t.replace(/^@/,'').charAt(0).toUpperCase())}</span>`;
  const extra=(s.extra||[]).length?`<div class="case-attachments">${s.extra.map((x,i)=>`<article><span class="attachment-index">${String.fromCharCode(65+i)}</span><div><b>${e(x.label)}</b><p>${lines(x.text)}</p></div></article>`).join('')}</div>`:'';
  let content='';
  if(s.type==='chat')content=`<div class="chat-status"><b>09:41</b><span>▮▮▮ &nbsp; Wi-Fi &nbsp; ▰</span></div><div class="chat-head"><span aria-hidden="true">‹</span>${avatar(s.title)}<div><b>${e(s.title)}</b><small>${e(s.subtitle)}</small></div><span class="chat-tools" aria-hidden="true">◉ &nbsp; ⋮</span></div><div class="chat-area"><span class="chat-date">MENSAGENS DO CASO</span>${s.messages.map(m=>`<div class="chat-bubble ${m[0]==='Eu'?'outgoing':''}"><b class="chat-sender">${e(m[0])}</b><p>${lines(m[1])}</p><small>${e(m[2])}${m[0]==='Eu'?' &nbsp;✓✓':''}</small></div>`).join('')}<div class="chat-input"><span>+</span><span>Mensagem</span><span>◉</span></div></div>`;
  if(s.type==='feed'){
   const ig=s.app==='Instagram';
   content=`<div class="feed-head ${ig?'instagram':'facebook'}"><b>${ig?'Instagram':'facebook'}</b><span aria-hidden="true">⌕ &nbsp; ◉ &nbsp; ☰</span></div><div class="feed-post"><div class="feed-user">${avatar(s.title,ig?'ig-avatar':'')}<div><b>${e(s.title)}</b><small>${e(s.date)} &nbsp; · &nbsp; Público</small></div><span aria-hidden="true">⋯</span></div><p class="feed-text">${lines(s.text)}</p>${s.meta?`<div class="feed-meta">${e(s.meta)}</div>`:''}<div class="feed-reactions"><span>${icon(ig?'heart':'like')} ${icon('comment')} ${icon('share')}</span><small>Curtir &nbsp; Comentar &nbsp; ${ig?'Enviar':'Compartilhar'}</small></div></div>`;
  }
  if(s.type==='news')content=`<div class="browser-bar"><span aria-hidden="true">‹ &nbsp; › &nbsp; ↻</span><span class="address">${e(s.url)}</span><span aria-hidden="true">⋮</span></div><div class="news-head"><b>${e(s.app)}</b><span>NOTÍCIAS &nbsp; CIDADE &nbsp; EDUCAÇÃO</span></div><div class="news-article"><span class="news-section">COTIDIANO</span><h2>${e(s.title)}</h2><div class="news-byline">Por ${e(s.author)}<br>${e(s.date)}</div><div class="news-rule"></div><p>${lines(s.text)}</p></div>`;
  if(s.type==='document')content=`<div class="pdf-bar"><b>▤ &nbsp; Documento consultado</b><span>1 / 1 &nbsp; · &nbsp; 100%</span></div><div class="pdf-paper"><span class="doc-kicker">MATERIAL DO CASO</span><h2>${e(s.title)}</h2><p>${lines(s.text)}</p>${s.chart?this.chart(s.chart):''}<div class="document-rule"></div></div>`;
  if(s.type==='search')content=`<div class="search-head"><b><span>B</span>usca</b><span class="search-field">${e(s.title)} &nbsp; ⌕</span></div><div class="search-tabs">Todos &nbsp;&nbsp; Imagens &nbsp;&nbsp; Notícias &nbsp;&nbsp; Vídeos</div><div class="search-results">${s.results.map(r=>`<article><small>${e(r.url)}</small><h2>${e(r.title)}</h2><p>${lines(r.text)}</p></article>`).join('')}</div>`;
  if(s.type==='video')content=`<div class="video-head"><span aria-hidden="true">☰</span><b><i>▶</i> Vídeo</b><span aria-hidden="true">⌕ &nbsp; ⋮</span></div><div class="video-player"><span class="video-note">TRECHO TRANSCRITO</span><div class="waveform" aria-hidden="true">${Array.from({length:30},(_,i)=>`<i style="height:${12+(i*37%68)}px"></i>`).join('')}</div><blockquote>${lines(s.text)}</blockquote><div class="video-controls"><span aria-hidden="true">▶ &nbsp; ◖))</span><span>00:03 / 00:24</span><span aria-hidden="true">⚙ &nbsp; ⛶</span></div></div><div class="video-info"><h2>${e(s.title)}</h2>${s.meta?`<small>${e(s.meta)}</small>`:''}</div>`;
  return `<div class="case-window case-${s.type}">${content}${extra}<div class="simulation-stamp">SIMULAÇÃO EDUCATIVA · personagens, dados e acontecimentos fictícios</div></div>`;
 },
 chart(c){
  const e=this.escape;
  return `<div class="case-chart"><b>${e(c.title)}</b><div class="chart-unit">${e(c.unit)} · eixo de ${c.min} a ${c.max}</div><div class="chart-drawing"><div class="chart-ticks"><span>${c.max}</span><span>${(c.min+c.max)/2}</span><span>${c.min}</span></div><div class="chart-bars">${c.values.map((v,i)=>`<div><span>${v}</span><i style="height:${(v-c.min)/(c.max-c.min)*150}px"></i><b>${e(c.labels[i])}</b></div>`).join('')}</div></div></div>`;
 }
};
