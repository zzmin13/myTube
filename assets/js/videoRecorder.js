const recordContainer = document.getElementById("jsRecordContainer");
const recordBtn = document.getElementById("jsRecordBtn");
const videoPreview = document.getElementById("jsVideoPreview");

const startRecording = async() => {
    try{
        const stream = await navigator.mediaDevices.getUserMedia({
            audio: true,
            video: { width: 1280, height: 720 }
        });
        videoPreview.srcObject = stream;
        videoPreview.muted = true;
        videoPreview.play();
    }catch(error){
        recordBtn.innerHTML = "😥 녹화할 수 없습니다."
        recordBtn.removeEventListener("click", startRecording);
    }
}
function init(){
    recordBtn.addEventListener("click", startRecording);
}
if(recordContainer){
    init();
}