const deleteVideoBtn = document.querySelector(".form-container__link--delete");

const handleClickDeleteVideoBtn = () => {
    const answer = confirm("비디오를 삭제하시겠습니까?");
    if(answer === true){
        location.href = deleteVideoBtn.getAttribute("id");
        return true;
    }else{
        return false;
    }
}
function init(){
    deleteVideoBtn.addEventListener("click", handleClickDeleteVideoBtn);
}
if(deleteVideoBtn){
    console.log(deleteVideoBtn.getAttribute("href"));
    init();
}