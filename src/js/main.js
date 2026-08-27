/* DMC runtime: fluid interactions + wave background */
import './fluid.js';
import './wave-background.js';

function initNavigation(){
  const header=document.querySelector('header');
  const menu=document.querySelector('.menu');
  const links=document.querySelector('.nav-links');
  const onScroll=()=>header?.classList.toggle('scrolled',window.scrollY>30);
  window.addEventListener('scroll',onScroll,{passive:true});
  onScroll();
  menu?.addEventListener('click',()=>links?.classList.toggle('open'));
  links?.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>links.classList.remove('open')));
}

function boot(){
  initNavigation();
  if(typeof initFluidInteractions==='function') initFluidInteractions();
}

if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',boot,{once:true});
else boot();
