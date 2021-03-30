import axios from "axios";

const addCommentForm = document.getElementById("jsAddComment");
const requireLoginForm = document.getElementById("jsCommentLogout");
const commentNumber = document.getElementById("jsCommentNumber");
const commentDelBtn = document.querySelectorAll("#jsCommentDelBtn");
const ellipsisBtn = document.querySelectorAll("#jsCommentEllipsisBtn");
let ellipsisBox;

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