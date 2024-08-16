class Particle{
    constructor(loc,fixed=false){
       this.fixed=fixed;
       this.loc=loc;
       this.oldLoc=loc;
    }
    update(){
       if(!this.fixed){
          const vel=subtract(this.loc,this.oldLoc);
          const newLoc=add(
             W,
             add(
                G,
                add(this.loc,vel)
             )
          );
          this.oldLoc=this.loc;
          this.loc=newLoc;
       }
    }
    draw(ctx){
       const size=4
       ctx.fillRect(
          this.loc.x-size/2,
          this.loc.y-size/2,
          size,
          size
       );
    }
 }