// Dastan's functions
function runDrawing() {
    var angle = document.getElementById('Angle').valueAsNumber;
    var len = document.getElementById('Length').valueAsNumber;
    var bwidth = document.getElementById('BranchWidth').valueAsNumber;
    if (angle !== NaN && len !== NaN && bwidth !== NaN ){
        draw(400, 600, len, angle, bwidth);
    }else {
        draw(400, 600, 120, 0, 10);
    }
}

function draw(startX, startY, len, angle, branchWidth) {
    var myCanvas = document.getElementById("my_canvas");
    var ctx = myCanvas.getContext("2d");
    ctx.lineWidth = branchWidth;

    ctx.beginPath();
    ctx.save();

    let avg = (angle + branchWidth)/2;
    let scale = 5;

    let color = 
    `rgb(${Math.floor(255 - 1*avg*scale)}, 
         ${Math.floor(255 - 2*avg*scale)}, 
         ${Math.floor(255 - 3*avg*scale)})`;

    ctx.strokeStyle = color;
    ctx.fillStyle = color;

    ctx.translate(startX, startY);
    ctx.rotate(angle * Math.PI/180);
    ctx.moveTo(0, 0);
    ctx.lineTo(0, -len);
    ctx.stroke();

    

    if(len < 10) {
        ctx.restore();
        return;
    }

    draw(0, -len, len*0.8, angle-15, branchWidth*0.8);
    draw(0, -len, len*0.8, angle+15, branchWidth*0.8);

    ctx.restore();
}

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