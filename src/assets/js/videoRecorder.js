const recordContainer = document.getElementById("jsRecordContainer");
const recordBtn = document.getElementById("jsRecordBtn");
const videoPreview = document.getElementById("jsVideoPreview");
let streamObject;
let videoRecorder;

const handleVideoData = (event) => {
    const { data:videoFile } = event;
    const link = document.createElement("a");
    link.href = URL.createObjectURL(videoFile);
    link.download = "recorded.mp4";
    document.body.appendChild(link);
    link.click();
}
const startRecording = () => {
    videoRecorder = new MediaRecorder(streamObject);
    videoRecorder.start();
    videoRecorder.addEventListener("dataavailable", handleVideoData);
    recordBtn.addEventListener("click", stopRecording);
};

const stopRecording = () => {
    videoRecorder.stop();
    recordBtn.removeEventListener("click", stopRecording);
    recordBtn.addEventListener("click", getVideo);
    recordBtn.innerHTML = "비디오 녹화하기";
    recordBtn.style.backgroundColor = "#3498db";
}
const getVideo = async() => {
    try{
        const stream = await navigator.mediaDevices.getUserMedia({
            audio: true,
            video: { width: 1280, height: 720 }
        });
        videoPreview.srcObject = stream;
        videoPreview.muted = true;
        videoPreview.play();
        recordBtn.innerHTML = "STOP";
        recordBtn.style.backgroundColor = "#e53935";
        streamObject = stream;
        startRecording();
    }catch(error){
        recordBtn.innerHTML = "😥 녹화할 수 없습니다."
    }finally{
        recordBtn.removeEventListener("click", getVideo);
    }
}
function init(){
    recordBtn.addEventListener("click", getVideo);
}
if(recordContainer){
    init();
}