const inputs = document.querySelectorAll("input"),
    button = document.querySelector("button"),
    mobile = document.getElementById("mobile"),
    expire = document.getElementById("expire");

    let OTP = "", expireInterval = "";


function generateOTPs(){
    OTP (
        Math.floor(Math.random() * 10)+
        "" +
        Math.floor(Math.random() * 10)+
        "" +
        Math.floor(Math.random() * 10)+
        "" +
        Math.floor(Math.random() * 10)
    );
    
    alert("Your OTP is: " +OTP);
    
    inputs[0].focus();
    expire.innerText = 30;
    expireInterval = setInterval(function (){
        expire.innerText--;
        if(expire.innerText == 0){
            clearInterval(expireInterval);
        };
    }, 1000);
}

function clearOTPs(){
    inputs.forEach((input) => {
        input.value = "";
        input.setAttribute("disabled", true);
    });
    clearInterval(expireInterval);
    expire.innerText = 0;
    button.setAttribute("disabled", true);
    button.classList.remove("active");
}

inputs.forEach((input, index) => {
    input.addEventListener("keyup", function(e){
        const currentInput = input,
            nextInput = input.nextElementSibling,
            prevInput = input.previousElementSibling;
        
        // console.log(currentInput, nextInput, prevInput);

        if(nextInput && nextInput.hasAttribute("disabled") &&
        currentInput.value!==""){
            nextInput.removeAttribute("disabled", true);
            nextInput.focus();
        }

        if(e.key === "Backspace"){
            inputs.forEach((input, index1) => {
                if(index <= index1 && prevInput){
                input.setAttribute("disabled", true);
                prevInput.focus();
                prevInput.value = "";
                }
            });
        }

        if(!inputs[3].disabled && inputs[3].value !== ""){
            inputs[3].blur();
            button.classList.add("active");
            return;
        }
        button.classList.remove("active");
    });
});


window.addEventListener("load", () =>{
    let x = prompt("Please enter your mobile number to verify ");
    if(x){
        mobile.innerText = x;
        generateOTPs();
    }
})

button.addEventListener("click", ()=> {
    let verify = "";
    inputs.forEach((input) => {
        verify += input.value;
        clearOTPs();
    });
    if(verify === OTP){
        alert("your account has been verified successfully");
    }else{
        alert("your varification Faild");
    }
})