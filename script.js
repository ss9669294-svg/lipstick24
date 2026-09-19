document.querySelectorAll('a[href^="#"]').forEach(a=>a.addEventListener('click',e=>{const el=document.querySelector(a.getAttribute('href'));if(el){e.preventDefault();el.scrollIntoView({behavior:'smooth'})}}));

/* Premium real-time 3D/parallax for the two existing photos.
   No image generation or replacement: the original assets remain intact. */
(function(){
  if(window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const targets=[...document.querySelectorAll('.hero-photo,.lipstick-photo')];
  if(!targets.length) return;

  const clamp=(n,min,max)=>Math.max(min,Math.min(max,n));

  targets.forEach(el=>{
    const img=el.querySelector('img');
    if(!img) return;
    let raf=0, active=false;

    function move(clientX,clientY){
      const r=el.getBoundingClientRect();
      const x=clamp((clientX-r.left)/r.width,0,1);
      const y=clamp((clientY-r.top)/r.height,0,1);
      const rx=((0.5-y)*7).toFixed(2)+'deg';
      const ry=((x-0.5)*9).toFixed(2)+'deg';
      const tx=((x-0.5)*10).toFixed(1)+'px';
      const ty=((y-0.5)*7).toFixed(1)+'px';
      el.style.setProperty('--rx',rx);
      el.style.setProperty('--ry',ry);
      el.style.setProperty('--tx',tx);
      el.style.setProperty('--ty',ty);
      el.style.setProperty('--px',(x*100).toFixed(1)+'%');
      el.style.setProperty('--py',(y*100).toFixed(1)+'%');
      el.classList.add('is-active');
    }

    function reset(){
      el.classList.remove('is-active');
      el.style.setProperty('--rx','0deg');
      el.style.setProperty('--ry','0deg');
      el.style.setProperty('--tx','0px');
      el.style.setProperty('--ty','0px');
      el.style.setProperty('--px','50%');
      el.style.setProperty('--py','50%');
    }

    el.addEventListener('pointerenter',()=>{active=true;el.classList.add('is-active')});
    el.addEventListener('pointermove',e=>{
      if(e.pointerType==='touch') return;
      cancelAnimationFrame(raf);
      raf=requestAnimationFrame(()=>move(e.clientX,e.clientY));
    });
    el.addEventListener('pointerleave',()=>{active=false;reset()});

    el.addEventListener('touchstart',e=>{
      if(!e.touches[0]) return;
      active=true;
      move(e.touches[0].clientX,e.touches[0].clientY);
    },{passive:true});
    el.addEventListener('touchmove',e=>{
      if(!e.touches[0]||!active) return;
      move(e.touches[0].clientX,e.touches[0].clientY);
    },{passive:true});
    el.addEventListener('touchend',()=>{active=false;reset()},{passive:true});
    el.addEventListener('touchcancel',()=>{active=false;reset()},{passive:true});
  });
})();