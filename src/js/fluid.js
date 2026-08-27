function initFluidInteractions(){
  if(window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  document.documentElement.classList.add('dmc-fluid-ready');

  const progress=document.createElement('div');
  progress.className='dmc-progress';
  progress.innerHTML='<span></span>';
  document.body.appendChild(progress);
  const progressBar=progress.firstElementChild;

  const fluidTargets=[
    ['.section-head h2','heading'],
    ['.section-head .lead','copy'],
    ['.stat','stat'],
    ['.vehicle-card','card'],
    ['.feature-panel','card'],
    ['.event','card'],
    ['.show','card'],
    ['.gallery-slot','card'],
    ['.contact-card','card']
  ];

  fluidTargets.forEach(([selector,type])=>{
    document.querySelectorAll(selector).forEach((el,index)=>{
      el.dataset.fluid='';
      el.dataset.fluidType=type;
      el.style.setProperty('--fluid-delay',`${Math.min(index*45,225)}ms`);
    });
  });

  const observer=new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  },{rootMargin:'0px 0px -9% 0px',threshold:.08});

  document.querySelectorAll('[data-fluid]').forEach(el=>observer.observe(el));

  const hoverTargets=document.querySelectorAll('.vehicle-card,.feature-stage,.collector-stage,.gallery-slot,.contact-card');
  hoverTargets.forEach(el=>{
    el.dataset.fluidCard='';
    el.addEventListener('pointermove',event=>{
      if(event.pointerType==='touch') return;
      const rect=el.getBoundingClientRect();
      const x=(event.clientX-rect.left)/rect.width-.5;
      const y=(event.clientY-rect.top)/rect.height-.5;
      el.style.setProperty('--mx',`${(x*8).toFixed(2)}px`);
      el.style.setProperty('--my',`${(y*6).toFixed(2)}px`);
      el.classList.add('fluid-hover');
    });
    el.addEventListener('pointerleave',()=>{
      el.style.setProperty('--mx','0px');
      el.style.setProperty('--my','0px');
    });
  });

  let ticking=false;
  const updateScroll=()=>{
    const max=document.documentElement.scrollHeight-window.innerHeight;
    const ratio=max>0?window.scrollY/max:0;
    progressBar.style.transform=`scaleX(${Math.max(0,Math.min(1,ratio))})`;
    ticking=false;
  };
  window.addEventListener('scroll',()=>{
    if(!ticking){
      requestAnimationFrame(updateScroll);
      ticking=true;
    }
  },{passive:true});
  updateScroll();
}
