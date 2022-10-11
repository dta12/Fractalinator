// Dastan's functions
function runDrawing() {
    var angle = document.getElementById('Angle').valueAsNumber;
    var len = document.getElementById('Length').valueAsNumber;
    var bwidth = document.getElementById('BranchWidth').valueAsNumber;
    if (angle !== NaN && len !== NaN && bwidth !== NaN ){
        console.log(angle + " " + len + " " + bwidth);
        draw(400, 600, len, angle, bwidth);
    }else {
        draw(400, 600, 120, 0, 10);
    }
}

function draw(startX, startY, len, angle, branchWidth) {
    var myCanvas = document.getElementById("my_canvas");
    var ctx = myCanvas.getContext("2d");
    ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);
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
    } else {
        document.getElementById('message').style.color = 'red';
        document.getElementById('message').innerHTML = 'Not matching';
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
