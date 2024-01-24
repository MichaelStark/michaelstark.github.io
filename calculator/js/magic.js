let magicHistory = "";
let magicHistoryBuffer = "";
let magicHistoryCurrent = "";
let isMagicHistoryEnabled = !!localStorage.getItem("isMagicHistoryEnabled");
let magicToxicResult = "";
let magicDDFResult = "";
let isMagicDDFAuto = false;
let isMagicDDFManualTimeout = false;
let overlayDDFEl = document.getElementById("overlayDDF");
overlayDDFEl.onpointerdown = _ => {
    if (magicDDFResult) {
        if (!isMagicDDFAuto && !isMagicDDFManualTimeout) {
            isMagicDDFManualTimeout = true;
            setTimeout(_ => {
                feedback(true);
                showAlert(i18next.t("ddForceManualDisabled"), false);
                overlayDDFEl.classList.add("hidden");
                isMagicDDFAuto = true;
                isMagicDDFManualTimeout = false;
            }, 10000);
        }
        clearPushedOperation();
        resetEl.innerText = "C";
        isDigitsTyping = true;
        let forceValueNumber = Number(magicDDFResult);
        if (forceValueNumber >= 0 && forceValueNumber <= 9) {
            let forceTime = new Date(((new Date()).getTime() + 60000 * (forceValueNumber === 0 ? 1 : forceValueNumber)));
            magicDDFResult = forceTime.getDate().toLocaleString(navigator.language, { minimumIntegerDigits: 2 })
                + (forceTime.getMonth() + 1).toLocaleString(navigator.language, { minimumIntegerDigits: 2 })
                + forceTime.getHours().toLocaleString(navigator.language, { minimumIntegerDigits: 2 })
                + forceTime.getMinutes().toLocaleString(navigator.language, { minimumIntegerDigits: 2 });
            forceValueNumber = Number(magicDDFResult);
        }
        let forceValue;
        switch (operation) {
            case "+":
                forceValue = (forceValueNumber - resultValue).toString();
                break;
            case "-":
                forceValue = (resultValue - forceValueNumber).toString();
                break;
            case "x":
                forceValue = (forceValueNumber / resultValue).toString();
                break;
            case "÷":
                forceValue = (resultValue / forceValueNumber).toString();
                break;
            default:
                forceValue = magicDDFResult;
                break;
        }
        if (forceValue !== magicDDFResult && !isNotificationPossible()) {
            inputValue = forceValue;
        } else if (inputValue !== forceValue) {
            let fakeTouchBtnId = null;
            if (forceValue.startsWith(inputValue)) {
                inputValue += forceValue[inputValue.length];
            } else {
                if (forceValue[0] === "-") {
                    if (inputValue[0] === forceValue[1]) {
                        inputValue = "-" + inputValue;
                        fakeTouchBtnId = "+-";
                    } else {
                        inputValue = forceValue[1];
                    }
                } else {
                    inputValue = forceValue[0];
                }
            }
            doFakeTouchButton(fakeTouchBtnId || inputValue[inputValue.length - 1]);
            if (isNotificationPossible()) {
                pushNotification("dd", forceValue.length - inputValue.length);
            }
        } else {
            return;
        }
        displayValue(inputValue);
        add2MagicHistory(inputValue);
        feedback();
    }
};
window.ondeviceorientation = (e) => {
    deviceOrientationGranted = e.alpha != null && e.beta != null && e.gamma != null;
    if (deviceOrientationGranted && magicDDFResult && isMagicDDFAuto) {
        if ((e.beta > 160 || e.beta < -160) && e.gamma > -15 && e.gamma < 15) {
            overlayDDFEl.classList.remove("hidden");
        } else {
            overlayDDFEl.classList.add("hidden");
        }
    }
};

function add2MagicHistory(value) {
    if (!isClientMode() && isRCEnabled()) {
        return;
    }
    if (isLE(value) && magicHistoryBuffer.length > 0) {
        magicHistory = getMagicHistory();
        magicHistoryBuffer = "";
        magicHistoryCurrent = "";
    } else if (isOperation(value) && isNumber(magicHistoryCurrent) || isNumber(value) && isOperation(magicHistoryCurrent)) {
        magicHistoryBuffer += getMagicHistoryCurrent();
        magicHistoryCurrent = value;
    } else if (!isLE(value) && magicHistoryCurrent !== value && (value === "0" && isDigitsTyping || value !== "0")) {
        magicHistoryCurrent = value;
    } else {
        return;
    }

    if (isMagicHistoryEnabled && isNotificationPossible()) {
        pushNotification("history", getMagicHistory());
    }
}

