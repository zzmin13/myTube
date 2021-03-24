const uploadForm = document.getElementById("jsUploadForm");
const loadingImage = document.querySelector(".loadingImage");

const handleSubmitForm = () => {
    loadingImage.style.display = 'flex';
}
function init(){
    uploadForm.addEventListener("submit", handleSubmitForm);
}
if(uploadForm){
    console.log('hi');
    init();
}