function lerp(min,max,t){
    return min+(max-min)*t;
 }
 
 function add(v1,v2){
    return {
       x:v1.x+v2.x,
       y:v1.y+v2.y
    };
 }
 
 function subtract(v1,v2){
    return {
       x:v1.x-v2.x,
       y:v1.y-v2.y
    };
 }
 
 function scale(v,scaler){
    return {
       x:v.x*scaler,
       y:v.y*scaler
    };
 }
 
 /*
 0,0
 |\
 | \
 |  \
 |   \
 |    \ 
 |_____X
 */
 function magnitude(v){
    return Math.hypot(v.x,v.y);
 }
 
 function normalize(v){
    return scale(v,1/magnitude(v));
 }
 
 //finding the hypotenuse
 //using pythagorean theorem
 function distance(v1,v2){
    const diff=subtract(v1,v2);
    return magnitude(diff);
 }