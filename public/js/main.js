window.onload = function () {
    const server = new Server;
    const auth = document.getElementById('auth');
    const nav = document.getElementById("nav");
    const converter = document.getElementById('converter');
    const registration = document.getElementById('registration');
    const logout = document.getElementById('logout');
    const sendMail = document.getElementById('sendMail');
    const goToSendMail = document.getElementById('goToSendMail');
    const goToIncomingMails = document.getElementById('goToIncomingMails');
    const goToConverter = document.getElementById('goToConverter');
    const incomingMails = document.getElementById('incomingMails');
    const outgoingMails = document.getElementById('outgoingMails');
    const pagination = document.getElementById('pagination');
    const emailTable = document.getElementById('emailTable');
    const emailTableOut = document.getElementById('emailTableOut');
    const paginationOut = document.getElementById('paginationOut');
    const goToOutcomingMails = document.getElementById('goToOutcomingMails');
    const goToRecords = document.getElementById('goToRecords');
    const records = document.getElementById('records');
    const tankCoinTable = document.getElementById('tankCoinTable');
    const cursorTable = document.getElementById('cursorTable');
    const discoTable = document.getElementById('discoTable');
    const redButtonTable = document.getElementById('redButtonTable');
    const msgBtn = document.getElementById('msgBtn');
    const adminPanel = document.getElementById('adminPanel');
    const tankDiv = document.getElementById('tankDiv');
    const cursorDiv = document.getElementById('cursorDiv');
    const discoDiv = document.getElementById('discoDiv');
    const circleDiv = document.getElementById('circleDiv');
    const adminTable = document.getElementById('adminTable');
    const goToAdminPanel = document.getElementById('goToAdminPanel');

    let newMails = false; // флаг для проверки наличия новых писем

    const record = localStorage.getItem('newRecord');
    const newRecord = JSON.parse(record);

    const arrayOfParts = [auth, nav, converter, registration, sendMail, incomingMails, outgoingMails, records, adminPanel];

    let currentPage = 1;


    // Проверка авторизации через токен
    if (localStorage.getItem('token')) {
        server.checkToken(localStorage.getItem('token'))
            .then(data => {
                if (data.checked) {
                    arrayOfParts.forEach(item => {
                        item.classList.add('d-none');
                    });
                    nav.classList.remove('d-none');
                    converter.classList.remove('d-none');
                    // adminPanel.classList.remove('d-none');
                    server.setToken(localStorage.getItem('token'));
                    getMailsHandler();
                    addGamePanel(data.admin);
                }
            });
    }

    // добавить Статус игр в nav 
    function addGamePanel(admin) {
        if (admin == 1) {
            goToAdminPanel.classList.remove('d-none');
            goToAdminPanel.addEventListener('click', () => {
                arrayOfParts.forEach(item => {
                    item.classList.add('d-none');
                });
                nav.classList.remove('d-none');
                adminPanel.classList.remove('d-none');
            });
        }
    }


    // авторизация --------------------------------------------------------------------------------------------
    async function sendLoginHandler() {
        const login = document.getElementById('login').value;
        const password = document.getElementById('password').value;
        const data = await server.login(login, password);


        if (!!data) {
            addGamePanel(data.admin);
            auth.classList.add('d-none');
            nav.classList.remove('d-none');


            // converter.classList.remove('d-none');
            sendMail.classList.remove('d-none');
        }
        console.log(server.token);
        localStorage.setItem('token', server.token);
        getMailsHandler();
    }
    document.getElementById('sendLogin').addEventListener('click', sendLoginHandler);

    // конвертация чисел --------------------------------------------------------------------------------------------
    async function sendConvertHandler() {
        const number = document.getElementById('number').value;

        const firstSelect = document.getElementById('fromSystem');
        const fromSystem = firstSelect.options[firstSelect.selectedIndex].value;

        const secondSelect = document.getElementById('toSystem');
        const toSystem = secondSelect.options[secondSelect.selectedIndex].value;

        const answer = await server.convert(number, fromSystem, toSystem);

        document.getElementById('answer').value = answer;
        // console.log(newRecord);
    }
    document.getElementById('sendConvert').addEventListener('click', sendConvertHandler);

    // регистрация --------------------------------------------------------------------------------------------
    async function sendRegisterHandler() {
        const login = document.getElementById('loginREG');
        const name = document.getElementById('nicknameREG');
        const password1 = document.getElementById('password1REG');
        const password2 = document.getElementById('password2REG');

        if (password1.value === password2.value) {
            const data = await server.register(login.value, password1.value, name.value);
            // console.log(data);
            if (!!data) {
                alert("На указанный e-mail отправлено письмо с подтверждением регистрации");
                // очистка полей
                login.value = '';
                name.value = '';
                password1.value = '';
                password2.value = '';
                // переход на авторизацию
                registration.classList.add('d-none');
                auth.classList.remove('d-none');
            }
            else {
                alert("Либо такой e-mail уже зарегистрирован, либо что-то пошло не так");
            }
        }
    }
    document.getElementById('makeAccount').addEventListener('click', sendRegisterHandler);

    // выход из аккаунта --------------------------------------------------------------------------------------------
    async function logoutHandler() {
        arrayOfParts.forEach((item) => {
            item.classList.add('d-none');
        });
        auth.classList.remove('d-none');
        goToAdminPanel.classList.add('d-none');

        const data = await server.logout();
        console.log(data);
        localStorage.removeItem('token');
    }
    logout.addEventListener('click', logoutHandler);

    // отправка письма --------------------------------------------------------------------------------------------
    async function sendMailHandler() {
        const emailtoUser = document.getElementById('emailToUser');
        const themeOfMail = document.getElementById('themeOfMail');
        const textToUser = document.getElementById('textToUser');

        const data = await server.sendMail(emailtoUser.value, themeOfMail.value, textToUser.value);
        console.log(data);

        // очистка полей
        emailtoUser.value = '';
        themeOfMail.value = '';
        textToUser.value = '';
    }
    document.getElementById('btnSendMail').addEventListener('click', sendMailHandler);

    // добавление рекорда в таблицу --------------------------------------------------------------------------------------------
    async function addRecordHandler() {
        const data = await server.addGameRecord(newRecord.game, newRecord.token, newRecord.score);
        // console.log(data);
    }
    addRecordHandler();

    // переход к отправке письма --------------------------------------------------------------------------------------------
    function goToSendMailFunc() {
        arrayOfParts.forEach(item => {
            item.classList.add('d-none');
        });
        sendMail.classList.remove('d-none');
        nav.classList.remove('d-none');
    }
    goToSendMail.addEventListener('click', goToSendMailFunc);

    // переход к конвертеру --------------------------------------------------------------------------------------------
    function goToConverterFunc() {
        arrayOfParts.forEach(item => {
            item.classList.add('d-none');
        });
        converter.classList.remove('d-none');
        nav.classList.remove('d-none');
    }
    goToConverter.addEventListener('click', goToConverterFunc);

    // переход ко входящим письмам
    async function goToIncomingMailsFunc() {
        currentPage = 1;
        arrayOfParts.forEach(item => {
            item.classList.add('d-none');
        });
        incomingMails.classList.remove('d-none');
        nav.classList.remove('d-none');
        emailTable.innerHTML = '';
        newMailNotification();
        getMailsHandler();
        await server.readMails();
        newMails = false;
    }
    goToIncomingMails.addEventListener('click', goToIncomingMailsFunc);

    // пейджинг --------------------------------------------------------------------------------------------
    pagination.addEventListener('click', e => {
        if (e.target.classList.contains('page-link')) {
            currentPage = currentPage + 1 * parseInt(e.target.getAttribute('data-page'));
            if (currentPage < 1)
                currentPage = 1;
            emailTable.innerHTML = '';
            getMailsHandler();
        }
    }
    );
    // пейджинг для отправленных писем -
    paginationOut.addEventListener('click', e => {
        if (e.target.classList.contains('page-link')) {
            currentPage = currentPage + 1 * parseInt(e.target.getAttribute('data-page'));
            if (currentPage < 1)
                currentPage = 1;
            emailTableOut.innerHTML = '';
            getSentMailsHandler();
        }
    }
    );

    // получение писем --------------------------------------------------------------------------------------------
    setInterval(() => { getMailsHandler(); }, 1500);

    async function getMailsHandler() {
        newMailNotification();
        const data = await server.getMails(currentPage);
        if (data) {
            let mail = '';
            emailTable.innerHTML = '';
            data.forEach(item => {
                if (item.isread == false) {
                    newMails = true;
                }
                mail = `
                <tr>
                <th scope="row">🙾</th>
                <td class="send-mail" data-user="${item.idfromuser}">${item.idfromuser}</td>
                <td>${item.theme}</td>
                <td>${item.content}</td>
                </tr>`;
                emailTable.innerHTML = mail + emailTable.innerHTML;

            });
        }
        newMailNotification();
    }

    // отправка письма нажатому пользователю --------------------------------------------------------------------------------------------
    async function sendMailToUserHandler(e) {
        if (e.target.classList.contains('send-mail')) {
            const email = e.target.getAttribute('data-user');
            document.getElementById('emailToUser').value = email;
            goToSendMailFunc();
        }
    }
    emailTable.addEventListener('click', sendMailToUserHandler);
    emailTableOut.addEventListener('click', sendMailToUserHandler);
    tankCoinTable.addEventListener('click', sendMailToUserHandler);
    cursorTable.addEventListener('click', sendMailToUserHandler);
    discoTable.addEventListener('click', sendMailToUserHandler);
    redButtonTable.addEventListener('click', sendMailToUserHandler);


    // переход к отправленным письмам --------------------------------------------------------------------------------------------
    function goToSentMailsFunc() {
        currentPage = 1;
        arrayOfParts.forEach(item => {
            item.classList.add('d-none');
        });
        outgoingMails.classList.remove('d-none');
        nav.classList.remove('d-none');
        emailTableOut.innerHTML = '';
        getSentMailsHandler();
    }
    goToOutcomingMails.addEventListener('click', goToSentMailsFunc);

    // получение отправленных писем --------------------------------------------------------------------------------------------
    async function getSentMailsHandler() {
        const data = await server.getSentMails(currentPage);
        if (data) {
            let mail = '';
            data.forEach(item => {
                mail = `
                    <tr>
                    <th scope="row">🙾</th>
                    <td class="send-mail" data-user="${item.idtouser}">${item.idtouser}</td>
                    <td>${item.theme}</td>
                    <td>${item.content}</td>
                    </tr>`;
                emailTableOut.innerHTML = mail + emailTableOut.innerHTML;

            });
        }
    }

    // переход к таблице рекордов --------------------------------------------------------------------------------------------
    function goToRecordsFunc() {
        arrayOfParts.forEach(item => {
            item.classList.add('d-none');
        });
        records.classList.remove('d-none');
        nav.classList.remove('d-none');
        getRecordsHandler();
    }
    goToRecords.addEventListener('click', goToRecordsFunc);

    // получение всех таблиц рекордов --------------------------------------------------------------------------------------------
    async function getRecordsHandler() {
        const data = await server.getRecords('tankCoin', 'DESC');
        if (data) {
            let record = '';
            let i = 10;
            data.forEach(item => {
                record = `
                    <tr>
                    <th scope="row">${i}</th>
                    <td class="send-mail" data-user="${item.email}">${item.userid}</td>
                    <td>${item.score}</td>
                    </tr>`;
                tankCoinTable.innerHTML = record + tankCoinTable.innerHTML;
                i--;
            });
        }
        const data2 = await server.getRecords('cursor', 'ASC');
        if (data2) {
            let record = '';
            let i = 10;
            data2.forEach(item => {
                record = `
                    <tr>
                    <th scope="row">${i}</th>
                    <td class="send-mail" data-user="${item.email}">${item.userid}</td>
                    <td>${item.score}</td>
                    </tr>`;
                cursorTable.innerHTML = record + cursorTable.innerHTML;
                i--;
            });
        }

        const data3 = await server.getRecords('discoSquares', 'ASC');
        if (data3) {
            let record = '';
            let i = 10;
            data3.forEach(item => {
                record = `
                    <tr>
                    <th scope="row">${i}</th>
                    <td class="send-mail" data-user="${item.email}">${item.userid}</td>
                    <td>${item.score}</td>
                    </tr>`;
                discoTable.innerHTML = record + discoTable.innerHTML;
                i--;
            });
        }

        const data4 = await server.getRecords('redButton', 'ASC');
        if (data4) {
            let record = '';
            let i = 10;
            data4.forEach(item => {
                record = `
                    <tr>
                    <th scope="row">${i}</th>
                    <td class="send-mail" data-user="${item.email}">${item.userid}</td>
                    <td>${item.score}</td>
                    </tr>`;
                redButtonTable.innerHTML = record + redButtonTable.innerHTML;
                i--;
            });
        }
    }

    // оповещение о новых письмах --------------------------------------------------------------------------------------------
    function newMailNotification() {
        if (newMails) {
            msgBtn.style.color = 'red';
        }
        else {
            msgBtn.style.color = 'rgba(224,217,217,0.9)';
        }
    }

    // получение списка игр --------------------------------------------------------------------------------------------
    async function getGamesList() {
        data = await server.getGamesList();
        adminTable.innerHTML = '';
        if (data) {
            data.forEach(item => {
                let game = '';
                game = `
                <tr>
                <td class="game-stop" data-game="${item.name}" data-status="${item.isworking}">${item.name}</td>
                <td>${item.isworking}</td>
                </tr>`;
                adminTable.innerHTML = game + adminTable.innerHTML;
                changeGameVisibility(item.name, item.isworking);
            });
        }
    }
    getGamesList();

    // изменение статуса игры при нажатии
    adminTable.addEventListener('click', async function (event) {
        if (event.target.classList.contains('game-stop')) {
            const gameName = event.target.dataset.game;
            const gameStatus = event.target.dataset.status;
            const data = await server.changeGameStatus(gameName);
            getGamesList();
        }
    });

    // изменить видимость игры
    function changeGameVisibility(game, visibility) {
        switch (game) {
            case 'tankCoin':
                if (visibility == 1) {
                    tankDiv.classList.remove('d-none');
                }
                else {
                    tankDiv.classList.add('d-none');
                }
                break;
            case 'cursor':
                if (visibility == 1) {
                    cursorDiv.classList.remove('d-none');
                }
                else {
                    cursorDiv.classList.add('d-none');
                }
                break;
            case 'discoSquares':
                if (visibility == 1) {
                    discoDiv.classList.remove('d-none');
                }
                else {
                    discoDiv.classList.add('d-none');
                }
                break;
            case 'redButton':
                if (visibility == 1) {
                    circleDiv.classList.remove('d-none');
                }
                else {
                    circleDiv.classList.add('d-none');
                }
                break;
        }

    }













};