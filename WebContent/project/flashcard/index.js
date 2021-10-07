


function hideLogoutDialog() {
	//console.log("hideLogoutDialog");	
	
	var headerLoginButtonAreaElement = document.getElementById("header-login_button_area");
	headerLoginButtonAreaElement.style.display = "block";
	
	var logoutDialogElement = document.getElementById("logout_dialog");
	
	document.body.removeChild(logoutDialogElement);
}

window.addEventListener("load", function() {
	var loginDialogElement = document.getElementById("login_dialog");
	loginDialogElement.style.visibility = "hidden";
	
	var headerUsernameElement = document.getElementById("header-username");
	var headerLoginButtonAreaElement = document.getElementById("header-login_button_area");
	var headerLogoutButtonAreaElement = document.getElementById("header-logout_button_area");
	
    if(user == null) {
		headerUsernameElement.innerHTML = "?";
		headerLoginButtonAreaElement.style.display = "block";
		headerLogoutButtonAreaElement.style.display = "none";
	}
	else {
		headerUsernameElement.innerHTML = user.name;
		headerLoginButtonAreaElement.style.display = "none";
		headerLogoutButtonAreaElement.style.display = "block";
	}
	
    var headerLoginButtonElement = document.getElementById("header-login_button");
    headerLoginButtonElement.addEventListener("click", showLoginDialog, false);
    
    var headerLogoutButtonElement = document.getElementById("header-logout_button");
    headerLogoutButtonElement.addEventListener("click", logout, false);
        
    var loginDialogLoginButtonElement = document.getElementById("login_dialog-login_button");
    loginDialogLoginButtonElement.addEventListener("click", login, false);
    
    var loginDialogCancelButtonElement = document.getElementById("login_dialog-cancel_button");
    loginDialogCancelButtonElement.addEventListener("click", hideLoginDialog, false);
}, false);
