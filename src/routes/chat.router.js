import express from "express";
import { chatController } from "../controllers/chats.controller.js";

export const chatRouter = express.Router();

chatRouter.get("/", chatController.renderChatView);