video = "";
status1 = "";
objects = [];
object_name = "";

function setup() {
    canvas = createCanvas(400, 400);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    console.log("inside setup");
}

function draw() {
    image(video, 0, 0, 400, 400);
    console.log("inside draw");
    if (status1 != "") {
        object_detector.detect(video, got_results);
        r = random(255);
        g = random(255);
        b = random(255);
        for (let index = 0; index < objects.length; index++) {
            document.getElementById("status").innerHTML = "status :objects detected";
            object_name = document.getElementById("input").value;
            fill(r, g, b);
            percent = floor(objects[index].confidence * 100);
            text(objects[index].label + " " + percent + "%", objects[index].x, objects[index].y);
            noFill();
            stroke(r, g, b);
            rect(objects[index].x, objects[index].y, objects[index].width, objects[index].height);
            if(objects[index].label==object_name){
            document.getElementById("object_found").innerHTML = object_name + " found";
            var synth = window.speechSynthesis;
            var utterThis = new SpeechSynthesisUtterance(object_name+" found");
            synth.speak(utterThis);
            }
        }
    }
}

function start() {
    object_detector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "status : detecting objects";
}

function modelLoaded() {
    console.log("model is loaded");
    status1 = true;
}

function got_results(error, results) {
    if (error) {
        console.log(error);
    } else {
        console.log(results);
        objects = results;
    }
}