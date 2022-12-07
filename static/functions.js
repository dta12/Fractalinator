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
    var i = 0;
    var num = 8;
    const cellElement = document.querySelector("#cell");

    const url = window.location.search;
    const param = new URLSearchParams(url);
    const c = param.get('userID');
    var userFractals = null;

    if(c == "null") {
        //return;
    } else {
        userFractals = datastore.get_fractals(c);
    }

    for(var i = 0; i < num; i++) {
    //for(f in userFractals) {
        var cellClone = cellElement.cloneNode(true);

        cellElement.after(cellClone);   

        // Update cell ID and class and display it
        cellClone.id = "cell" + i;
        cellClone.style["display"] = "inline-block";
        cellClone.className = 'cell-class';

        // Update cell info text
        var infoContent = document.getElementsByClassName("fractalInfo");
        //infoContent[1].textContent = "test";

        // Update cell image
        var imgContent = document.getElementsByClassName("fractalImg");
        imgContent[1].id = "img" + i;
        //imgContent[1].src = "";

        // Update cell button
        var buttonContent = document.getElementsByClassName("exportButton");
        buttonContent[1].id = "btn" + i;
    }
}

function exportGalleryImg(button) {
    var cellNum = button.id.charAt(button.id.length - 1);

    var canvas = document.createElement("canvas");
    var context = canvas.getContext('2d');
    var exportImg = new Image();

    exportImg.onload = function() {
        canvas.width = exportImg.width;
        canvas.height = exportImg.height;

        context.drawImage(exportImg, 0, 0);
    };

    exportImg.src = document.getElementById("img" + cellNum).src;

    var link = document.createElement("a");
    link.download = "fractal.png";
    canvas.toBlob(function(blob) {
        link.href = URL.createObjectURL(blob);
        link.click();
    }, "fractal/png");
}