function getMagicHistoryCurrent() {
    return magicHistoryCurrent.startsWith("-") && magicHistoryCurrent.length > 1 ? "(" + magicHistoryCurrent + ")" : magicHistoryCurrent;
}

function getMagicHistory() {
    let currentHistory = magicHistoryBuffer + getMagicHistoryCurrent();
    return currentHistory + (currentHistory.length > 0 ? ";" : "") + (magicHistory.length > 0 && magicHistory !== "\n" ? "\n" + magicHistory : "");
}

function magic(target) {
    if (isClientMode() && target.id !== "c") {
        return;
    }
    switch (target.id) {
        case "c":
            // reload
            loadingEl.classList.remove("hidden");
            document.location.reload();
            break;
        case "+-":
            // remote control
            toggleRC();
            break;
        case "%":
            // numerology
            let remainder = ((isDigitsTyping ? inputValue : resultValue.toString()).match(/\d/g).reduce((a, b) => a + Number(b), 0) % 9);
            target.innerHTML = "<sup>" + (remainder || 9) + "</sup>⁄<sub>" + (9 - remainder) + "</sub>";
            setTimeout(_ => target.innerText = "%", 1000);
            break;
        case "0":
            // display down force manually
            if (isRCEnabled()) {
                sendRCData({ type: "0" });
            } else {
                apply0();
            }
            break;
        case "-":
            // display down force
            disableMagic();
            if (isRCEnabled()) {
                sendRCData({ type: "-", payload: inputValue });
            } else {
                applyDDForce(inputValue);
            }
            reset();
            break;
        case "+":
            // toxic
            disableMagic();
            if (isRCEnabled()) {
                sendRCData({ type: "+", payload: inputValue });
            } else {
                applyToxic(inputValue);
            }
            reset();
            break;
        case "=":
            // history
            if (isRCEnabled()) {
                sendRCData({ type: "=" });
            } else {
                if (isNotificationPossible()) {
                    applyHistory();
                } else {
                    showAlert(getMagicHistory());
                }
            }
            break;
    }
}

function onReceiveRCData(data) {
    switch (data.type) {
        case "0":
            apply0(data.payload);
            break;
        case "-":
            applyDDForce(data.payload);
            break;
        case "+":
            applyToxic(data.payload);
            break;
        case "=":
            applyHistory(data.payload);
            break;
        default:
            pushNotification(data.type, data.payload);
            break;
    }
}

function apply0() {
    if (magicDDFResult) {
        isMagicDDFAuto = false;
        overlayDDFEl.classList.remove("hidden");
        showAlert(i18next.t("ddForceManualIsEnabled"), false);
    }
}

function applyDDForce(value) {
    magicDDFResult = value;
    isMagicDDFAuto = true;
    if (deviceOrientationGranted) {
        showAlert(i18next.t("ddForceIsEnabled"), false);
    } else {
        showAlert(i18next.t("orientationIsNotAvailable"));
    }
}

function applyToxic(value) {
    magicToxicResult = value;
    showAlert(i18next.t("toxicForceIsEnabled"), false);
}

function applyHistory() {
    isMagicHistoryEnabled = !isMagicHistoryEnabled;
    isMagicHistoryEnabled ? localStorage.setItem("isMagicHistoryEnabled", true) : localStorage.removeItem("isMagicHistoryEnabled");
    showAlert(i18next.t(isMagicHistoryEnabled ? "magicHistoryIsEnabled" : "magicHistoryIsDisabled"));
}

function applyPostMagic(targetId) {
    if (targetId === "=") {
        if (isClientMode() || !isRCEnabled()) {
            if (magicToxicResult) {
                resultValue = Number(magicToxicResult);
            }
        }
        disableMagic();
    }
}

function disableMagic() {
    magicToxicResult = "";
    magicDDFResult = "";
    isMagicDDFAuto = false;
}