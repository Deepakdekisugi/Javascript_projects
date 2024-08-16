class Segment{
    constructor(particleA,particleB){
       this.particleA=particleA;
       this.particleB=particleB;
       this.len=distance(
          this.particleA.loc,
          this.particleB.loc
       );
    }
    update(){
       const curLen=distance(
          this.particleA.loc,
          this.particleB.loc
       );
       const delta=curLen-this.len;
 
       const diff=subtract(
          this.particleA.loc,
          this.particleB.loc
       );
       const norm=normalize(diff);
       
       if(this.particleA.fixed){
          this.particleB.loc=add(
             this.particleB.loc,
             scale(norm,delta)
          );
       }else if(this.particleB.fixed){
          this.particleA.loc=add(
             this.particleA.loc,
             scale(norm,-delta)
          );
       }else{
          this.particleA.loc=add(
             this.particleA.loc,
             scale(norm,-delta/2)
          );
          this.particleB.loc=add(
             this.particleB.loc,
             scale(norm,delta/2)
          );
       }
    }
    draw(ctx){
       ctx.beginPath();
       ctx.moveTo(
          this.particleA.loc.x,
          this.particleA.loc.y
       );
       ctx.lineTo(
          this.particleB.loc.x,
          this.particleB.loc.y
       );
       ctx.stroke();
    }
 }