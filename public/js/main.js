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
        const login = document.getElementById('loginREG').value;
        const name = document.getElementById('nicknameREG').value;
        const password = document.getElementById('password2REG').value;

        const data = await server.register(login, password, name);

        console.log('до сюда дошло');
        console.log(data);
    }
    document.getElementById('makeAccount').addEventListener('click', sendRegisterHandler);





};