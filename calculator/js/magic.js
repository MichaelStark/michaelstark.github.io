var magicHistory = "";
var magicToxicResult = "";
var magicDDFResult = "";

function magic(target) {
    switch (target.id) {
        case "c":
            // reload
            document.location.reload();
            break;
        case "%":
            // numerology
            var remainder = ((isDigitsTyping ? inputValue : resultValue.toString()).match(/\d/g).reduce((a, b) => a + Number(b), 0) % 9);
            target.innerHTML = "<sup>" + remainder + "</sup>⁄<sub>" + (9 - remainder) + "</sub>";
            setTimeout(_ => target.innerText = "%", 1000);
            break;
        case "0":
            // display down force without gyroscope
            overlayEl.classList.remove("hidden");
            overlayEl.onpointerdown = magicDDF;
            setTimeout(_ => { vibrate(true); overlayEl.classList.add("hidden"); overlayEl.onpointerdown = null; }, 15000);
            break;
        case "-":
            // display down force
            if (!window.DeviceOrientationEvent) {
                notify("Error", "Device orientation is not supported by your browser");
                break;
            }
            magicDDFResult = inputValue;
            overlayEl.onpointerdown = magicDDF;
            window.ondeviceorientation = (e) => {
                if ((e.beta > 160 || e.beta < -160) && e.gamma > -15 && e.gamma < 15) {
                    overlayEl.classList.remove("hidden");
                } else {
                    overlayEl.classList.add("hidden");
                }
            };
            reset();
            break;
        case "+":
            // toxic
            magicToxicResult = inputValue;
            reset();
            break;
        case "=":
            // history
            notify("History", magicHistory);
            break;
    }
}

function magicDDF() {
    vibrate();
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