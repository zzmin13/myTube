import routes from '../routes';
import Video from "../models/Video";

export const home = async(req, res) => {
    try{
        const videos = await Video.find({});
        res.render("home", {pageTitle: "Home", videos});
    }catch(error){
        console.log(error);
        res.render("home", {pageTitle: "Home", videos :[]});
    }
        
};
    

export const search = (req, res) => {
    const {query: { term: searchingBy }} = req; // const searchingBy = req.query.term 과 같은 코드
    res.render("search", {pageTitle: "Search", searchingBy, videos}); // searchingBy = searchingBy 인 경우 하나로 줄여쓸 수 있음

};

export const getUpload = (req, res) => res.render("upload", {pageTitle: "Upload"});
export const postUpload = async(req, res) => {
    const {
        body: {title,description},
        file: {path}
    } = req; // 객체 비구조화 할당이라는 문법임. 가장 안 속에 있는 녀석만 변수처럼 사용 가능함
    //req안에는 req.body, req.file이 있으며 req.body에는 이미지,비디오를 제외한 정보가 전송된다
    //req.file에는 multer를 이용해서 받은 정보가 담겨 있다. 

    const newVideo = await Video.create({
        fileUrl: path,
        title,
        description
    });
    
    console.log();
    console.log(`newVideo is ${newVideo}`);
    console.log(`newVideo id is${newVideo.id}`)
    //To Do: Upload and save video
    res.redirect(routes.videoDetail(newVideo.id));
};

export const videoDetail = async(req, res) => {
    const { params: {id}} = req;
<<<<<<< HEAD
    try{
        const video = await Video.findById(id);
        console.log(video);
        res.render("videoDetail", {pageTitle: video.title, video});
=======

    try{
        const video = await Video.findById(id);
        res.render("videoDetail", {pageTitle: "Video Detail", video});
>>>>>>> 39a6c55042833fcb80f9325fd9160f2092a23768
    }catch(error){
        console.log(error);
        res.redirect(routes.home);
    }
<<<<<<< HEAD
    
}

export const getEditVideo = async(req, res) => {
    const { 
        body : { title, description },
        params: { id } } = req;
    try{
        const video = await Video.findById(id);
        res.render("editVideo", {pageTitle: `Edit ${video.title}`, video});
    }catch(error){
        res.redirect(routes.home);
=======
};

export const getEditVideo = async(req, res) => {
    const {params: {id}} = req;
    try{
        const video = await Video.findById(id);
        res.render("editVideo", {pageTitle: `Edit ${video.title}`, video});

    }catch(error){
        res.redirect(routes.home);

>>>>>>> 39a6c55042833fcb80f9325fd9160f2092a23768
    }
    
}
export const postEditVideo = async(req, res) => {
<<<<<<< HEAD
    const { 
        body : { title, description },
        params: { id } } = req;
    try{
        await Video.findOneAndUpdate({_id: id},{title,description});
        res.redirect(routes.videoDetail(id));
    }catch(error){
        console.log(error);
=======
    const {
        params: {id},
        body : {title,description}} = req;
    try{
        await Video.findOneAndUpdate({ _id: id },{ title, description});
        res.redirect(routes.videoDetail(id));
    }catch(error){
>>>>>>> 39a6c55042833fcb80f9325fd9160f2092a23768
        res.redirect(routes.home);
    }
}


export const deleteVideo = async(req, res) => {
    const { params: {id}} = req;
    try{
        await Video.findOneAndRemove({_id:id});
    }catch(error){
    }

    res.redirect(routes.home); //비디오 삭제가 성공하던 실패하던 home으로 간다.
}
