import mongoose from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";

const UserSchema = new mongoose.Schema({
    name : String,
    email : String,
    avatarUrl : String,
    kakaoId : Number,
    githubId: Number,
    videos: [
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Video"
        }
    ],
    comment : [
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment"
        }
    ]
});

UserSchema.plugin(passportLocalMongoose, { usernameField: 'email' });

const model = mongoose.model("User", UserSchema);
export default model;