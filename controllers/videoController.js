import routes from '../routes';
import Video from "../models/Video";

export const home = async(req, res) => {
    try{
        const videos = await Video.find({}).sort({_id: -1}).populate("creator");
        res.render("home", {pageTitle: "Home", videos});
    }catch(error){
        console.log(error);
        res.render("home", {pageTitle: "Home", videos :[]});
    }
        
};
    

export const search = async(req, res) => {
    const {query: { term: searchingBy }} = req;
    let videos = [];
    try{
        videos = await Video.find({title: {$regex: searchingBy, $options: "i"}}).populate("creator");
    }catch(error){
        console.log(error);
    }
    res.render("search", {pageTitle: "Search", searchingBy, videos}); 

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
        description,
        creator: req.user.id
    });
    req.user.videos.push(newVideo.id);
    req.user.save();
    res.redirect(routes.videoDetail(newVideo.id));
};

export const videoDetail = async(req, res) => {
    const { params: {id}} = req;
    try{
        const video = await Video.findById(id).populate("creator");
        console.log(video);
        res.render("videoDetail", {pageTitle: video.title, video});
    }catch(error){
        console.log(error);
        res.redirect(routes.home);
    }
};

export const getEditVideo = async(req, res) => {
    const {params: {id}} = req;
    try{
        const video = await Video.findById(id);
        if(video.creator != req.user.id){
            throw Error();
        }else{
            res.render("editVideo", {pageTitle: `Edit ${video.title}`, video});
        }
    }catch(error){
        console.log(error);
        res.redirect(routes.home);
    }
}

export const postEditVideo = async(req, res) => {
    const {
        params: {id},
        body : {title,description}} = req;
    try{
        await Video.findOneAndUpdate({ _id: id },{ title, description});
        res.redirect(routes.videoDetail(id));
    }catch(error){
        res.redirect(routes.home);
    }
}


export const deleteVideo = async(req, res) => {
    const { params: {id}} = req;
    try{
        const video = await Video.findById({id});
        if(video.creator !== req.user.id){
            throw Error();
        }else{
            await Video.findOneAndRemove({_id:id});
        }
    }catch(error){
        console.log(error);
    }
    res.redirect(routes.home); //비디오 삭제가 성공하던 실패하던 home으로 간다.
};

export const postRegisterView = async(req, res) => {
    const { params : {id} } = req;
    try{
        const video = await Video.findById(id);
        video.views += 1;
        video.save();
        res.status(200) // Okay
        
    }catch(error){
        res.status(400); // 잘못된 요청
        
    }finally{
        res.end();

    }
}