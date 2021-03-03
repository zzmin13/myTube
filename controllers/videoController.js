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

export const videoDetail = (req, res) => res.render("videoDetail", {pageTitle: "Video Detail"});

export const editVideo = (req, res) => res.render("editVideo", {pageTitle: "Edit Video"});

export const deleteVideo = (req, res) => res.render("deleteVideo", {pageTitle: "Delete Video"});
