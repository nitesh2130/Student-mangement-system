import { RegisterStudent, UpdateStudent, DeleteStudent, GetAllStudent, NameAndSemesterWiseStudent } from "../controllers/student.contoller.js";
import  {Router}  from "express";
import { authenticatUser } from "../middlewares/authentication.js";
import { updateUserData } from "../controllers/user.Controller.js";

const router = Router();
router.use(authenticatUser);

router.post('/registerStudent', RegisterStudent);
router.put('/updateStudent', UpdateStudent);
router.delete('/deleteStudent', DeleteStudent);
router.get('/Student', GetAllStudent);
router.get('/filterdStudent', NameAndSemesterWiseStudent);


export default router;