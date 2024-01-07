function lerp(a,b,t){
    return a+(b-a)*t;
}

function vLerp(A,B,t){
    const res = {};
    for(let attr in A){
        res[attr]=lerp(A[attr],B[attr],t);
    }
    return res;
}