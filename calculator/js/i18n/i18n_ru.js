const i18n_ru = {
    "translation": {
        "newVersionAvailable": "Доступна новая версия. Проверьте документацию",
        "orientationIsNotAvailable": "Нет доступа к ориентации устройства - используйте ручной режим",
        "magicHistoryIsEnabled": "История ВКЛ",
        "magicHistoryIsDisabled": "История ВЫКЛ",
        "history": "История",
        "dd": "Нажатий осталось",
        "readme_part_1": `<p style="text-align: center;"><strong>(%) Numerology</strong></p>
            <p>Позволяет вычислить число судьбы в нумерологии. Введите <strong>ЧИСЛО</strong>&nbsp;и включите функцию. Знак отрицательного числа и знак дроби будет игнорироваться. После включения функции - вместо знака % появится 2 цифры на 1 секунду, разделенные косой чертой.</p>
            <ul>
            <li>Верхняя - число судьбы, а также это остаток от &lt;<strong>ЧИСЛО</strong>/9&gt;. Более подробную информацию можно прочесть в книге <em>Numerologic forces by&nbsp;Nico Heinrich</em></li>
            <li>Нижняя - это результат выражения &lt;9-число судьбы&gt;. Это число используется для показа эффекта "Multiple of 9" и подобных. Например. Просим зрителя умножать цифры случайным обрызом до тех пор пока не получим число с 7-9 цифрами. 2 умножить на 7 умножить на 5 умножить и т.д. разные цифры каждый раз. Если получилось число 122333444, и зритель задумал 4-ую цифру равную 3, то зритель должен произнести цифры 1,2,2,3,3,4,4,4 (без задуманной цифры) в любом порядке. Введя эти цифры в калькулятор и включив функцию мы увидим внизу цифру - задуманную зрителем. В случае если отображается 9, то зритель мог задумать или 9 или 0. Для определения используйте любой метод фишинга.</li>
            </ul>`,
        "readme_part_2": `<p style="text-align: center;"><strong>(+) Toxic force</strong></p>
            <p>Вводите <strong>ЧИСЛО</strong>&nbsp;и включаете функцию. После этого приложение будет ожидать нажатия кнопки = и какие бы ни были операции результатом вычислений всегда будет ваше введенное <strong>ЧИСЛО</strong>. Форсируемое число не будет отображено в истории. Вместо него будет настоящий результат вычислений.</p>`,
        "readme_part_3": `<p style="text-align: center;"><strong>(-) DD force</strong></p>
            <p>Или форс экраном вниз. Предназначен для форсирования <strong>ЧИСЛА</strong>, путем приведения результата вычислений к форсу с помощью "слепого ввода случайного числа".</p>
            <p>Вводим нужное <strong>ЧИСЛО</strong>&nbsp;для форса и включаем функцию (Кнопка = отключает функцию и приводит к&nbsp;требуемому результату):</p>
            <ul>
            <li>Было ведено <strong>0</strong>. В результате должно получиться число формата <strong>&lt;ДеньМесяцЧасыМинуты&gt;</strong> <strong>+ 1</strong> минута задержки.&nbsp;Число&nbsp;вычисляется на основе даты/времени на вашем устройстве.</li>
            <li>Было ведено <strong>1-9</strong>.&nbsp;В результате должно получиться число формата <strong>&lt;ДеньМесяцЧасыМинуты&gt; +</strong> введенное&nbsp;<strong>ЧИСЛО</strong> минут задержки. Число&nbsp;вычисляется на основе даты/времени на вашем устройстве.</li>
            <li>Было введено<strong> любое другое</strong>. В результате должно получиться именно введенное&nbsp;<strong>ЧИСЛО</strong>.</li>
            </ul>
            <p>Функция форсирования работает в двух режимах:</p>
            <ul>
            <li>автоматический - перевернуть устройство экраном вниз. Приложение автоматически определяет когда телефон перевернут и блокирует ввод до тех пор пока телефон перевернут.&nbsp;</li>
            <li>ручной - удержание кнопки 0 в течении 2 секунд до появления белой рамки. Это позволяет точно контролировать, когда телефон заблокирует ввод. После включения блокировка&nbsp;начинается&nbsp;с момента первого нажатия по экрану и на протяжении 10 секунд до появления белой рамки снова. Этот режим позволяет&nbsp;форсировать число, попросив зрителя закрыть глаза и не переворачивать телефон. Обладает приоритетом над автоматическим режимом.</li>
            </ul>
            <p>Если у приложения есть доступ (если нет, то после включения функции приложение уведомит об этом) к ориентации устройства в пространстве, то режим будет <strong>автоматический</strong>.&nbsp;В этот момент нажатия по экрану&nbsp;приводят к тому, что появляется число которое необходимо для вычисления форсируемого <strong>ЧИСЛА</strong>. Формула: (любые_вычисления)&lt;любая_операция&gt;X=<strong>ЧИСЛО</strong>. Где X это то число, которое подставится вместо нажатий на экран. Нужное число адаптируется к последней операции до переворачивания устройства. Но желательно использовать + или -. В случае операций &times; и &divide; результат вычислений может быть не точным при дублировании их на других калькуляторах из-за природы иррациональных чисел.</p>
            <p>Если уведомления разрешены или Х=<strong>ЧИСЛО</strong>, то X будет вводиться по одной цифре на каждое касание по экрану в то время когда ввод заблокирован. Кол-во требуемых касаний будет отображено в уведомлениях если они доступны. Если нет, то Х будет отображаться целиком при первом нажатии по экрану.&nbsp;Каждое нажатие по экрану будет запускать анимацию нажатия нужной кнопки. Это позволяет транслировать экран смартфона на большой экран на сцене.</p>`,
        "readme_part_4": `<p style="text-align: center;"><strong>(-)&nbsp;History peek</strong></p>
            <p>Функция подсматривания или история ввода. При первом открытии приложения спросят разрешения на доступ к уведомлениям устройства. В зависимости от ответа&nbsp;подсматривание работает в двух режимах:</p>
            <ul>
            <li><strong>Разрешены</strong> -&nbsp;приводит к включению/выключению функции истории и приложение отобразит историю в уведомлениях устройства после каких либо действий. Это позволяет получить историю на часах в режиме реального времени, не прикасаясь к телефону.</li>
            <li><strong>Не разрешены</strong> - приводит к единократному появлению всплывающего окна с историей ввода.</li>
            </ul>`,
        "readme": `<p style="text-align: center;">Описание</p>
            <p style="text-align: justify;">Приложение представляет из себя полностью работающий калькулятор с интерфейсом iOS калькулятора за исключением инженерного режима. Автоматически подстраиваться под локаль и язык в операционной системе. Может быть установлено как приложение Android или iOS либо использовано как сайт в любом браузере. Приложение обновляется автоматически. Не требует доступа к интернету. Если слишком медленный интернет и ощущается задержка в запуске/перезагрузке приложения - отключите интернет после первого полного запуска приложения. В случае неработоспособности какой-либо функции - удалите приложение, очистите данные сайта в браузере и установите приложение заново.</p>
            <p style="text-align: center;">Разрешения</p>
            <p style="text-align: justify;">Что бы приложение запросило возможные разрешения, нужно при первом запуске нажать один раз в любом месте экрана.</p>
            <p style="text-align: justify;"><span style="text-decoration: underline;">Android</span>: разрешение для отображения уведомлений. Если разрешить, то функция "подсмотреть" будет отображаться в панели уведомлений. Таким образом можно получать уведомления на смарт часах. В противном случае - информация будет отображаться в всплывающем окне.</p>
            <p style="text-align: justify;"><span style="text-decoration: underline;">iOS</span>: разрешение на доступ к ориентации устройства для работы функции "DD форс". Причем система будет запрашивать разрешение каждый раз, когда вы запускаете приложение.</p>
            <p style="text-align: center;">Функции</p>
            <p style="text-align: justify;">Любая функция включается путем удержания соответствующей кнопки в течение 2 секунд. После чего приложение завибрирует и появится белая рамка по краям экрана. В iOS вибрация недоступна.</p>
            <ul>
            <ul>
            <li style="text-align: justify;"><strong>(AC/C)</strong><br />Полностью перезапускает приложение и очищает историю.</li>
            <li style="text-align: justify;"><a href="readme.html?part=1"><strong>(%) Numerology</strong></a></li>
            <li style="text-align: justify;"><a href="readme.html?part=2"><strong>(+) Toxic force</strong></a></li>
            <li style="text-align: justify;"><a href="readme.html?part=3"><strong>(-) DD force</strong></a></li>
            <li style="text-align: justify;"><a href="readme.html?part=4"><strong>(=) History peek</strong></a></li>
            </ul>
            </ul>
            <p style="text-align: center;"><strong>Список изменений</strong></p>
            <p style="text-align: center;"><strong>1.55</strong></p>
            <p style="text-align: center;">Улучшено отображение истории. Теперь последние операции находятся вверху списка. Состояние историии вкл/выкл храниться в памяти. Уведомления будут постоянно появлятся на каждое изменение пользователем. Старые уведомления будут очищаться. Будет отображаться только одно уведомление с актуальной историей. Улучшена инструкция (немного). Улучшена функция DD Force. Теперь можно транслировать экран телефона даже когда он перевернут. Каждое нажатие будет запускать анимацию нажатия на нужную цифру для форсирования. И недостающее число будет записываться поциферно на каждое нажатие по экрану.&nbsp;Просто включите уведомления и получайте на свои часы информацию о том, сколько еще нажатий потребуется для создания нужного числа для форса.</p>
            <p style="text-align: center;"><strong>1.51</strong></p>
            <p style="text-align: center;">Изменена логика отображения истории ввода. Теперь появились переносы строк и отображается результат вычислений.</p>
            <p style="text-align: center;"><strong>1.50</strong></p>
            <p style="text-align: center;">Улучшено отображение истории ввода. Теперь при изменении операции вычисления в итории отображается без нулей между нажатыми операциями. Таким образом отображается в точности только то, что было нажато. Также изменена работа истории в уведомлениях для Андроид устроств. Если уведомления не разрешены, то история работает как и прежде - появляется всплывающее окно с историей. Если разрешены уведомления, то история работает как функция. Удержание = приводит к включению функции истории и приложение отобразит историю в уведомлениях только после того, как будет нажата кнопка = один раз. Это позволяет получить историю на часах, не прикасаясь к смартфону. Лишь попросив зрителя завершить вычисления нажатием на =. И в этот момент вся история появится в шторке уведомлений и на часах.</p>
            <p style="text-align: center;"><strong>1.49</strong></p>
            <p style="text-align: center;">Добавлена возможность выбора смещения времени от 1 до 9 минут для DD форса.</p>
            <p style="text-align: center;"><strong>1.48</strong></p>
            <p style="text-align: center;">Изменилась работа кнопки "0" в режиме DD форс.</p>`
    }
};