import { initAnimations } from './animations.js';
import { initNavigation } from './navigation.js';
import { initForms } from './forms.js';
import { initVehicleAlbums } from './vehicle-album.js';

const components=["header", "hero", "sections/brand-stats", "sections/collection", "sections/featured", "sections/journey", "sections/garage", "sections/shows", "sections/gallery", "sections/contact", "sections/quote", "footer"];

async function loadSite(){
  const app=document.getElementById('app');
  const fragments=await Promise.all(components.map(async name=>{
    const response=await fetch(`/assets/components/${name}.html`);
    if(!response.ok) throw new Error(`Failed to load component: ${name}`);
    return response.text();
  }));
  app.innerHTML=fragments.join('\n');
  document.body.classList.add('js-active');
  initVehicleAlbums();
  initAnimations();
  initNavigation();
  initForms();
}

loadSite().catch(error=>{console.error(error);document.getElementById('app').innerHTML='<p class="load-error">Unable to load DMC.</p>';});
