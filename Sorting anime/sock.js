class Sock{
    constructor(x,y,height){
        this.width = 10;
        this.loc={x,y};
        this.height = height;
        this.queue = [];
    }

    moveTo(loc, frameCount=60){
        for(let i = 1;i<=frameCount; i++){
            const t =i/frameCount;
            this.queue.push(vLerp(this.loc, newLoc,t));
        }
    }

    draw(ctx){
        if(this.queue.length>0){
            this.loc = this.queue.shift();
        }
        const{x,y}=this.loc;
        const left =x-this.width/2;
        const right =x+this.wi
        const bottom =y+this.height;
        ctx.beginPath();
        ctx.rect(left,y, this.width,this.height);
        ctx.stroke();
    }
}