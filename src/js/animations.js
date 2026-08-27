export function initAnimations(){
  const observer=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('show')})},{threshold:.12});
  document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));
  setTimeout(()=>document.getElementById('intro')?.remove(),4000);
}
