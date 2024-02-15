objects = [];
status1 = "";

function preload(){
    alarm=loadSound("mixkit-digital-quick-tone-2866.wav");
}

function setup() {
    canvas = createCanvas(500, 400);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    video.size(500,400);
}

function start() {
    detector = ml5.objectDetector("cocossd", ModelReady);
    document.getElementById("status").innerHTML = "Status- detecting baby";
}

function draw() {
    image(video, 0, 0, 500, 400);
    noFill();
    if (status1 != "") {
        detector.detect(video, gotResults);
        for (i = 0; i < objects.length; i++) {
            name1 = objects[i].label;
            x = objects[i].x;
            y = objects[i].y;
            height = objects[i].height;
            width = objects[i].width;
            confidence = (objects[i].confidence * 100).toFixed();
            stroke(random(255),random(255),random(255));
            rect(x, y, width, height);
            text(name1 + " " + confidence + "%", x + 10, y + 10);  
            if(name1=="person"){
                document.getElementById("status").innerHTML = "Baby detected"  
                alarm.stop();
            }
            else{
                document.getElementById("status").innerHTML = "Baby not detected"  
                alarm.play();
            }
        }
        if(objects.length<=0){
            document.getElementById("status").innerHTML = "Baby not detected"  
            alarm.play();
        }
    }
}

function ModelReady() {
    console.log("correct");
    status1 = "True";
}

function gotResults(error, results) {
    if (error) {
        console.log(error)
    }
    else {
        console.log(results)
        objects = results
    }
}




