const videoCreateDate = document.querySelector(".video__createDate");
const moreDetailBtn = document.querySelector(".description_moreDetails");
const videoDescription = document.querySelector(".video__description__text");

const getDateString = () => {
    const year = videoCreateDate.id.split("-")[0];
    const month = videoCreateDate.id.split("-")[1];
    const day = videoCreateDate.id.split("-")[2].slice(0,2);
    const dateString = `${year}년 ${month}월 ${day}일`;
    videoCreateDate.innerHTML = dateString;
}

const handleMoreDetail = (event) => {
    videoDescription.classList.add('clicked'); //clicked 이면 간략히 라는 글씨가 나오게
    event.target.innerHTML = '간략히';
    moreDetailBtn.removeEventListener("click", handleMoreDetail);
    moreDetailBtn.addEventListener("click", handlebriefly);
}

const handlebriefly = (event) => {
    videoDescription.classList.remove('clicked');
    event.target.innerHTML = '더보기';
    moreDetailBtn.removeEventListener("click", handlebriefly);
    moreDetailBtn.addEventListener("click", handleMoreDetail);
}

if(videoCreateDate){
    getDateString();
}

if(moreDetailBtn){
    moreDetailBtn.addEventListener("click", handleMoreDetail);
}

if(videoDescription){
    if(videoDescription.offsetHeight > 74){
        videoDescription.classList.add('abstracted');
        moreDetailBtn.style.display = 'flex';
    }
}