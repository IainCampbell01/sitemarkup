SITE MARKUP - HOSTING INSTRUCTIONS
==================================
FREE OPTION - GITHUB PAGES (no company web space needed)
  a. Create a free account at github.com (e.g. username: iain-acorn).
  b. New repository, name it: sitemarkup   (set to Public)
  c. "uploading an existing file" -> drag in the 6 app files below -> Commit changes.
  d. Settings > Pages > Source: Deploy from a branch > Branch: main, folder / (root) > Save.
  e. After 1-2 minutes the app is live at https://<username>.github.io/sitemarkup/
     Use that address in the QR code maker.

1. Upload ALL files in this folder (except QR-code-maker.html, optional) into one folder
   on your web space, e.g. https://www.acorn-mps.co.uk/sitemarkup/
     index.html, manifest.webmanifest, sw.js, icon-192.png, icon-512.png, icon-maskable-512.png
2. The site MUST be served over https:// - Android will not install the app or run it offline otherwise.
3. If your server does not recognise .webmanifest, add the MIME type: application/manifest+json
4. Open QR-code-maker.html, type the folder address, then Download PNG or Print poster.
5. On each phone: scan the QR code, open in Chrome, tap "Install app" (or Chrome menu > Add to Home screen > Install).
   Open it once while online; after that it works with no signal.

UPDATING THE APP: replace index.html on the server. Phones pick up the new version the next time
they open the app with signal (it takes effect on the following open).

DATA: projects, markups and photos are stored on each device only. Use Backup on a project
to save a copy or move it to another device.
