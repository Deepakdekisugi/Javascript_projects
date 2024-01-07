myCanvas.width = 1500;
myCanvas.height = 600;
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
    const height = myCanvas.height * 0.5 * array[i];
    socks[i] = new Sock(x, y, height);
}

const moves = bubbleSort(array);

const ctx = myCanvas.getContext("2d");

animate();

function animate() {
    ctx.clearRect(0,0,myCanvas.width,myCanvas.height);

    ctx.beginPath();
    ctx.moveTo(0, stringHeight);
    ctx.lineTo(myCanvas.width, stringHeight);
    ctx.stroke();

    let changed=false;
    for (let i = 0; i < socks.length; i++) {
        changed=socks[i].draw(ctx)||changed;
    }

    if(!changed && moves.length>0){
        const nextMove=moves.shift();
        if(nextMove.type == "swap"){
            const [i,j]=nextMove.indices;
            socks[i].moveTo(socks[j].loc);
            socks[j].moveTo(socks[i].loc);
            [socks[i],socks[j]]=[socks[j],socks[i]];
        }
    }
    requestAnimationFrame(animate);
}

function bubbleSort(array){
    const moves=[];
    do{
        var swapped = false;
        for(let i = 1; i < array.length;i++){
            moves.push({
                indices:[i-1,i],
                typr:"comparison"

            });
            if(array[i-1]>array[i]){
                swapped = true;
                [array[i-1],array[i]]=[array[i],array[i-1]];
                moves.push({
                    indices:[i-1,i],
                    typr:"swap"
    
                });
            }
        }
    }while(swapped);
    return moves;
} 