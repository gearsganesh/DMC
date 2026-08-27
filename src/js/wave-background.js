/* DMC BLACK & GOLD VANTA WAVES */
const VANTA_SRC='https://cdn.jsdelivr.net/npm/vanta@0.5.24/dist/vanta.waves.min.js';
const THREE_SRC='https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js';
function loadScript(src){return new Promise((resolve,reject)=>{const s=document.createElement('script');s.src=src;s.onload=resolve;s.onerror=reject;document.head.appendChild(s);});}
async function initWaveBackground(){
  if(document.getElementById('dmc-wave-bg')) return;
  const bg=document.createElement('div');bg.id='dmc-wave-bg';document.body.prepend(bg);
  try{
    if(!window.THREE) await loadScript(THREE_SRC);
    if(!window.VANTA) await loadScript(VANTA_SRC);
    window.VANTA.WAVES({el:bg,THREE:window.THREE,mouseControls:true,touchControls:true,gyroControls:false,minHeight:200,minWidth:200,scale:1,scaleMobile:1,color:0xc7a86a,color2:0xe5ca91,shininess:28,waveHeight:14,waveSpeed:.48,zoom:1.08,backgroundColor:0x080807,backgroundAlpha:1});
  }catch(error){console.warn('DMC wave background unavailable',error);}
}
if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',initWaveBackground); else initWaveBackground();
