importScripts("js/sw-toolbox.js");
toolbox.precache([
    "index.html",
    "js/main.js",
    "css/main.css",
    "images/favicon.ico",
    "images/favicon-192x192.png",
    "fonts/Numans-Regular.ttf",
    "fonts/Prompt-ExtraLight.ttf",
    "fonts/RobotoMono-Regular.ttf"
]);
toolbox.router.get("/*", toolbox.networkFirst, { networkTimeoutSeconds: 5 });