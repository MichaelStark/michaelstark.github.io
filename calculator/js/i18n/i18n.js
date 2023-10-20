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
                            number by fitting the calculation result to the force using "blind input of a random number". Enter the desired
                            number for the force (except for the numbers 0-9 they are reserved) and turn on the function. Button = disables
                            the function. You can also leave any number from 0 to 9 before turning on the function. This way will force the
                            number of the format: DayMonthHoursMinutes. The resulting time will be equal to +1 minute to the time on your device
                            if you entered the number 0 or 1 before turning it on. The remaining numbers 2-9 will shift the time of minutes by
                            the corresponding value. The forcing process itself requires turning the device screen down.
                            Usually, this process can be done automatically if permission was not required to access
                            the device orientation. In the inverted state - the application turns off the ability to use the
                            calculator and itself enters the missing number after pressing the screen. The desired number is adapted
                            to the last operation before the device is turned over. But it is desirable to use + or -. In the case
                            of the × and ÷ operations, the calculation result may not be accurate when duplicated on
                            other calculators due to the nature of irrational numbers. If no operation has been entered, the
                            application will force the required number by one digit for each touch on the screen. If the application
                            does not have access to the device orientation, after enabling this function, it will notify you about
                            it. In this case, you need to use the manual mode. You are required to tell the application when the
                            device screen will be flipped. It is enough to hold the "0" button for 2 seconds and after
                            that the application works as if the device was turned over under normal conditions. From the first touch on the
                            screen after 10 seconds, the application will return to normal input mode, vibrate and display a white frame around
                            the edges of the screen. Manual mode can work repeatedly and even if there is access to the orientation
                            of the device. Manual mode has priority over automatic mode. Thus, you can enter a random number simply
                            by closing your eyes.</li>
                        <li style=\"text-align: justify;\">=<br />Peek function or input history. After switching on, all entered
                            numbers and operations from the beginning of the application launch will be displayed, with the
                            exception of the results of intermediate and final calculations. If notifications are not enabled, a history pop-up appears immediately.
                            If notifications are enabled, then history works as a feature. Holding = causes the history feature to be enabled and the app
                            will only show the history in notifications after the = button is pressed once. This allows you to get the history on your watch
                            without touching your smartphone. Only by asking the viewer to complete the calculation by pressing =. And at that moment, the
                            whole story will appear in the notification bar and on the watch.</li>
                    </ul>
                    <p style=\"text-align: center;\"><strong>Changelog</strong></p>
                    <p style=\"text-align: center;\"><strong>1.51</strong></p>
                    <p style=\"text-align: center;\">The logic for displaying input history has been changed. Now line breaks appear and the result of calculations is displayed.</p>
                    <p style=\"text-align: center;\"><strong>1.50</strong></p>
                    <p style=\"text-align: center;\">Improved input history display. Now, when changing the calculation operation, the history is
                                                    displayed without zeros between the clicked operations. Thus, only what was clicked is displayed exactly.
                                                    Also changed how history works in notifications for Android devices. If notifications are not allowed,
                                                    then the history works as before - a pop-up window appears with the history. If notifications are enabled,
                                                    then history works as a feature. Holding = causes the history feature to be enabled and the app will
                                                    only show the history in notifications after the = button is pressed once. This allows you to get the history
                                                    on your watch without touching your smartphone. Only by asking the spectator to complete the calculation
                                                    by pressing =. And at that moment, the whole story will appear in the notification bar and on the watch.</p>
                    <p style=\"text-align: center;\"><strong>1.49</strong></p>
                    <p style=\"text-align: center;\">Added the ability to select a time offset from 1 to 9 minutes for a DD force</p>
                    <p style=\"text-align: center;\"><strong>1.48</strong></p>
                    <p style=\"text-align: center;\">Changed the operation of the "0" button in DD force mode.</p>`
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
                        слишком медленный интернет и ощущается задержка в запуске/перезагрузке приложения - отключите
                        интернет после первого полного запуска приложения. В случае неработоспособности какой-либо функции
                        - удалите приложение, очистите данные сайта в браузере и установите приложение заново.</p>
                    <p style=\"text-align: center;\">Разрешения</p>
                    <p style=\"text-align: justify;\">Что бы приложение запросило возможные разрешения, нужно при первом запуске
                        нажать один раз в любом месте экрана.</p>
                    <p style=\"text-align: justify;\"><span style=\"text-decoration: underline;\">Android</span>: разрешение для
                        отображения уведомлений. Если разрешить, то функция "подсмотреть" будет отображаться в
                        панели уведомлений. Таким образом можно получать уведомления на смарт часах. В противном случае -
                        информация будет отображаться в всплывающем окне.</p>
                    <p style=\"text-align: justify;\"><span style=\"text-decoration: underline;\">iOS</span>: разрешение на доступ к
                        ориентации устройства для работы функции "DD форс". Причем система будет запрашивать
                        разрешение каждый раз, когда вы запускаете приложение.</p>
                    <p style=\"text-align: center;\">Функции</p>
                    <p style=\"text-align: justify;\">Любая функция включается путем удержания соответствующей кнопки в течение 2
                        секунд. После чего приложение завибрирует и появится белая рамка по краям экрана. В iOS вибрация недоступна.</p>
                    <ul>
                        <li style=\"text-align: justify;\"><strong>AC/C</strong><br />Полностью перезапускает приложение.</li>
                        <li style=\"text-align: justify;\"><strong>%</strong><br />Позволяет вычислить число судьбы в нумерологии.
                            Введите любое число и после включения этой функции на 1 секунду вместо знака % появится две цифры,
                            разделенные косой чертой. Верхняя - число судьбы, а также это остаток от деления на 9
                            введенного числа. Нижняя - это результат выражения: (9 - остаток от деления на 9 введенного
                            числа). Знак отрицательного числа и знак дроби будет игнорироваться.</li>
                        <li style=\"text-align: justify;\"><strong>+</strong><br />Toxic форс. Вводите любое число
                            для форса и включаете функцию. После этого приложение будет ожидать нажатия кнопки = и какие бы ни
                            были операции до этого - результатом вычислений всегда будет ваше введенное число.</li>
                        <li style=\"text-align: justify;\"><strong>-</strong><br />DD форс или форс экраном вниз. Предназначен для
                            форсирования числа, путем приведения результата вычислений к форсу с помощью "слепого ввода
                            случайного числа". Вводим нужное число для форса (кроме цифр 0-9 они зарезервированы) и включаем функцию.
                            Кнопка = отключает функцию. Также можно перед включением функции оставить любую цифру от 0 до 9 - таким образом
                            мы будем форсировать число формата: ДеньМесяцЧасыМинуты. Результирующее время будет равно +1 минута ко времени на вашем устройстве
                            если перед включением ввели цифру 0 или 1. Остальные цифры 2-9 будут смещать время минут на соответствующее значение.
                            Сам процесс форсирования требует переворачивания устройства экраном вниз. Обычно этот процесс может
                            проходить автоматически, если не потребовалось разрешение на доступ к ориентации устройства. В
                            перевернутом состоянии - приложение выключает возможность пользоваться калькулятором и само
                            вводит недостающее число после нажатия на экран. Нужное число адаптируется к последней операции до
                            переворачивания устройства. Но желательно использовать + или -. В случае операций × и ÷
                            результат вычислений может быть не точным при дублировании их на других калькуляторах из-за природы
                            иррациональных чисел. В случае, если не было введено какой-либо операции - приложение будет
                            форсировать нужное число по одной цифре на каждое касание по экрану. Если у приложения нет доступа к
                            ориентации устройства - после включения этой функции оно уведомит об этом. В таком случае
                            нужно воспользоваться ручным режимом. От Вас требуется сообщить приложению о том, когда экран
                            устройства будет перевернут. Достаточно удерживать 2 секунды кнопку "0" и после этого
                            приложение работает, как если бы перевернули устройство в обычных условиях. С момента первого касания по экрану
                            через 10 секунд приложение вернется в обычный режим ввода, завибрирует и отобразится белая рамка по краям
                            экрана. Ручной режим может работать многократно и даже если есть доступ к ориентации устройства.
                            Ручной режим имеет приоритет перед автоматическим. Таким образом можно вводить случайное число
                            просто закрыв глаза.</li>
                        <li style=\"text-align: justify;\">=<br />Функция подсматривания или история ввода. После включения
                            отобразятся все введенные числа и операции от начала запуска приложения за исключением результатов
                            промежуточных и конечных вычислений. Если уведомления не разрешены, то сразу же появляется всплывающее окно с историей.
                            Если разрешены уведомления, то история работает как функция. Удержание = приводит к включению функции истории
                            и приложение отобразит историю в уведомлениях только после того, как будет нажата кнопка = один раз.
                            Это позволяет получить историю на часах, не прикасаясь к смартфону. Лишь попросив зрителя завершить вычисления нажатием на =.
                            И в этот момент вся история появится в шторке уведомлений и на часах.</li>
                    </ul>
                    <p style=\"text-align: center;\"><strong>Список изменений</strong></p>
                    <p style=\"text-align: center;\"><strong>1.51</strong></p>
                    <p style=\"text-align: center;\">Изменена логика отображения истории ввода. Теперь появились переносы строк и отображается результат вычислений.</p>
                    <p style=\"text-align: center;\"><strong>1.50</strong></p>
                    <p style=\"text-align: center;\">Улучшено отображение истории ввода. Теперь при изменении операции вычисления
                                                    в итории отображается без нулей между нажатыми операциями. Таким образом отображается
                                                    в точности только то, что было нажато. Также изменена работа истории в уведомлениях для Андроид устроств.
                                                    Если уведомления не разрешены, то история работает как и прежде - появляется всплывающее окно с историей.
                                                    Если разрешены уведомления, то история работает как функция. Удержание = приводит к включению функции истории
                                                    и приложение отобразит историю в уведомлениях только после того, как будет нажата кнопка = один раз.
                                                    Это позволяет получить историю на часах, не прикасаясь к смартфону. Лишь попросив зрителя завершить вычисления нажатием на =.
                                                    И в этот момент вся история появится в шторке уведомлений и на часах.</p>
                    <p style=\"text-align: center;\"><strong>1.49</strong></p>
                    <p style=\"text-align: center;\">Добавлена возможность выбора смещения времени от 1 до 9 минут для DD форса.</p>
                    <p style=\"text-align: center;\"><strong>1.48</strong></p>
                    <p style=\"text-align: center;\">Изменилась работа кнопки "0" в режиме DD форс.</p>`
            }
        }
    }
};