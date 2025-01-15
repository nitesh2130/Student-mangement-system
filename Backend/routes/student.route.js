import { RegisterStudent, UpdateStudent, DeleteStudent, GetAllStudent, NameAndSemesterWiseStudent } from "../controllers/student.contoller.js";
import  {Router}  from "express";
import { authenticatUser } from "../middlewares/authentication.js";
import { updateUserData } from "../controllers/user.Controller.js";

const router = Router();
router.use(authenticatUser);

router.post('/registerStudent', RegisterStudent);
router.post('/registerStudent', UpdateStudent);
router.post('/registerStudent', DeleteStudent);
router.post('/registerStudent', GetAllStudent);
router.post('/registerStudent', NameAndSemesterWiseStudent);


export default router;