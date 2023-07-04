let startTime, endTime;
let imageSize = "";
let image = new Image();
let bitSpeed = document.getElementById("bits"),
    kbSpeed = document.getElementById("kbs"),
    mbspeed = document.getElementById("mbs"),
    info = document.getElementById("info");

let totalBitSpeed = 0;
let totalKbSpeed = 0;
let totalMsSpeed = 0;
let numTests = 0;
let TestCompleted = 0;

// Get random image from unsplash .com

let imageApi = "https://source.unsplash.com/random?topic=nature";

// When image loads

image.onload = async function() {
    endTime = new Date().getTime();

    //Get image size
    await fetch(imageApi).then((response) => {
        imageSize = response.headers.get("content-length");
        calculateSpeed();
    });
};

