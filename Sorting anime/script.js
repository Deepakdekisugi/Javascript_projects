myCanvas.width = 500;
myCanvas.height = 300;
const n = 20;
const array = [];

const stringHeight = myCanvas.height * 0.45;

const socks = [];
const margin = 30;
const availableWidth = myCanvas.width - margin * 2;
const spacing = availableWidth / n;

for (let i = 0; i < n; i++) {
    array[i] = Math.random();
}

for (let i = 0; i < array.length; i++) {
    const x = i * spacing + spacing / 2 + margin;
    const y = stringHeight;
    const height = myCanvas.height * 0.4 * array[i];
    socks[i] = new Sock(x, y, height);
}

const ctx = myCanvas.getContext("2d");

animate();

function animate() {
    ctx.clearRect(0,0,myCanvas.width,myCanvas.height);

    ctx.beginPath();
    ctx.moveTo(0, stringHeight);
    ctx.lineTo(myCanvas.width, stringHeight);
    ctx.stroke();

    for (let i = 0; i < socks.length; i++) {
        socks[i].draw(ctx);
    }
    requestAnimationFrame(animate);
}
