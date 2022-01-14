importScripts("js/sw-toolbox.js");
toolbox.precache([
    "index.html",
    "js/main.js",
    "css/main.css",
    "images/favicon.ico",
    "images/favicon-192x192.png",
    "fonts/SF-Pro-Display-Semibold.otf",
    "fonts/SF-Pro-Display-Regular.otf",
    "fonts/SF-Pro-Display-Thin.otf",
    "fonts/SF-Mono-Light.otf"
]);
toolbox.router.get("/*", toolbox.networkFirst, { networkTimeoutSeconds: 5 });