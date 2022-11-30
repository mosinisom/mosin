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
    // const tankCoinTable = document.getElementById('tankCoinTable');
    // const cursorTable = document.getElementById('cursorTable');
    // const discoTable = document.getElementById('discoTable');
    // const redButtonTable = document.getElementById('redButtonTable');

    const record = localStorage.getItem('newRecord');
    const newRecord = JSON.parse(record);

    const arrayOfParts = [auth, nav, converter, registration, sendMail, incomingMails, outgoingMails, records];

    let currentPage = 1;


    // Проверка авторизации через токен
    if (localStorage.getItem('token')) {
        server.checkToken(localStorage.getItem('token'))
            .then(data => {
                if (!!data) {
                    arrayOfParts.forEach(item => {
                        item.classList.add('d-none');
                    });
                    nav.classList.remove('d-none');
                    converter.classList.remove('d-none');
                    server.setToken(localStorage.getItem('token'));
                }
            });
    }


    // авторизация --------------------------------------------------------------------------------------------
    async function sendLoginHandler() {
        const login = document.getElementById('login').value;
        const password = document.getElementById('password').value;
        const data = await server.login(login, password);

        if (!!data) {
            auth.classList.add('d-none');
            nav.classList.remove('d-none');


            // converter.classList.remove('d-none');
            sendMail.classList.remove('d-none');
        }
        console.log(server.token);
        localStorage.setItem('token', server.token);
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
    function goToIncomingMailsFunc() {
        currentPage = 1;
        arrayOfParts.forEach(item => {
            item.classList.add('d-none');
        });
        incomingMails.classList.remove('d-none');
        nav.classList.remove('d-none');
        getMailsHandler();
    }
    goToIncomingMails.addEventListener('click', goToIncomingMailsFunc);

    // пейджинг --------------------------------------------------------------------------------------------
    pagination.addEventListener('click', e => {
        if (e.target.classList.contains('page-link')) {
            currentPage = currentPage + 1 * parseInt(e.target.getAttribute('data-page'));
            if (currentPage < 1)
                currentPage = 1;
            // console.log(currentPage);
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
            // console.log(currentPage);
            getSentMailsHandler();
        }
    }
    );

    // получение писем --------------------------------------------------------------------------------------------
    async function getMailsHandler() {
        const data = await server.getMails(currentPage);
        if (data) {
            let mail = '';
            data.forEach(item => {
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

    // переход к отправленным письмам --------------------------------------------------------------------------------------------
    function goToSentMailsFunc() {
        currentPage = 1;
        arrayOfParts.forEach(item => {
            item.classList.add('d-none');
        });
        outgoingMails.classList.remove('d-none');
        nav.classList.remove('d-none');
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
        // getRecordsHandler();
    }
    goToRecords.addEventListener('click', goToRecordsFunc);

    // // получение всех таблиц рекордов --------------------------------------------------------------------------------------------
    // async function getRecordsHandler() {
    //     const data = await server.getRecords('tankCoin', false);
    //     if (data) {
    //         let record = '';
    //         let i = 1;
    //         data.forEach(item => {
    //             record = `
    //                 <tr>
    //                 <th scope="row">${i}</th>
    //                 <td>${item.userid}</td>
    //                 <td>${item.score}</td>
    //                 </tr>`;
    //             tankCoinTable.innerHTML = record + tankCoinTable.innerHTML;

    //         });
    //     }
    //     const data2 = await server.getRecords('cursor', true);
    //     if (data2) {
    //         let record = '';
    //         let i = 1;
    //         data2.forEach(item => {
    //             record = `
    //                 <tr>
    //                 <th scope="row">${i}</th>
    //                 <td>${item.userid}</td>
    //                 <td>${item.score}</td>
    //                 </tr>`;
    //             cursorTable.innerHTML = record + cursorTable.innerHTML;

    //         });
    //     }

    //     const data3 = await server.getRecords('discoSquares', true);
    //     if (data3) {
    //         let record = '';
    //         let i = 1;
    //         data3.forEach(item => {
    //             record = `
    //                 <tr>
    //                 <th scope="row">${i}</th>
    //                 <td>${item.userid}</td>
    //                 <td>${item.score}</td>
    //                 </tr>`;
    //                 discoTable.innerHTML = record + discoTable.innerHTML;

    //         });
    //     }

    //     const data4 = await server.getRecords('redButton', true);
    //     if (data4) {
    //         let record = '';
    //         let i = 1;
    //         data4.forEach(item => {
    //             record = `
    //                 <tr>
    //                 <th scope="row">${i}</th>
    //                 <td>${item.userid}</td>
    //                 <td>${item.score}</td>
    //                 </tr>`;
    //             redButtonTable.innerHTML = record + redButtonTable.innerHTML;

    //         });
    //     }
    // }











};