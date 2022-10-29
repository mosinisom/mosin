let login = document.getElementById("login");
	let sendLogin = document.getElementById("sendLogin");
	let errorMsg = document.getElementById('errorMsg');

	function displayErrorMsg(e) {
		errorMsg.style.display = "block"
		errorMsg.innerHTML = e
		sendLogin.disabled = true
	}

	function hideErrorMsg() {
		errorMsg.style.display = "none"
		sendLogin.disabled = false
	}
	
	login.addEventListener("change", function() {
		if(login.value.match(/^[^@]+@[^@]+\.[^@]+$/))
			hideErrorMsg();
		else
			displayErrorMsg("Invalid login (has to be an email address)");
	});