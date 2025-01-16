import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { StudentModel } from "../db/index.js";
import { authenticatUser } from "../middlewares/authentication.js";
import { where } from "sequelize";

//create student
const RegisterStudent = asyncHandler(async(req,res) => {

    //if body is not have empty 
    if (!req.body || Object.keys(req.body).length === 0) {
        throw new ApiError(400, "Request body cannot be empty");
    }
    
    


    const { name, email, dob, branch, semester, photo } = req.body;
    console.log(`.....................${email}`);

    if([ name, email, dob, branch, semester, photo ].some((feild) => !feild?.trim() ==="")) {
        throw new ApiError(400, "All feild are required");
    }

    //check student is allready exist or not
    const studentIsExist = await StudentModel.findOne({
        where: {
            email:email
        }
    })

    //console.log(`/////////////${studentIsExist}`)
    if(studentIsExist) {
        throw new ApiError(401, "student is allready exist")
    }

    const student = await StudentModel.create({
        name:name, 
        email:email,
        dob:dob,
        branch:branch,
        semester:semester,
        photo:photo
    });

    //console.log(`,,,,,,,,,,,,,,,,,,,,,${student}`)

    //check student is created or not
    const createdStudent = await StudentModel.findOne({
        where:{email:email}
    });

    if(!createdStudent) {
        throw new ApiError(401, "somthing went wrong, student is not created");
    }

    //send the responce about student
    return res.status(200).json(
        new ApiResponse(200, 'student are save successfully')
    )
})


//update student row

const UpdateStudent = asyncHandler(async(req,res) => {
    const emailFormBody = JSON.stringify(req.params);
    // checking request body if not empty
    if (!req.body || Object.keys(req.body).length === 0) {
        throw new ApiError(400, "Request body cannot be empty");
    }

    const {name, email, dob, branch , semester, photo } = req.body;
    if(!name && !email && !dob && !branch && !semester && !photo ) {
        throw new ApiError(409, "all feild are empty, Its required some data");
    }

    const student = StudentModel.findOne({
        where:{
            email:emailFormBody
        }
    });

    if(name) {
        student.name = name
    }
    if(email) {
        const checkEmail = StudentModel.findOne({
            where:{email:email}
        })
        if(checkEmail) {
            student.email = email;
        }
    }

    if(dob) {
        student.dob = dob
    }

    if(branch) {
        student.branch = branch
    }

    if(semester) {
        student.semester = semester
    }

    if(photo) {
        student.photo = photo
    }

    await student.save()

    res.status(200).json(
        ApiResponse(200, 'student is updated successfully')
    )
})



//delete student row

const DeleteStudent = asyncHandler(async(req, res) => {
    const emailFormBody = JSON.stringify(req.params);
    if(!emailFormBody) {
        throw new ApiError(404, 'user not found');
    }

    const student = UserModel.findOne({
        where:{email:emailFormBody}
    })

    if(!student) {
        throw new ApiError(409, 'user not found')
    }

    //delete the student
    await student.destroy();

    return res.status(200).json(
        new ApiResponse(200, 'student are deleted successfully')
    )


})



// get all student

const GetAllStudent = asyncHandler(async(req, res) => {
    const allStudent = await StudentModel.findAll();

    if(!allStudent) {
        throw new ApiError(404, 'Not found the Student')
    }


    res.statusa(200).json(
        ApiResponse(200, 'search all user successfully',{student})
    )
})

//filter by branch

const NameAndSemesterWiseStudent = asyncHandler((req,res) => {
    const { name, semester } = req.body;

    if( !name && !semester ) {
        throw new ApiError(409,'At least one filter is need')
    }

    //for getting filter student by branch 
    if(name) {
        const students = StudentModel.findAll({
            where:{name:name}
            // limit:10, //limit to display 10 user
            // offset:0, //start at first result
        })

        if(!students) {
            throw new ApiError(404, `not have the student in ${name} name`, {students})
        }
        res.status(200).json(
            ApiResponse(200, `This is all student is getting name: ${name}`, {students} )
        )
    }


    
    //for getting filter student by semster 
    if(semester) {
        const students = StudentModel.findAll({
            where:{semester:semester}
            // limit:10, //limit to display 10 user
            // offset:0, //start at first result
        })

        if(!students) {
            throw new ApiError(404, `not have the student in ${semester}th semester`)
        }
        res.status(200).json(
            ApiResponse(200, `This is all student is getting ${semester}th semester` )
        )
    }

})

export { RegisterStudent, UpdateStudent, DeleteStudent, GetAllStudent, NameAndSemesterWiseStudent };
