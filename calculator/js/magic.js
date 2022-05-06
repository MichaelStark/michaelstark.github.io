var magicHistory = "";
var magicToxicResult = "";
var magicDDFResult = "";
var magicDDFAuto = false;
var overlayDDFEl = document.getElementById("overlayDDF");
overlayDDFEl.onpointerdown = _ => {
    if (magicDDFResult) {
        feedback();
        isDigitsTyping = true;
        if (Number(magicDDFResult) === 0) {
            var forceTime = new Date(((new Date()).getTime() + 60000));
            magicDDFResult = forceTime.getDate().toLocaleString(navigator.language, { minimumIntegerDigits: 2 })
                + (forceTime.getMonth() + 1).toLocaleString(navigator.language, { minimumIntegerDigits: 2 })
                + forceTime.getHours().toLocaleString(navigator.language, { minimumIntegerDigits: 2 })
                + forceTime.getMinutes().toLocaleString(navigator.language, { minimumIntegerDigits: 2 });
        }
        inputValue = (Number(magicDDFResult) - resultValue).toString();
        displayValue(inputValue);
    }
};
window.ondeviceorientation = (e) => {
    if (magicDDFResult && magicDDFAuto) {
        if ((e.beta > 160 || e.beta < -160) && e.gamma > -15 && e.gamma < 15) {
            overlayDDFEl.classList.remove("hidden");
        } else {
            overlayDDFEl.classList.add("hidden");
        }
    }
};

function magic(target) {
    switch (target.id) {
        case "c":
            // reload
            document.location.reload();
            break;
        case "+-":
            // remote control
            break;
        case "%":
            // numerology
            var remainder = ((isDigitsTyping ? inputValue : resultValue.toString()).match(/\d/g).reduce((a, b) => a + Number(b), 0) % 9);
            target.innerHTML = "<sup>" + remainder + "</sup>⁄<sub>" + (9 - remainder) + "</sub>";
            setTimeout(_ => target.innerText = "%", 1000);
            break;
        case "0":
            // display down force manually
            if (magicDDFResult) {
                magicDDFAuto = false;
                overlayDDFEl.classList.remove("hidden");
                setTimeout(_ => { feedback(true); overlayDDFEl.classList.add("hidden"); magicDDFAuto = true; }, 10000);
                break;
            }
        case "-":
            // display down force
            disableMagic();
            magicDDFResult = inputValue;
            magicDDFAuto = true;
            if (!window.DeviceOrientationEvent) {
                notify("Error", "Device orientation is not supported by your browser - please use manual mode");
            }
            reset();
            break;
        case "+":
            // toxic
            disableMagic();
            magicToxicResult = inputValue;
            reset();
            break;
        case "=":
            // history
            notify("History", magicHistory);
            break;
    }
}

function applyMagic() {
    if (magicToxicResult) {
        resultValue = Number(magicToxicResult);
    }
}

function disableMagic() {
    magicToxicResult = "";
    magicDDFResult = "";
    magicDDFAuto = false;
}