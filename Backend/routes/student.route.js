import { RegisterStudent, UpdateStudent, DeleteStudent, GetAllStudent, NameAndSemesterWiseStudent } from "../controllers/student.contoller.js";
import  {Router}  from "express";
import { authenticatUser } from "../middlewares/authentication.js";

const router = Router();
router.use(authenticatUser);

router.post('/registerStudent', RegisterStudent);
router.put('/updateStudent/:id', UpdateStudent);
router.delete('/deleteStudent/:id', DeleteStudent);
router.get('/Student', GetAllStudent);
router.post('/filterdStudent', NameAndSemesterWiseStudent);


export default router;