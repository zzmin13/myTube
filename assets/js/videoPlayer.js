const videoContainer = document.getElementById("jsVideoPlayer");
const videoPlayer = document.querySelector("#jsVideoPlayer video");
const playBtn = document.getElementById("jsPlayButton");
const volumeBtn = document.getElementById("jsVolumeButton");

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
function init(){
    playBtn.addEventListener("click", handlePlayClick);
    volumeBtn.addEventListener("click", handleVolumeClick);
}

if(videoContainer){
    init();
}