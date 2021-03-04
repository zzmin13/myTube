import e from 'express';

// GLobal(전역적인 것들)
const HOME = "/";
const JOIN = "/join";
const LOGIN = "/login";
const LOGOUT = "/logout";
const SEARCH = "/search";

//Users
const USERS = "/users";
const USER_DETAIL = "/:id"; 
const EDIT_PROFILE = "/edit-profile";
const CHANGE_PASSWORD = "/change-password";

//Videos
const VIDEOS = "/videos";
const UPLOAD = "/upload";
const VIDEO_DETAIL = "/:id";
const EDIT_VIDEO = "/:id/edit"; 
const DELETE_VIDEO = "/:id/delete";

const routes = {
    home: HOME,
    join: JOIN,
    login: LOGIN,
    logout: LOGOUT,
    search: SEARCH,
    users: USERS,
    userDetail: (id) => {
        if(id){
            return `/users/${id}`;
        }else{
            return USER_DETAIL;
        }
    },
    editProfile: EDIT_PROFILE,
    changePassword: CHANGE_PASSWORD,
    videos: VIDEOS,
    upload: UPLOAD,
    videoDetail: (id) =>{
        if(id){
            return `/videos/${id}`;
        }else{
            return VIDEO_DETAIL;
        }
    },
    editVideo: (id) => {
        if(id){
<<<<<<< HEAD
            return `/videos/${id}/edit`;
=======
            return `/videos/${id}/edit`
>>>>>>> 39a6c55042833fcb80f9325fd9160f2092a23768
        }else{
            return EDIT_VIDEO;
        }
    },
<<<<<<< HEAD
    deleteVideo: (id) => {
        if(id){
            return `/videos/${id}/delete`;
        }else{
            return  DELETE_VIDEO;
        }
    }
=======
    deleteVideo: DELETE_VIDEO
>>>>>>> 39a6c55042833fcb80f9325fd9160f2092a23768
};

export default routes;
