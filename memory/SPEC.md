# DMC Portfolio Specification

## Purpose
Single-page portfolio/showcase website for Duraimohan Classics (DMC), a private collection of vintage automobiles. The homepage is a cinematic digital archive using the supplied DMC crest and collection photography.

## Editorial structure
- Hero: "Where Automotive History Lives" and the founder's lifelong journey with machines.
- Collection philosophy: restoration as active, road-going preservation rather than static display.
- Engineering heritage: mechanical honesty, ideas travelling across countries, and keeping restored classics road-going.
- Vehicle collection: 25 classics (22 automobiles and three two-wheelers), each with a card excerpt and owner-provided full history in its gallery.
- Statistics: 30+ years, 25 classics, and 50+ shows/events with supporting context.
- Contact and footer: founder contact details, collaboration scope, South India location, and the Heritage / Passion / Preservation motto.

## Key flows
- Browse the uploaded Vanta Waves background across the entire site, with pointer/touch interaction, heritage/engineering story, full 25-car matrix, heritage stats, and inquiry section.
- Click any vehicle card to open that vehicle's image gallery; switch between thumbnails and close the modal.
- Every vehicle card includes a concise historical excerpt; its gallery contains the full owner-provided history for that specific model.
- Visit `/admin` directly, unlock with the PIN documented in `memory/test_credentials.md`, choose a vehicle, upload multiple images with previews/remove controls, and save them to that vehicle's browser-persisted gallery. Admin is not linked from the public navigation.
- Submit the demo inquiry form with a name, email, and note to see an inline confirmation state. No external integration is connected.

## Data model
Static project content is held in `frontend/src/App.js`; assets from the supplied archive live under `frontend/public/assets/`.

## Auth and integrations
Prototype PIN gate only; no server authentication, backend API, or third-party integrations. Uploaded gallery data is stored in browser localStorage per vehicle key, not a real server directory. The contact form is intentionally a local demo interaction.

The uploaded `wave-background.js` behavior is integrated through a React effect, including pinned Three.js r134 and Vanta Waves 0.5.24 dynamic loading, full-page `#dmc-wave-bg`, mouse/touch controls, and cleanup. Only the palette is changed to `#0b0b0a`, `#cda968`, and `#e5ca91`.

The site keeps a strong fixed black veil over the animated waves for readable typography. The enlarged header uses a 35% black glass layer so the waves remain visible while the DMC crest stays the dominant brand mark.