const { isValidObjectId } = require('mongoose');

const videoContainer = document.getElementById("jsVideoPlayer");
const videoPlayer = document.querySelector("#jsVideoPlayer video");
const playBtn = document.getElementById("jsPlayButton");
const volumeBtn = document.getElementById("jsVolumeButton");
const fullScreenBtn = document.getElementById("jsFullScreen");
const currentTime = document.getElementById("currentTime");
const totalTime = document.getElementById("totalTime");

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
    // document.exitFullscreen();//전체화면을 종료하기
    if(document.exitFullscreen){
        document.exitFullscreen();
    }else if(document.mozCancelFullScreen){
        document.mozCancelFullScreen();
    }else if(document.webkitExitFullscreen){
        document.webkitExitFullscreen();
    }else if(document.msExitFullscreen){
        document.msExitFullscreen();
    }
    fullScreenBtn.innerHTML = '<i class="fas fa-expand"></i>'; // 아이콘 변경하기(전체 화면 아이콘)
    fullScreenBtn.removeEventListener("click", exitFullScreen);
    fullScreenBtn.addEventListener("click", goFullScreen);
}

function goFullScreen(){
    if(videoContainer.requestFullscreen){
        videoContainer.requestFullscreen();
    }else if(videoContainer.mozRequestFullScreen){
        videoContainer.mozRequestFullScreen();
    }else if(videoContainer.webkitRequestFullscreen){
        videoContainer.webkitRequestFullscreen();
    }else if(videoContainer.msRequestFullscreen){
        videoContainer.msRequestFullscreen();
    }
    fullScreenBtn.innerHTML = '<i class="fas fa-compress"></i>'//아이콘 변경하기(작은 화면 아이콘)
    fullScreenBtn.removeEventListener("click", goFullScreen);
    fullScreenBtn.addEventListener("click", exitFullScreen);
}

const formatDate = (seconds) => {
    const secondsNumber = parseInt(seconds, 10);
    let hours = Math.floor(secondsNumber / 3600);
    let minutes = Math.floor((secondsNumber - hours * 3600) / 60);
    let totalSeconds = secondsNumber - hours * 3600 - minutes * 60;

    if(hours < 10){
        hours = `0${hours}`;
    }
    if(minutes < 10){
        minutes = `0${minutes}`;
    }
    if(totalSeconds < 10){
        totalSeconds = `0${totalSeconds}`;
    }
    return `${hours}:${minutes}:${totalSeconds}`;
}

function getCurrentTime(){
    currentTime.innerHTML = formatDate(videoPlayer.currentTime);
}

function setTotalTime(){
    const totalTimeString = formatDate(videoPlayer.duration);
    totalTime.innerHTML = totalTimeString;
    setInterval(getCurrentTime, 1000);
}

function init(){
    playBtn.addEventListener("click", handlePlayClick);
    volumeBtn.addEventListener("click", handleVolumeClick);
    fullScreenBtn.addEventListener("click", goFullScreen);
    videoPlayer.addEventListener("loadedmetadata", setTotalTime);
}

if(videoContainer){
    init();
}