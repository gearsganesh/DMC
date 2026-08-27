export function initNavigation(){
  const header=document.querySelector('header');
  const updateHeader=()=>{if(header) header.style.background=window.scrollY>30?'rgba(3,3,3,.94)':'rgba(3,3,3,.72)'};
  window.addEventListener('scroll',updateHeader,{passive:true});
  updateHeader();
}
