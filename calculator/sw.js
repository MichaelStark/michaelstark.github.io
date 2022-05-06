importScripts("js/sw-toolbox.js");
toolbox.precache([
    "index.html",
    "readme.html",
    "js/main.js",
    "js/rc.js",
    "js/magic.js",
    "js/calculator.js",
    "css/main.css",
    "images/icon-192.png",
    "images/icon-512.png",
    "images/maskable-icon-512.png",
    "fonts/SFMono-Light.woff2",
    "fonts/SFProDisplay-Light.woff2",
    "fonts/SFProDisplay-Regular.woff2",
    "fonts/SFProDisplay-Semibold.woff2"
]);
toolbox.router.get("/*", toolbox.networkFirst, { networkTimeoutSeconds: 2 });