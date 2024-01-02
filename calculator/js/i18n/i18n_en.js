const i18n_en = {
    "translation": {
        "newVersionAvailable": "A new version is available. Check Documentation",
        "orientationIsNotAvailable": "DD Force ON. Device orientation is not available - please use manual mode",
        "magicHistoryIsEnabled": "History ON",
        "magicHistoryIsDisabled": "History OFF",
        "ddForceIsEnabled": "DD Force ON",        
        "ddForceManualIsEnabled": "Manual mode ON",
        "ddForceManualDisabled": "Manual mode OFF",
        "toxicForceIsEnabled": "TOXIC Force ON",
        "history": "History",
        "dd": "Touches left",
        "alert": "Alert",
        "readme_part_1": `<p style="text-align: center;"><strong>(%) Numerology</strong></p>
            <p>Allows you to calculate the number of fate in numerology. Enter a <strong>NUMBER</strong> and enable the function. The negative sign and fraction sign will be ignored. After enabling the function, instead of the % sign, 2 digits, for 1 second, separated by a slash, will appear.</p>
            <ul>
            <li>The top one is the number of fate, and is also the remainder of &lt;<strong>NUMBER</strong>/9&gt;. More detailed information can be found in the book Numerologic forces by Nico Heinrich</li>
            <li>The bottom one is the result of the expression &lt;9-the number of fate&gt;. This number is used to show the "Multiple of 9" effect and similar. For example. We ask the viewer to multiply the numbers randomly until we get a number with 7-9 digits. 2 multiplied by 7 multiplied by 5 multiplied, etc. different numbers every time. If the result is 122333444, and the viewer thinks the 4th digit is equal to 3, then the viewer must pronounce the numbers 1,2,2,3,3,4,4,4 (without the intended digit) in any order. By entering these numbers into the calculator and turning on the function, we will see below the number conceived by the viewer. If 9 is displayed, then the viewer could have intended either 9 or 0. To determine, use any phishing method.</li>
            </ul>`,
        "readme_part_2": `<p style="text-align: center;"><strong>(+) Toxic force</strong></p>
            <p>Enter the <strong>NUMBER</strong> and enable the function. After this, the application will wait for the = button to be pressed, and no matter what operations are calculated, the result of the calculation will always be your entered <strong>NUMBER</strong>. The forced number will not be displayed in the history. Instead, there will be a real calculation result.</p>`,
        "readme_part_3": `<p style="text-align: center;"><strong>(-) DD force</strong></p>
            <p>Or display down force. Designed to force a <strong>NUMBER</strong>&nbsp;by bringing the result of calculations to the force using &ldquo;blind input of a random number&rdquo;.</p>
            <p>Enter the required <strong>NUMBER</strong> for the force and enable the function (Button = disables the function and leads to the required result):</p>
            <ul>
            <li><strong>0</strong> was entered. The result should be a number&nbsp;in the format <strong>&lt;DayMonthHoursMinutes&gt; + 1</strong> minute delay. The number is calculated based on the date/time on your device.</li>
            <li><strong>1-9</strong> was entered. The result should be a number in the format <strong>&lt;DayMonthHoursMinutes&gt; +</strong> the entered <strong>NUMBER</strong> of delay minutes. The number is calculated based on the date/time on your device.</li>
            <li><strong>Any other</strong> was entered. The result should be exactly the entered <strong>NUMBER</strong>.</li>
            </ul>
            <p>The forcing function operates in two modes:</p>
            <ul>
            <li><strong>automatic</strong> - turn the device screen down. The application automatically detects when the phone is upside down and blocks input as long as the phone is upside down.</li>
            <li><strong>manual</strong> - hold down the 0 button for 2 seconds until a white frame appears. This allows you to precisely control when the phone will block input. After turning on, the locking begins from the moment you first tap on the screen and for 10 seconds until the white frame appears again. This mode allows you to force the number by asking the viewer to close their eyes and not turn the phone over. Has priority over automatic mode.</li>
            </ul>
            <p>If the application has access (if not, then after enabling the function the application will notify about it) to the orientation of the device in space, then the mode will be <strong>automatic</strong>. At this moment, clicking on the screen causes a number to appear that is necessary to calculate the forced <strong>NUMBER</strong>. Formula: (any_calculations)&lt;any_operation&gt;X=<strong>NUMBER</strong>. Where X is the number that will be substituted for clicks on the screen. The required number is adapted to the last operation before turning the device over. But it is advisable to use + or -. In the case of the &times; and &divide; operations, the result of the calculation may not be accurate when duplicated on other calculators due to the nature of irrational numbers.</p>
            <p>If notifications are enabled or X=<strong>NUMBER</strong>, then X will be entered one digit for each touch on the screen while input is blocked. The number of required touches will be displayed in notifications if available. If not, the X will be displayed in its entirety the first time you tap on the screen.&nbsp;Each tap on the screen will trigger an animation of pressing the desired button. This allows to broadcast phone screen to a large screen on stage.</p>`,
        "readme_part_4": `<p style="text-align: center;"><strong>(-)&nbsp;History peek</strong></p>
            <p>Peeking function or input history. When you first open the app, you'll be asked for permission to access your device's notifications. Depending on the answer,&nbsp;history works in two modes:</p>
            <ul>
            <li><strong>Allowed</strong> - turns on/off the history function and the application will display the history in device notifications after any actions. This allows you to get the history on your watch in real time without touching your phone.</li>
            <li><strong>Not allowed</strong> - leads to a one-time pop-up window with the input history.</li>
            </ul>`,
        "readme": `<p style="text-align: center;">Description</p>
            <p style="text-align: justify;">The application is a fully working calculator with the iOS calculator interface except for the engineering mode. Automatically adapt to the locale and language of the operating system. Can be installed as an Android or iOS app, or used as a website in any browser. The application updates automatically. Does not require internet access. If the Internet is too slow and there is a delay in launching / restarting the application, turn off the Internet after the first full launch of the application. If any function does not work, delete the application, clear the site data in the browser and install the application again.</p>
            <p style="text-align: center;">Permissions</p>
            <p style="text-align: justify;">In order for the application to request possible permissions, you need to press once anywhere on the screen when you first start it.</p>
            <p style="text-align: justify;"><span style="text-decoration: underline;">Android</span>: permission to display notifications. If enabled, the "peek" function will be displayed in the notification panel. Thus, you can receive notifications on your smart watch. Otherwise, the information will be displayed in a pop-up window.</p>
            <p style="text-align: justify;"><span style="text-decoration: underline;">iOS</span>: permission to access device orientation for DD Force to work. Moreover, the system will ask for permission every time you launch the application.</p>
            <p style="text-align: center;">Functions</p>
            <p style="text-align: justify;">Any function is activated by holding the corresponding button for 2 seconds. After that, the application will vibrate and a white frame will appear around the edges of the screen. Vibration is not available on iOS.</p>
            <ul>
            <ul>
            <li style="text-align: justify;"><strong>(AC/C)</strong><br />Completely restarts the application and clears history.</li>
            <li style="text-align: justify;"><a href="readme.html?part=1"><strong>(%) Numerology</strong></a></li>
            <li style="text-align: justify;"><a href="readme.html?part=2"><strong>(+) Toxic force</strong></a></li>
            <li style="text-align: justify;"><a href="readme.html?part=3"><strong>(-) DD force</strong></a></li>
            <li style="text-align: justify;"><a href="readme.html?part=4"><strong>(=) History peek</strong></a></li>
            </ul>
            </ul>
            <p style="text-align: center;"><strong>Changelog</strong></p>
            <p style="text-align: center;"><strong>1.55</strong></p>
            <p style="text-align: center;">Improved history display. Now the most recent calculations are at the top of the list. History status on/off are stored in memory. Notifications will constantly appear for every change by the user. Old notifications will be cleared. Only one notification with the current history will be displayed. Improved instructions (slightly). Improved DD Force function. Now you can broadcast your phone screen even when it is upside down. Each press will launch an animation of pressing the desired number to force. And the missing number will be recorded digitally for each click on the screen. Just turn on notifications and receive information on your watch about how many more presses are required to create the desired number for the Force.</p>
            <p style="text-align: center;"><strong>1.51</strong></p>
            <p style="text-align: center;">The logic for displaying input history has been changed. Now line breaks appear and the result of calculations is displayed.</p>
            <p style="text-align: center;"><strong>1.50</strong></p>
            <p style="text-align: center;">Improved input history display. Now, when changing the calculation operation, the history is displayed without zeros between the clicked operations. Thus, only what was clicked is displayed exactly. Also changed how history works in notifications for Android devices. If notifications are not allowed, then the history works as before - a pop-up window appears with the history. If notifications are enabled, then history works as a feature. Holding = causes the history feature to be enabled and the app will only show the history in notifications after the = button is pressed once. This allows you to get the history on your watch without touching your smartphone. Only by asking the spectator to complete the calculation by pressing =. And at that moment, the whole story will appear in the notification bar and on the watch.</p>
            <p style="text-align: center;"><strong>1.49</strong></p>
            <p style="text-align: center;">Added the ability to select a time offset from 1 to 9 minutes for a DD force</p>
            <p style="text-align: center;"><strong>1.48</strong></p>
            <p style="text-align: center;">Changed the operation of the "0" button in DD force mode.</p>`
    }
};