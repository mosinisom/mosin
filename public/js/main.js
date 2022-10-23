window.onload = function () {

    const server = new Server;

    async function sendLoginHandler() {
        const login = document.getElementById('login').value;
        const password = document.getElementById('password').value;
        const data = await server.login(login, password);

        if (!!data) {
            document.getElementById('auth').classList.remove('visible');
            document.getElementById('auth').classList.add('invisible');

            document.getElementById('convert').classList.remove('invisible');
            document.getElementById('convert').classList.add('visible');
        }
        console.log(data);
    }

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

    document.getElementById('sendLogin').addEventListener('click', sendLoginHandler);
    document.getElementById('sendConvert').addEventListener('click', sendConvertHandler);
};