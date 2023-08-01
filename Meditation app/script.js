const app = () => {
  const song = document.querySelector(".song");
  const play = document.querySelector(".play");
  const outline = document.querySelector(".moving-outline circle");
  const video = document.querySelector(".vid-container video");

  //Sounds
  const sound = document.querySelector(".sound-picker button");

  //Time Display
  const timeDisplay = document.querySelector(".time-display");

  //Get the outline length of the circle
  const outlineLength = outline.getTotalLength();

  //Durations
  let fakeDuration = 600;

  outline.style.strokeDasharray = outlineLength;
  outline.style.strokeDashoffset = outlineLength;
};

app();
