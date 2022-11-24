window.onload = function () {
    const server = new Server;
    const auth = document.getElementById('auth');
    const nav = document.getElementById("nav");
    const converter = document.getElementById('converter');
    const registration = document.getElementById('registration');
    const logout = document.getElementById('logout');
    const sendMail = document.getElementById('sendMail');

    const arrayOfParts = [auth, nav, converter, registration];


    // Проверка авторизации через токен
    // if(localStorage.getItem('token')) {



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

        console.log(number, fromSystem, toSystem);
        const answer = await server.convert(number, fromSystem, toSystem);

        document.getElementById('answer').value = answer;

        // console.log(server.token);
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
            console.log(data);
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
        // console.log('до сюда дошло');
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






};