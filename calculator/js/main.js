if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("./sw.js"); // enable PWA
}
window.ontouchend = _ => false; // disable long press vibration ! do not disable context menu
document.getElementById(".").innerText = .1.toLocaleString().slice(1, 2); // set dot depend on locale

// permissions
var isNotificationGranted = window.Notification && Notification.permission === "granted";
var deviceOrientationGranted = false;

// notification
if (navigator.permissions) {
    navigator.permissions.query({ name: "notifications" }).then(status => status.onchange = _ => isNotificationGranted = window.Notification && Notification.permission === "granted");
}

// requests
window.addEventListener("pointerup", getPermissions);
function getPermissions() {
    window.removeEventListener("pointerup", getPermissions);
    if (window.Notification && Notification.permission === "default") {
        Notification.requestPermission();
    }
    if (window.DeviceOrientationEvent && DeviceOrientationEvent.requestPermission && !deviceOrientationGranted) {
        DeviceOrientationEvent.requestPermission(); // iOS 13+
    }
}

function feedback(isMagic) {
    if (isMagic) {
        document.body.classList.add("magicAlarm");
        setTimeout(_ => document.body.classList.remove("magicAlarm"), 200);
    }
    if (navigator.vibrate) {
        if (isMagic) {
            navigator.vibrate(200);
        } else {
            navigator.vibrate(1);
        }
    }
}