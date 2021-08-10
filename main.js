objects = [];
status = "";
video = "";

function preload() {
    video = createVideo("video.mp4");
    video.hide();
}

function setup() {
    canvas = createCanvas(480, 380);
    canvas.center();
}

function start() {
    objectDetector = ml5.objectDetector("cocossd", modelLoaded);
    status = "Detecting Objects..."
    document.getElementById("status").innerHTML = "Status: " + status;
}

function modelLoaded() {
    console.log("Model Loaded!");
    status = true;
    video.speed(1);
    video.volume(0);
    video.loop();
}
function gotResult(error, results) {
  if (error) {
    console.error();
  } else {
    console.log(results);
    objects = results;
  }
}
function draw() {
    image(video, 0, 0, 480, 380);
    if (status != "") {
        objectDetector.detect(video, gotResult);
        for (i=0; i<objects.length; i++){
            document.getElementById("status").innerHTML = "Object Detected!"
            document.getElementById("objectsdetected").innerHTML = i + " " + "Objects Detected!"
        
            fill("#FF0000");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke("#FF0000");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
}
