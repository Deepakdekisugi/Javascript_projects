const inputs = document.querySelectorAll("input"),
    button = document.querySelector("button"),
    mobile = document.getElementById("mobile"),
    expire = document.getElementById("expire");

generateOTPs();

function generateOTPs(){
    console.log(
        Math.floor(Math.random() * 10)+
        "" +
        Math.floor(Math.random() * 10)+
        "" +
        Math.floor(Math.random() * 10)+
        "" +
        Math.floor(Math.random() * 10)
    );

    expire.innerText = 10;
    const expireInterval = setInterval(function (){
        expire.innerText--;
        if(expire.innerText == 0){
            clearInterval(expireInterval)
        };
    }, 1000)
}