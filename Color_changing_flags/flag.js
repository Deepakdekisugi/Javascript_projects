class Flag{
    //width means number of particles on x axis
    //height means number of particles on y axis
    //width and height need to be multiples of 3 + 1
    constructor({left=250,top=100,width=31,height=25,sep=5}){
       this.particles=[];
       this.segments=[];
       this.chains=
          this.#generateFlag(
             {left,top,width,height,sep}
          );
       this.patches=this.#generatePatches(this.chains);
    }
    getNearestParticle(loc){
       let minDist=Number.MAX_SAFE_INTEGER;
       let nearestParticle=null;
       for(const particle of this.particles){
          const d=distance(loc,particle.loc);
          if(d<minDist){
             minDist=d;
             nearestParticle=particle;
          }
       }
       return nearestParticle;
    }
    #generatePatches(chains){
       const patches=[];
       for(let y=1;y<chains.length;y++){
          for(let x=1;x<chains[y].particles.length;x++){
             const A=chains[y].particles[x];
             const B=chains[y-1].particles[x];
             const C=chains[y-1].particles[x-1];
             const D=chains[y].particles[x-1];
             const roColor=x<chains[y].particles.length/3
                ?"blue"
                :x<2*chains[y].particles.length/3
                   ?"yellow"
                   :"red";
             const fiColor=
                (y>chains.length/3 && y<2*chains.length/3)
                ?"blue"
                : (x>chains[y].particles.length/4 && 
                   x<2*chains[y].particles.length/4)
                   ?"blue"
                   :"white";
             const color={
                "ro":roColor,
                "fi":fiColor
             }
             const selColor="ro";
             patches.push({A,B,C,D,color,selColor});
          }
       }
       return patches;
    }
    #generateFlag({left,top,width,height,sep}){
       const chains=[];
       for(let i=0;i<height;i++){
          const y=top+i*sep;
          const fixFirstParticle=(i==0)||(i==height-1);
          chains.push(
             this.#generateChain(
                {left,top:y,width,sep},
                fixFirstParticle
             )
          );
       }
       for(const {particles,segments} of chains){
          this.particles=this.particles.concat(particles);
          this.segments=this.segments.concat(segments);
       }
       const firstChainParticles=chains[0].particles;
       for(let i=0;i<firstChainParticles.length;i++){
          for(let j=1;j<chains.length;j++){
             this.segments.push(new Segment(
                chains[j-1].particles[i],
                chains[j].particles[i]
             ));
          }
       }
       return chains;
    }
    #generateChain({left,top,width,sep},fixFirstParticle=false){
       const particles=[];
       const segments=[];
       for(let i=0;i<width;i++){
          const x=left+i*sep;
          const y=top;
          const fixed=(i==0)&&fixFirstParticle;
          particles.push(new Particle({x,y},fixed));
       }
       for(let i=1;i<particles.length;i++){
          segments.push(new Segment(
             particles[i-1],
             particles[i]
          ));
       }
       return {particles,segments}
    }
    update(){
       for(const particle of this.particles){
          particle.update();
       }
       for(let i=1;i<20;i++){
          for(const segment of this.segments){
             segment.update();
          }
       }
    }
    draw(ctx){
       
       ctx.globalAlpha=0.8;
       for(const {A,B,C,D,color,selColor} of this.patches){
          ctx.beginPath();
          ctx.moveTo(A.loc.x,A.loc.y);
          ctx.lineTo(B.loc.x,B.loc.y);
          ctx.lineTo(C.loc.x,C.loc.y);
          ctx.lineTo(D.loc.x,D.loc.y);
          ctx.closePath();
          ctx.fillStyle=color[selColor];
          ctx.fill();
       }
       ctx.globalAlpha=1;
    }
 }