const videoContainer = document.getElementById("jsVideoPlayer");
const videoPlayer = document.querySelector("#jsVideoPlayer video");
const playBtn = document.getElementById("jsPlayButton");
const volumeBtn = document.getElementById("jsVolumeButton");
const fullScreenBtn = document.getElementById("jsFullScreen");

function handlePlayClick(){
    if(videoPlayer.paused){
        videoPlayer.play();
        playBtn.innerHTML = '<i class="fas fa-pause"></i>';
    }else{
        videoPlayer.pause();
        playBtn.innerHTML = '<i class="fas fa-play"></i>';
    }
}

function handleVolumeClick(){
    if(videoPlayer.muted){ //비디오가 음소거 되어 있으면
        videoPlayer.muted = false;  //음소거를 해제한다.
        volumeBtn.innerHTML = '<i class="fas fa-volume-up"></i>'; // 소리나는 아이콘
        
    }else{ // 비디오가 음소거되어있지 않으면
        videoPlayer.muted = true; // 음소거 상태로 만든다.
        volumeBtn.innerHTML = '<i class="fas fa-volume-mute"></i>' // 음소거 아이콘
    }
}
function exitFullScreen(){
    document.exitFullscreen();//전체화면을 종료하기
    fullScreenBtn.innerHTML = '<i class="fas fa-expand"></i>'; // 아이콘 변경하기(전체 화면 아이콘)
    fullScreenBtn.removeEventListener("click", exitFullScreen);
    fullScreenBtn.addEventListener("click", goFullScreen);
}

function goFullScreen(){
    videoContainer.requestFullscreen(); //전체 화면이 되게 만들기
    fullScreenBtn.innerHTML = '<i class="fas fa-compress"></i>'//아이콘 변경하기(작은 화면 아이콘)
    fullScreenBtn.removeEventListener("click", goFullScreen);
    fullScreenBtn.addEventListener("click", exitFullScreen);
}

function init(){
    playBtn.addEventListener("click", handlePlayClick);
    volumeBtn.addEventListener("click", handleVolumeClick);
    fullScreenBtn.addEventListener("click", goFullScreen);
}

if(videoContainer){
    init();
}