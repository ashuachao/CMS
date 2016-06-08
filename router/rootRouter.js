import userRouter from './userRouter.js';
import carRouter from './carRouter.js';
import logRouter from './logRouter.js';
import carLogRouter from './carLogRouter.js';
import adminRouter from "./adminRouter.js";
const rootRouter = {
    userRouter,
    carRouter,
    logRouter,
    carLogRouter,
    adminRouter
}
export default rootRouter;