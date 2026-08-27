let activeVehicle=null;
let albumImages=[];
let albumIndex=0;

function openVehicleAlbum(card){
  activeVehicle=card;
  const name=card.dataset.vehicleName || 'DMC Vehicle';
  const year=card.dataset.vehicleYear || '';
  const type=card.dataset.vehicleType || '';
  const spec=card.dataset.vehicleSpec || '';
  const gallery=(card.dataset.gallery || '').split('|').filter(Boolean);

  albumImages=gallery;
  albumIndex=0;

  document.getElementById('albumTitle').textContent=name;
  document.getElementById('albumMeta').textContent=
    [year,type,spec].filter(Boolean).join(' · ');

  renderAlbum();

  document.getElementById('vehicleAlbum').classList.add('open');
  document.body.style.overflow='hidden';
}

function renderAlbum(){
  const modal=document.getElementById('vehicleAlbum');
  const image=document.getElementById('albumImage');
  const counter=document.getElementById('albumCounter');
  const thumbs=document.getElementById('albumThumbs');
  const empty=document.getElementById('albumEmpty');

  if(!albumImages.length){
    image.removeAttribute('src');
    counter.textContent='0 / 0';
    thumbs.innerHTML='';
    empty.style.display='block';
    return;
  }

  empty.style.display='none';
  image.src=albumImages[albumIndex];
  image.alt=(activeVehicle?.dataset.vehicleName || 'DMC vehicle')+' photograph';
  counter.textContent=(albumIndex+1)+' / '+albumImages.length;

  thumbs.innerHTML=albumImages.map((src,i)=>`
    <button class="album-thumb ${i===albumIndex?'active':''}" type="button"
      onclick="albumGo(${i},event)">
      <img src="${src}" alt="Photo ${i+1}" loading="lazy">
    </button>
  `).join('');
}

function albumGo(index,event){
  if(event) event.stopPropagation();
  albumIndex=index;
  renderAlbum();
}

function albumPrev(event){
  if(event) event.stopPropagation();
  if(!albumImages.length)return;
  albumIndex=(albumIndex-1+albumImages.length)%albumImages.length;
  renderAlbum();
}

function albumNext(event){
  if(event) event.stopPropagation();
  if(!albumImages.length)return;
  albumIndex=(albumIndex+1)%albumImages.length;
  renderAlbum();
}

function closeVehicleAlbum(event){
  if(event && event.target.id!=='vehicleAlbum' &&
     !event.target.classList.contains('album-close')) return;
  document.getElementById('vehicleAlbum').classList.remove('open');
  document.body.style.overflow='';
}

document.addEventListener('keydown',e=>{
  const modal=document.getElementById('vehicleAlbum');
  if(!modal || !modal.classList.contains('open'))return;
  if(e.key==='Escape')closeVehicleAlbum();
  if(e.key==='ArrowLeft')albumPrev(e);
  if(e.key==='ArrowRight')albumNext(e);
});

export function initVehicleAlbums(){
  // Existing markup uses inline handlers; expose only these legacy-compatible entry points.
  Object.assign(window,{openVehicleAlbum,albumGo,albumPrev,albumNext,closeVehicleAlbum});
}
