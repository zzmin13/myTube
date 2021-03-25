import express from "express";
import passport from "passport";
import { getJoin, getLogin, getMe, githubLogin, kakaoLogin, logout, postGithubLogIn, postJoin, postKakaoLogin, postLogin } from '../controllers/userController';
import { home, search } from '../controllers/videoController';
import { onlyPrivate, onlyPublic } from '../middlewares';
import routes from "../routes";

const globalRouter = express.Router();

globalRouter.get(routes.join, onlyPublic, getJoin);
globalRouter.post(routes.join, onlyPublic, postJoin, postLogin);

globalRouter.get(routes.login, onlyPublic, getLogin);
globalRouter.post(routes.login, onlyPublic, postLogin);

globalRouter.get(routes.home, home);
globalRouter.get(routes.search, search);
globalRouter.get(routes.logout, onlyPrivate, logout);

globalRouter.get(routes.gitHub, githubLogin);
globalRouter.get(
                routes.gitHubCallback,
                passport.authenticate('github', { failureRedirect: '/login' }),
                postGithubLogIn
                );
globalRouter.get(routes.me, getMe);

globalRouter.get(routes.kakao, kakaoLogin);
globalRouter.get(
                routes.kakaoCallback,
                passport.authenticate('kakao', {failureRedirect: '/login'}),
                postKakaoLogin
                );


export default globalRouter;
