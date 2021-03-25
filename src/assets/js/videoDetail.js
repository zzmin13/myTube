const videoCreateDate = document.querySelector(".video__createDate");
const moreDetailBtn = document.querySelector(".description_moreDetails");
const videoDescription = document.querySelector(".video__description__text");
const getDateString = () => {
    const year = videoCreateDate.id.split("-")[0];
    const month = videoCreateDate.id.split("-")[1];
    const day = videoCreateDate.id.split("-")[2].slice(0,2);
    const dateString = `${year}년 ${month}월 ${day}일`;
    console.log(dateString);
    videoCreateDate.innerHTML = dateString;
}

const handleMoreDetail = (event) => {
    console.log(videoDescription);
    videoDescription.classList.add('clicked'); //clicked 이면 간략히 라는 글씨가 나오게
    event.target.innerHTML = '간략히';
    moreDetailBtn.removeEventListener("click", handleMoreDetail);
    moreDetailBtn.addEventListener("click", handlebriefly);
}

const handlebriefly = (event) => {
    console.log(videoDescription);
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
    let str = videoDescription.innerHTML;
    console.log(str);
    // str = str.replace('안녕', '하이');
    str.replace('\r\n', '<br>');
    videoDescription.innerHTML = str;
}