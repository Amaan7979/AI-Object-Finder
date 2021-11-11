video="";
status1="";
function setup(){
    canvas=createCanvas(400,400);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();
}
function draw() {
    image(video,0,0,400,400);
}
function start() {
object_detector=ml5.objectDetector('cocossd',modelLoaded);
document.getElementById("status").innerHTML="status : detecting objects";
}
function modelLoaded() {
    console.log("model is loaded");
status1=true;
}