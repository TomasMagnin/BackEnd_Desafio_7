import express from "express";     
import passport from 'passport';
import { sessionsController } from '../controllers/sessions.controller';

export const sessionsRouter = express.Router();

sessionsRouter.get('/login/github', sessionsController.renderGitHubLogin);
sessionsRouter.get('/githubcallback', sessionsController.handleGitHubCallback);
sessionsRouter.get('/show', sessionsController.renderSessionView);
sessionsRouter.get('/current', sessionsController.getCurrentUser);
