importScripts("js/sw-toolbox.js");
toolbox.precache([
    "index.html",
    "js/main.js",
    "css/main.css",
    "images/favicon.ico",
    "images/favicon-192x192.png",
    "fonts/SFMono-Light.woff2",
    "fonts/SFProDisplay-Light.woff2",
    "fonts/SFProDisplay-Regular.woff2",
    "fonts/SFProDisplay-Semibold.woff2"
]);
toolbox.router.get("/*", toolbox.networkFirst, { networkTimeoutSeconds: 5 });