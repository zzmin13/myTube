import axios from "axios";

const addCommentForm = document.getElementById("jsAddComment");
const commentList = document.getElementById("jsCommentList");
const commentNumber = document.getElementById("jsCommentNumber");
const commentDelBtn = document.getElementsByClassName("jsCommentDelBtn");
const newId = commentDelBtn.length + 1;

const increaseNumber = () => {
    commentNumber.innerHTML = parseInt(commentNumber.innerHTML, 10) + 1;

}
const addComment = (comment) => {
    const li = document.createElement("li");
    const span = document.createElement("span");
    const delBtn = document.createElement("button");
    
    delBtn.setAttribute("class", "video__comments-delete jsCommentDelBtn");
    delBtn.innerHTML = '❌';
    delBtn.id = newId; // id는 1부터 시작하고 싶음
    span.innerHTML = comment;

    li.appendChild(span);
    li.appendChild(delBtn);
    commentList.prepend(li);

    increaseNumber();

    delBtn.addEventListener("click", handleDelBtn);
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
    if(answer === true){
        const deleteTarget = event.target.parentNode;
        console.log(deleteTarget.id);

        const commentId = deleteTarget.id;
        const response = await axios({
            url: `/api/comment/${commentId}/delete`,
            method: "POST"
        });
        if(response.status === 200){
            commentList.removeChild(event.target.parentNode);
        }
        commentNumber.innerHTML = parseInt(commentNumber.innerHTML, 10) - 1;

    }else{
        alert("삭제가 취소되었습니다.");
    }


    
}

function init(){
    addCommentForm.addEventListener("submit", handleSubmit);
}

if(addCommentForm){
    init();
}

// if(commentDelBtn){
//     for (let i = 0; i < commentDelBtn.length; i++){
//         commentDelBtn[i].addEventListener("click", handleDelBtn);
//     }
// }