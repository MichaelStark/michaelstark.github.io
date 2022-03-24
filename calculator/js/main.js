if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("./sw.js"); // enable PWA
}
window.ontouchend = _ => false; // disable long press vibration ! do not disable context menu
document.getElementById(".").innerText = .1.toLocaleString().slice(1, 2); // set dot depend on locale

// notification
var isNotificationGranted = window.Notification && Notification.permission === "granted";
if (navigator.permissions) {
    navigator.permissions.query({ name: "notifications" }).then(status => status.onchange = _ => isNotificationGranted = window.Notification && Notification.permission === "granted");
}

// permissions
window.addEventListener("pointerup", getPermissions);
function getPermissions() {
    window.removeEventListener("pointerup", getPermissions);
    if (window.Notification && Notification.permission === "default") {
        Notification.requestPermission();
    }
    if (window.DeviceOrientationEvent && DeviceOrientationEvent.requestPermission) {
        DeviceOrientationEvent.requestPermission(); // iOS 13+
    }
}

function vibrate(isMagic) {
    if (navigator.vibrate) {
        if (isMagic) {
            navigator.vibrate(200);
        } else {
            navigator.vibrate(1);
        }
    } else if (isMagic) {
        document.body.classList.add("magicAlarm");
        setTimeout(_ => document.body.classList.remove("magicAlarm"), 200);
    }
}

function notify(title, msg) {
    if (isNotificationGranted) {
        navigator.serviceWorker.ready.then(registration => registration.showNotification(title, { body: msg, silent: true }));
    } else {
        alert(msg);
    }
}