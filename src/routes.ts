import { Router } from "express";

import { CreateUserController } from "./controllers/CreateUserController";
import { CreateTagController } from "./controllers/CreateTagController";
import { CreateComplimentController } from "./controllers/CreateComplimentController";

import { AuthUserController } from "./controllers/AuthUserController";

import { ListUserController } from "./controllers/ListUserController";
import { ListTagController } from "./controllers/ListTagController";
import { ListUserSendComplimentsController } from "./controllers/ListUserSendComplimentsController";
import { ListUserReceiveComplimentsController } from "./controllers/ListUserReceiveComplimentsController";

import { ensureAuth } from "./middlewares/ensureAuth";
import { ensureAdmin } from "./middlewares/ensureAdmin";

const router = Router();

const createUserController = new CreateUserController();
const createTagController = new CreateTagController();
const createComplimentController = new CreateComplimentController();

const authUserController = new AuthUserController(); 

const listUserController = new ListUserController();
const listTagController = new ListTagController();
const listUserSendComplimentController = new ListUserSendComplimentsController();
const listUserReceiveComplimentController = new ListUserReceiveComplimentsController();

router.post("/login", authUserController.handle);
router.post("/users", createUserController.handle);
router.post("/tags", ensureAuth, ensureAdmin, createTagController.handle);
router.post("/compliments", ensureAuth, createComplimentController.handle);

router.get("/users", ensureAuth, listUserController.handle);
router.get("/tags", ensureAuth, listTagController.handle);
router.get("/users/compliments/send", ensureAuth, listUserSendComplimentController.handle);
router.get("/users/compliments/receive", ensureAuth, listUserReceiveComplimentController.handle);

export { router };