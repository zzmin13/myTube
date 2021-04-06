import axios from "axios";

const addCommentForm = document.getElementById("jsAddComment");
const requireLoginForm = document.getElementById("jsCommentLogout");
const commentNumber = document.getElementById("jsCommentNumber");
const commentDelBtn = document.querySelectorAll("#jsCommentDelBtn");
const ellipsisBtn = document.querySelectorAll("#jsCommentEllipsisBtn");
const commentTime = document.querySelectorAll(".video__comment_time");
let ellipsisBox;
let dateString;

const increaseNumber = () => {
    commentNumber.innerHTML = `${parseInt(commentNumber.innerHTML, 10) + 1}개의 덧글`;
}
const addComment = (comment) => {
    location.reload();
    increaseNumber();
}

const sendComment = async (comment) => {
    const videoId = window.location.href.split("/videos/")[1];
    const response = await axios({
        url: `/api/${videoId}/comment`,
        method: "POST",
        data: {
            comment
        }
    });
    if(response.status === 200){
        console.log(response);
        addComment(comment);
    }
}

const handleSubmit = (event) => {
    event.preventDefault();
    const commentInput = addCommentForm.querySelector("input");
    const comment = commentInput.value;
    sendComment(comment);
    commentInput.value = "";
}

const handleDelBtn = async (event) => {
    const answer = confirm("덧글을 삭제하시겠습니까?");
    const deleteTarget = event.currentTarget.parentNode.parentNode;
    if(answer === true){
        console.log(deleteTarget.id);
        const commentId = deleteTarget.id;
        const response = await axios({
            url: `/api/comment/${commentId}/delete`,
            method: "POST"
        });
        if(response.status === 200){
            location.reload();
        }
        commentNumber.innerHTML = `${parseInt(commentNumber.innerHTML, 10) - 1}개의 덧글`;

    }else{
        alert("삭제가 취소되었습니다.");
    }
}

const goLoginPage = (event) => {
    console.log(event.target.id);
    const link = document.createElement("a");
    link.href = event.target.id;
    document.body.appendChild(link);
    link.click();
}

const showEllipsisBox = (event) => {
    ellipsisBox = event.currentTarget.nextSibling;
    ellipsisBox.style.display = "flex";
    event.currentTarget.removeEventListener("click", showEllipsisBox);
    event.currentTarget.addEventListener("click", hideEllipsisBox);
}
const hideEllipsisBox = (event) => {
    ellipsisBox = event.currentTarget.nextSibling;
    ellipsisBox.style.display = "none";
    event.currentTarget.removeEventListener("click", hideEllipsisBox);
    event.currentTarget.addEventListener("click", showEllipsisBox);
}

function init(){
    addCommentForm.addEventListener("submit", handleSubmit);
}

if(addCommentForm){
    init();
}

if(commentDelBtn){
    commentDelBtn.forEach((element) => element.addEventListener("click", handleDelBtn));
}

if(requireLoginForm){
    requireLoginForm.addEventListener("click", goLoginPage);
}

if(ellipsisBtn){
    ellipsisBtn.forEach((element) => element.addEventListener("click", showEllipsisBox));
}

if(commentTime){
    commentTime.forEach((element) => {
        const commentDate = new Date(Date.parse(element.id));
        const currentDate = new Date();
        //
        const diffMSec = currentDate.getTime() - commentDate.getTime(); //
        const diffSec = diffMSec / 1000; // 몇 초 차이
        const diffMin = diffMSec / 1000 / 60; // 몇 분 차이
        const diffHour = diffMSec / 1000 / 60 / 60; // 몇 시간 차이
        const diffDay = diffMSec / 1000 / 60 / 60 / 24; // 몇 일 차이
        const diffMonth = diffDay / 30 ; // 몇 개월 차이
        const diffYear = diffMonth / 12; // 몇 년 차이
        console.log(diffDay);

        if(Math.floor(diffDay) === 0){
            if(Math.floor(diffMin) < 60){
                if(Math.floor(diffMin) === 0){
                    dateString = `방금`;
                }else{
                    dateString = `${Math.floor(diffMin)}분 전`;
                }
            }else{
                dateString = `${Math.floor(diffHour)}시간 전`;
            }
        }else{
            if(Math.floor(diffDay) < 7){
                dateString = `${Math.floor(diffDay)}일 전`;
            }else if(Math.floor(diffDay) >= 7 && Math.floor(diffDay) < 14){
                dateString = `1주일 전`;
            }else if(Math.floor(diffDay) >= 14 && Math.floor(diffDay) < 21){
                dateString = `2주일 전`;
            }else if(Math.floor(diffDay) >= 21 && Math.floor(diffDay) < 28){
                dateString = `3주일 전`;
            }else if(Math.floor(diffDay) >= 28 && Math.floor(diffDay) < 31){
                dateString = `1달 전`;
            }else{
                if(Math.floor(diffMonth) < 12){
                    dateString = `${Math.floor(diffMonth)}달 전`;
                }else{
                    dateString = `${Math.floor(diffYear)}년 전`;
                }
            }
        }
        element.innerHTML = dateString;
    });
}