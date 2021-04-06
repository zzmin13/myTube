const videoThumbnail = document.querySelectorAll(".videoBlock__thumbnail");
let str;

const handleHoverVideo = (event) => {
    str = event.currentTarget.src.replace("#t=0.5", "#t=0,10");
    event.currentTarget.src = str;
    event.currentTarget.autoplay = true;
    if(event.currentTarget.ended){
        console.log(`비디오가 종료되었습니다.`);
        // event.currentTarget.currentTime = 0;
    }
}
const handleHideVideo = (event) => {
    str = event.currentTarget.src.replace("#t=0,10", "#t=0.5");
    event.currentTarget.src = str;
    event.currentTarget.autoplay = false;
}

if(videoThumbnail){
    videoThumbnail.forEach((element) => {
        element.defaultPlaybackRate = 3;
        element.addEventListener("mouseover", handleHoverVideo);
        element.addEventListener("mouseout", handleHideVideo);
    })
}