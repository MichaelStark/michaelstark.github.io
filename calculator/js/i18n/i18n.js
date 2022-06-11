const i18n = {
    "fallbackLng": "en",
    "resources": {
        "en": {
            "translation": {
                "newVersionAvailable": "A new version is available. Check Documentation",
                "orientationIsNotAvailable": "Device orientation is not available - please use manual mode",
                "history": "History",
                "readme": `<p style=\"text-align: center;\">Description</p>
                    <p style=\"text-align: justify;\">The application is a fully working calculator with the iOS calculator interface
                        except for the engineering mode. Automatically adapt to the locale and language of the operating system. Can
                        be installed as an Android or iOS app, or used as a website in any browser. The application updates
                        automatically. Does not require internet access. If the Internet is too slow and there is a delay in
                        launching / restarting the application, turn off the Internet after the first full launch of the
                        application. If any function does not work, delete the application, clear the site data in the browser and
                        install the application again.</p>
                    <p style=\"text-align: center;\">Permissions</p>
                    <p style=\"text-align: justify;\">In order for the application to request possible permissions, you need to press
                        once anywhere on the screen when you first start it.</p>
                    <p style=\"text-align: justify;\"><span style=\"text-decoration: underline;\">Android</span>: permission to display
                        notifications. If enabled, the \"peek\" function will be displayed in the notification panel. Thus, you can
                        receive notifications on your smart watch. Otherwise, the information will be displayed in a pop-up window.
                    </p>
                    <p style=\"text-align: justify;\"><span style=\"text-decoration: underline;\">iOS</span>: permission to access
                        device orientation for DD Force to work. Moreover, the system will ask for permission every time you launch
                        the application.</p>
                    <p style=\"text-align: center;\">Functions</p>
                    <p style=\"text-align: justify;\">Any function is activated by holding the corresponding button for 2 seconds.
                        After that, the application will vibrate and a white frame will appear around the edges of the screen.
                        Vibration is not available on iOS.
                    </p>
                    <ul>
                        <li style=\"text-align: justify;\"><strong>AC/C</strong><br />Completely restarts the application.</li>
                        <li style=\"text-align: justify;\"><strong>%</strong><br />Allows you to calculate the number of fate in
                            numerology. Enter any number and after enabling this function for 1 second, instead of the % sign, two
                            digits will appear, separated by a slash. The upper one is the number of fate, and it is also the
                            remainder of the division by 9 of the entered number. The lower one is the result of the expression: (9
                            is the remainder of dividing the entered number by 9). Negative number sign and fraction sign will be
                            ignored.</li>
                        <li style=\"text-align: justify;\"><strong>+</strong><br />Toxic force. Enter any number for force and turn on
                            the function. After that, the application will wait for the = button to be pressed, and no matter what
                            the operations were before, the result of the calculations will always be your entered number.</li>
                        <li style=\"text-align: justify;\"><strong>-</strong><br />DD force or force screen down. Designed to force a
                            number by fitting the calculation result to the force using \"blind input of a random number\". Enter the
                            desired number for force and turn on the function. Button = disables the function. You can also leave the
                            number 0 before turning on the function - this way we will force the number of the format: DayMonthHoursMinutes.
                            The resulting time will be +1 minute to the time on your device. The forcing process itself requires turning
                            the device screen down. Usually, this process can be done automatically if permission was not required to access
                            the device orientation. In the inverted state - the application turns off the ability to use the
                            calculator and itself enters the missing number after pressing the screen. The desired number is adapted
                            to the last operation before the device is turned over. But it is desirable to use + or -. In the case
                            of the &times; and &divide; operations, the calculation result may not be accurate when duplicated on
                            other calculators due to the nature of irrational numbers. If no operation has been entered, the
                            application will force the required number by one digit for each touch on the screen. If the application
                            does not have access to the device orientation, after enabling this function, it will notify you about
                            it. In this case, you need to use the manual mode. You are required to tell the application when the
                            device screen will be flipped. It is enough to hold the &ldquo;0&rdquo; button for 2 seconds and after
                            that the application works as if the device was turned over under normal conditions. From the first touch on the
                            screen after 10 seconds, the application will return to normal input mode, vibrate and display a white frame around
                            the edges of the screen. Manual mode can work repeatedly and even if there is access to the orientation
                            of the device. Manual mode has priority over automatic mode. Thus, you can enter a random number simply
                            by closing your eyes.</li>
                        <li style=\"text-align: justify;\">=<br />Peek function or input history. After switching on, all entered
                            numbers and operations from the beginning of the application launch will be displayed, with the
                            exception of the results of intermediate and final calculations.</li>
                    </ul>
                    <p style=\"text-align: center;\">Changelog</p>
                    <p style=\"text-align: center;\"><strong>1.48</strong></p>
                    <p style=\"text-align: justify;\">It is advisable to completely reinstall the application with preliminary cleaning of the site data in the browser.
                        Changed the operation of the &laquo;0&raquo; button in DD force mode.</p>`
            }
        },
        "ru": {
            "translation": {
                "newVersionAvailable": "Доступна новая версия. Проверьте документацию",
                "orientationIsNotAvailable": "Нет доступа к ориентации устройства - используйте ручной режим",
                "history": "История",
                "readme": `<p style=\"text-align: center;\">Описание</p>
                    <p style=\"text-align: justify;\">Приложение представляет из себя полностью работающий калькулятор с
                        интерфейсом iOS калькулятора за исключением инженерного режима. Автоматически подстраиваться под локаль
                        и язык в операционной системе. Может быть установлено как приложение Android или iOS либо использовано
                        как сайт в любом браузере. Приложение обновляется автоматически. Не требует доступа к интернету. Если
                        слишком медленный интернет и ощущается задержка в запуске/перезагрузке приложения &ndash; отключите
                        интернет после первого полного запуска приложения. В случае неработоспособности какой-либо функции
                        &ndash; удалите приложение, очистите данные сайта в браузере и установите приложение заново.</p>
                    <p style=\"text-align: center;\">Разрешения</p>
                    <p style=\"text-align: justify;\">Что бы приложение запросило возможные разрешения, нужно при первом запуске
                        нажать один раз в любом месте экрана.</p>
                    <p style=\"text-align: justify;\"><span style=\"text-decoration: underline;\">Android</span>: разрешение для
                        отображения уведомлений. Если разрешить, то функция &laquo;подсмотреть&raquo; будет отображаться в
                        панели уведомлений. Таким образом можно получать уведомления на смарт часах. В противном случае &ndash;
                        информация будет отображаться в всплывающем окне.</p>
                    <p style=\"text-align: justify;\"><span style=\"text-decoration: underline;\">iOS</span>: разрешение на доступ к
                        ориентации устройства для работы функции &laquo;DD форс&raquo;. Причем система будет запрашивать
                        разрешение каждый раз, когда вы запускаете приложение.</p>
                    <p style=\"text-align: center;\">Функции</p>
                    <p style=\"text-align: justify;\">Любая функция включается путем удержания соответствующей кнопки в течение 2
                        секунд. После чего приложение завибрирует и появится белая рамка по краям экрана. В iOS вибрация недоступна.</p>
                    <ul>
                        <li style=\"text-align: justify;\"><strong>AC/C</strong><br />Полностью перезапускает приложение.</li>
                        <li style=\"text-align: justify;\"><strong>%</strong><br />Позволяет вычислить число судьбы в нумерологии.
                            Введите любое число и после включения этой функции на 1 секунду вместо знака % появится две цифры,
                            разделенные косой чертой. Верхняя &ndash; число судьбы, а также это остаток от деления на 9
                            введенного числа. Нижняя &ndash; это результат выражения: (9 - остаток от деления на 9 введенного
                            числа). Знак отрицательного числа и знак дроби будет игнорироваться.</li>
                        <li style=\"text-align: justify;\"><strong>+</strong><br />Toxic форс. Вводите любое число
                            для форса и включаете функцию. После этого приложение будет ожидать нажатия кнопки = и какие бы ни
                            были операции до этого &ndash; результатом вычислений всегда будет ваше введенное число.</li>
                        <li style=\"text-align: justify;\"><strong>-</strong><br />DD форс или форс экраном вниз. Предназначен для
                            форсирования числа, путем подгона результата вычислений к форсу с помощью &laquo;слепого ввода
                            случайного числа&raquo;. Вводим нужное число для форса и включаем функцию. Кнопка = отключает функцию.
                            Также можно перед включением функции оставить цифру 0 &ndash; таким образом мы будем форсировать число
                            формата: ДеньМесяцЧасыМинуты. Результирующее время будет равно +1 минута ко времени на вашем устройстве.
                            Сам процесс форсирования требует переворачивания устройства экраном вниз. Обычно этот процесс может
                            проходить автоматически, если не потребовалось разрешение на доступ к ориентации устройства. В
                            перевернутом состоянии &ndash; приложение выключает возможность пользоваться калькулятором и само
                            вводит недостающее число после нажатия на экран. Нужное число адаптируется к последней операции до
                            переворачивания устройства. Но желательно использовать + или -. В случае операций &times; и &divide;
                            результат вычислений может быть не точным при дублировании их на других калькуляторах из-за природы
                            иррациональных чисел. В случае, если не было введено какой-либо операции &ndash; приложение будет
                            форсировать нужное число по одной цифре на каждое касание по экрану. Если у приложения нет доступа к
                            ориентации устройства &ndash; после включения этой функции оно уведомит об этом. В таком случае
                            нужно воспользоваться ручным режимом. От Вас требуется сообщить приложению о том, когда экран
                            устройства будет перевернут. Достаточно удерживать 2 секунды кнопку &laquo;0&raquo; и после этого
                            приложение работает, как если бы перевернули устройство в обычных условиях. С момента первого касания по экрану
                            через 10 секунд приложение вернется в обычный режим ввода, завибрирует и отобразится белая рамка по краям
                            экрана. Ручной режим может работать многократно и даже если есть доступ к ориентации устройства.
                            Ручной режим имеет приоритет перед автоматическим. Таким образом можно вводить случайное число
                            просто закрыв глаза.</li>
                        <li style=\"text-align: justify;\">=<br />Функция подсматривания или история ввода. После включения
                            отобразятся все введенные числа и операции от начала запуска приложения за исключением результатов
                            промежуточных и конечных вычислений.</li>
                    </ul>
                    <p style=\"text-align: center;\">Список изменений</p>
                    <p style=\"text-align: center;\"><strong>1.48</strong></p>
                    <p style=\"text-align: justify;\">Желательно полностью переустановить приложение с предварительной очисткой данных сайта в браузере.
                        Изменилась работа кнопки &laquo;0&raquo; в режиме DD форс.</p>`
            }
        }
    }
};