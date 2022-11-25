// Zack's functions

function check() {
    if (document.getElementById("password").value ==
        document.getElementById("confirmPassword").value) {
        document.getElementById('message').style.color = 'green';
        document.getElementById('message').innerHTML = 'Matching';
        document.getElementById('signin').disabled = false;
    } else {
        document.getElementById('message').style.color = 'red';
        document.getElementById('message').innerHTML = 'Not matching';
        document.getElementById('signin').disabled = true;
    }
}
function state() {
    const url = window.location.search;
    const param = new URLSearchParams(url);
    const c = param.get('state');
    
    if (c == "wrongCredentials"){
        document.getElementById('state').innerHTML = 'Either your username or password is incorrect. Try again!';
    }
    else if (c == "userExists"){
        document.getElementById('state').innerHTML = 'An account with this username already exists.';
    }
    else if (c == "created"){
        document.getElementById('state').innerHTML = 'Account created. Log in!';
    }
    else if (c == "saved"){
        document.getElementById('state').innerHTML = 'Fractal saved!';
    }
}

function userGenerate() {
    const url = window.location.search;
    const param = new URLSearchParams(url);
    const c = param.get('userID');
    window.location.href = "/generation.html?userID="+ c;
}
function userIndex() {
    const url = window.location.search;
    const param = new URLSearchParams(url);
    const c = param.get('userID');
    window.location.href = "/index.html?userID="+ c;
}
function userGallery() {
    const url = window.location.search;
    const param = new URLSearchParams(url);
    const c = param.get('userID');
    window.location.href = "/gallery.html?userID="+ c;
}

function openTab(evt, tabName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
}

// Garrett's functions
function initCells() {
    // At some point this will iterate per saved fractal
    var i;
    var num = 8;
    const cellElement = document.querySelector("#cell");

    for(i = 0; i < num; i++) {
        var cellClone = cellElement.cloneNode(true);
        cellClone.style["display"] = "inline-block";

        cellElement.after(cellClone);
    }
}