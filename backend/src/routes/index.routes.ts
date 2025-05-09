import { Router } from "express";
import { TestController } from "../controllers/test.controller";

const apiRouter = Router()

apiRouter.use("/test", TestController)

export default apiRouter