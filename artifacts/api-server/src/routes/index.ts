import { Router, type IRouter } from "express";
import healthRouter from "./health";
import authRouter from "./auth";
import horsesRouter from "./horses";
import ridersRouter from "./riders";
import sessionsRouter from "./sessions";
import attendanceRouter from "./attendance";
import dashboardRouter from "./dashboard";

const router: IRouter = Router();

router.use(healthRouter);
router.use(authRouter);
router.use(horsesRouter);
router.use(ridersRouter);
router.use(sessionsRouter);
router.use(attendanceRouter);
router.use(dashboardRouter);

export default router;
