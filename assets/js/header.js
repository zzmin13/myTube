const headerProfile = document.getElementById("jsHeaderProfile");
const profileDetail = document.getElementById("jsHeaderProfileDetail");

const profileHidden = () => {
    profileDetail.style.display = 'none';
    headerProfile.removeEventListener("click", profileHidden);
    headerProfile.addEventListener("click", handleProfileClick);
}
const handleProfileClick = () => {
    profileDetail.style.display = "flex";
    headerProfile.removeEventListener("click", handleProfileClick);
    headerProfile.addEventListener("click", profileHidden);
}
function init(){
    headerProfile.addEventListener("click", handleProfileClick);
}
if(headerProfile){
    init();
}