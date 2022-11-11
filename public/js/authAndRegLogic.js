// авторизация
const login = document.getElementById("login");
const sendLogin = document.getElementById("sendLogin");
const errorMsg = document.getElementById('errorMsg');

	function displayErrorMsg(e) {
		errorMsg.style.display = "block";
		errorMsg.innerHTML = e;
		sendLogin.disabled = true;
	}

	function hideErrorMsg() {
		errorMsg.style.display = "none";
		sendLogin.disabled = false;
	}
	
	login.addEventListener("change", function() {
		if(login.value.match(/^[^@]+@[^@]+\.[^@]+$/))
			hideErrorMsg();
		else
			displayErrorMsg("Неправильный формат e-mail");
	});



// регистрация
const loginREG = document.getElementById("loginREG");
const password1 = document.getElementById("password1REG");
const password2 = document.getElementById("password2REG");
const makeAccount = document.getElementById("makeAccount");
const errorMsgREG = document.getElementById('errorMsgREG');

	function displayErrorMsgREG(e) {
		errorMsgREG.style.display = "block";
		errorMsgREG.innerHTML = e;
		makeAccount.disabled = true;
	}	

	function hideErrorMsgREG() {
		errorMsgREG.style.display = "none";
		makeAccount.disabled = false;
	}

	loginREG.addEventListener("change", function() {
		if(loginREG.value.match(/^[^@]+@[^@]+\.[^@]+$/))
			hideErrorMsgREG();
		else
			displayErrorMsgREG("Неправильный формат e-mail");
	});

	password1.addEventListener("change", function() {
		if(password1.value.length >= 8)
			hideErrorMsgREG();
		else
			displayErrorMsgREG("Пароль должен быть не менее 8 символов");
	});

	password2.addEventListener("change", function() {
		if(password1.value === password2.value)
			hideErrorMsgREG();
		else
			displayErrorMsgREG("Пароли не совпадают");
	});


