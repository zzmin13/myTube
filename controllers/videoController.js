export const home = (req, res) => res.render("home", {pageTitle: "Home"});

export const search = (req, res) => {
    const {query: { term: searchingBy }} = req; // const searchingBy = req.query.term 과 같은 코드
    res.render("search", {pageTitle: "Search", searchingBy}); // searchingBy = searchingBy 인 경우 하나로 줄여쓸 수 있음

}

export const videos = (req, res) => res.render("videos", {pageTitle: "Videos"});

export const upload = (req, res) => res.render("upload", {pageTitle: "Upload"});

export const videoDetail = (req, res) => res.render("videoDetail", {pageTitle: "Video Detail"});

export const editVideo = (req, res) => res.render("editVideo", {pageTitle: "Edit Video"});

export const deleteVideo = (req, res) => res.render("deleteVideo", {pageTitle: "Delete Video"});
