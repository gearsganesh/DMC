const fs=require('fs');
const path=require('path');
const root=process.cwd();
const dist=path.join(root,'dist');
fs.rmSync(dist,{recursive:true,force:true});
fs.mkdirSync(path.join(dist,'assets'),{recursive:true});

const componentOrder=[
  'header.html',
  'hero.html',
  'sections/brand-stats.html',
  'sections/collection.html',
  'sections/featured.html',
  'sections/journey.html',
  'sections/garage.html',
  'sections/shows.html',
  'sections/gallery.html',
  'sections/contact.html',
  'sections/quote.html',
  'footer.html'
];

const componentsDir=path.join(root,'src','components');
const renderedComponents=componentOrder.map(file=>fs.readFileSync(path.join(componentsDir,file),'utf8')).join('\n');
const sourceIndex=fs.readFileSync(path.join(root,'index.html'),'utf8');
const builtIndex=sourceIndex.replace('<div id="app"></div>',`<div id="app">${renderedComponents}</div>`);

fs.writeFileSync(path.join(dist,'index.html'),builtIndex);
fs.cpSync(path.join(root,'src'),path.join(dist,'assets'),{recursive:true});
fs.cpSync(path.join(root,'public'),path.join(dist,'assets'),{recursive:true});
