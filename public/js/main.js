window.onload = function () {
    const server = new Server;
    const auth = document.getElementById('auth');
    const nav = document.getElementById("nav");
    const converter = document.getElementById('converter');

    // авторизация --------------------------------------------------------------------------------------------
    async function sendLoginHandler() {
        const login = document.getElementById('login').value;
        const password = document.getElementById('password').value;
        const data = await server.login(login, password);

        if (!!data) {
            auth.classList.remove('d-flex');
            auth.classList.add('d-none');
            nav.classList.remove('d-none');

            console.log(converter);

            converter.classList.remove('d-none');
            // convert.classList.add('d-flex');
        }
        console.log(data);
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

    }
    document.getElementById('sendConvert').addEventListener('click', sendConvertHandler);

    // регистрация --------------------------------------------------------------------------------------------
    async function sendRegisterHandler() {
        const login = document.getElementById('loginREG');
        const name = document.getElementById('nicknameREG');
        const password1 = document.getElementById('password1REG');
        const password2 = document.getElementById('password2REG');

        if (password1.value === password2.value) {
            const data = await server.register(login.value, name.value, password1.value);
            console.log(data);
            if (!!data) {
                alert("На указанный e-mail отправлено письмо с подтверждением регистрации");
                // очистка полей
                login.value = '';
                name.value = '';
                password1.value = '';
                password2.value = '';
                // переход на авторизацию
                document.getElementById("registration").classList.add('d-none');
                document.getElementById("auth").classList.remove('d-none');
            }
            else {
                alert("Либо такой e-mail уже зарегистрирован, либо что-то пошло не так");
            }
        }
        console.log('до сюда дошло');



        // const data = await server.register(login, password2, name);
        // console.log(data);
    }
    document.getElementById('makeAccount').addEventListener('click', sendRegisterHandler);





};