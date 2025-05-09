import { Router } from "express";
import { TestController } from "../controllers/test.controller";
import userRoute from "./user.routes";
import { jwtCheckToken } from "../middlewares/jwt_check_token";
import { isRole } from "../middlewares/is_role";
import authRouter from "./auth.routes";

const apiRouter = Router()

apiRouter.use("/test", TestController)
apiRouter.use("/users", jwtCheckToken, isRole(["super_admin"]), userRoute)
apiRouter.use("/auth", authRouter)
export default apiRouter