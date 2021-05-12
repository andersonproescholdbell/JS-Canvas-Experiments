function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function drawCircle(ctx, x, y, r, color) {
    ctx.beginPath();
    ctx.arc(x, y, r, 0, 2*Math.PI);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.stroke();
}

async function main() {   
    document.documentElement.style.overflow = "hidden";

    var c = document.getElementById("can");
    c.width = document.documentElement.clientWidth - 16;
    c.height = document.documentElement.clientHeight - 16;
    c.style.backgroundColor = "slategrey";

    var ctx = c.getContext("2d");  
    var x = c.width/2;
    var y = c.height/2;
    drawCircle(ctx, x, y, 5, "black");

    while (true) {
        var rads = Math.random()*2;
        var dist = 1;
        var moveX = dist*Math.cos(rads*Math.PI);
        var moveY = dist*Math.sin(rads*Math.PI);

        var speed = 1;
        var size = 1;
        while (x+moveX*speed > 0 && x+moveX*speed < c.width && y+moveY*speed > 0 && y+moveY*speed < c.height) {
            x += moveX*speed;
            y += moveY*speed;
            ctx.clearRect(0, 0, c.width, c.height);
            drawCircle(ctx, x, y, size, "black");
            await sleep(5);
            speed += 0.05;
            size += 0.2;
        }
    }
}