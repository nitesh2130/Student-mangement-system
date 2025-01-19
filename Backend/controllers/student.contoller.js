import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { StudentModel } from "../db/index.js";
import { authenticatUser } from "../middlewares/authentication.js";
import { where } from "sequelize";
import {Op} from "sequelize";


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
    const {id} = req.params
    // checking request body if not empty
    if (!req.body || Object.keys(req.body).length === 0) {
        throw new ApiError(400, "Request body cannot be empty");
    }

    const {name, email, dob, branch , semester, photo } = req.body;
    if(!name && !email && !dob && !branch && !semester && !photo ) {
        throw new ApiError(409, "all feild are empty, Its required some data");
    }

    const student = await StudentModel.findByPk(id);
    if(!student) {
        throw new ApiError(404, 'student is not found')
    }

    if(name) {
        student.name = name
    }
    if(email) {
        const checkEmail = await StudentModel.findOne({
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

    console.log(`...............................................${student.name}`)
    console.log(student.name)

    await student.save();
    // const studentData = await student.save();
    // console.log(`--------------------- ${studentData}`)
    res.status(200).json(
        new ApiResponse(200, 'student is updated successfully')
    )
})



//delete student row

const DeleteStudent = asyncHandler(async(req, res) => {
    const {id} = req.params;
    console.log(`.........${id}`)
    if(!id) {
        throw new ApiError(404, 'user not found');
    }

    const student = await StudentModel.findByPk(id);
    if(!student) {
        throw new ApiError(404, 'user not found');
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


    res.status(200).json(
        new ApiResponse(200, 'search all user successfully',{allStudent})
    )
})

//filter by branch


const NameAndSemesterWiseStudent = asyncHandler(async (req, res) => {
  const { name, semester } = req.body;

  if ((!name || !name.trim()) && (!semester || !semester.trim())) {
    throw new ApiError(409, "At least one filter is required.");
  }

  const whereCondition = {};
  if (name && name.trim()) {
    whereCondition.name = { [Op.iLike]: `%${name.trim()}%` };
  }
  if (semester && semester.trim()) {
    whereCondition.semester = Number(semester.trim()); // Ensure numeric type
  }

  try {
    const students = await StudentModel.findAll({ where: whereCondition });
    if (!students || students.length === 0) {
      throw new ApiError(404, "No students found for the given filter.");
    }

    res.status(200).json(
      new ApiResponse(200, "Filtered students retrieved successfully.", {
        students,
      })
    );
  } catch (error) {
    console.error("Error retrieving students:", error.message);
    throw new ApiError(500, "An error occurred while retrieving students.");
  }
});




export { RegisterStudent, UpdateStudent, DeleteStudent, GetAllStudent, NameAndSemesterWiseStudent };
