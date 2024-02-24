noseX = 0;
noseY = 0;
RwristX = 0;
LwristX = 0;
difference = 0;

function setup(){
    video = createCapture(VIDEO);
    video.size(550,500);

    canvas = createCanvas(550,550);
    canvas.position(550,150);

    posenet = ml5.poseNet(video, modelLoaded);
    posenet.on("pose" , gotPoses);
}

function gotPoses(results){
    if(results.length > 0){
        console.log(results);
        noseX = results[0].pose.nose.x;
        noseY = results[0].pose.nose.y;
        console.log("noseX = " + noseX + "noseY = " + noseY);
        LwristX = results[0].pose.leftWrist.x;
        RwristX =  results[0].pose.rightWrist.x;
        difference = floor(LwristX - RwristX);
        console.log("leftWristX = " + LwristX + "rightWristX = " + RwristX + "difference" + difference);
    }
}

function modelLoaded(){
    console.log('Posenet model is loaded!');
}

function draw(){
    background("#f584a6");
    fill("#211872");
    stroke("#211872")
    square(noseX,noseY,difference);
    document.getElementById("square1").innerHTML = "Width and Height of this square will be : " + difference + "px";
}