import { ApiError } from '../utils/apiError.js';
import { ApiResponse } from '../utils/apiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';

import  jwt  from 'jsonwebtoken';
import bcrypt from 'bcrypt';
//import { createUserModel } from '../models/userModel.js';
//import { sequelize } from '../db/index.js';
import { UserModel } from '../db/index.js';
import { where } from 'sequelize';


//let UserModel = createUserModel(sequelize);


//genrate the Access token
const generateAccessToken = async (userId) => {
  try {
    const user = await UserModel.findByPk(userId); // Correct findByPk usage
    if (!user) {
      throw new ApiError(404, "User Not Found");
    }

    const accessToken = jwt.sign(
      {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role
      },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
      }
    );

    //console.log(`????????????????????????????????${accessToken}`);
    return accessToken;

  } catch (error) {
    console.error(error);
    // Handle error here
    throw new ApiError(500, 'Something went wrong');
  }
};



//take user data from frontEnd and register
const RegisterUser = asyncHandler(async (req, res) => {
    console.log(req);

    //if body is not have empty 
    if (!req.body || Object.keys(req.body).length === 0) {
        throw new ApiError(400, "Request body cannot be empty");
    }


    const {name, email, password, role } = req.body;
    console.log(req.body);

    if([name, email, password, role].some((feild) => feild?.trim() ==="")) {
        throw new ApiError(400, "All feild are required");
    }

    //console.log({name, email, password});

    const userExist = await UserModel.findOne({
        where:{ email: email }
    });

    console.log(`this is user exist ${userExist}`);
    if(userExist) {
        throw new ApiError(409, "User is allready exist");
    }

    const newUser = await UserModel.create({
        name:name,
        email:email,
        password:password,  //password is will be hashed is autometically
        role: role
    });
    //console.log(`thus is new user ${newUser}`);

    const createdUser = await UserModel.findOne({
        where:{
            email:email
        }
    })
    console.log(`this is created user ${createdUser}`);
    if(!createdUser) {
        throw ApiError(400, "Somthing went wrong when");
    }

    return res.status(200).json(
        new ApiResponse(200, "user is created")
    );
})


//Login user

const Login = asyncHandler(async(req, res) => {
    //console.log(`..............${req.body}...................`);
    const { email, password } = req.body;

    if([email, password ].some((feild) => feild?.trim() ==="")) {
        throw new ApiError(400, "All feild are required");
    }

    if (!email || !password) {
        throw new ApiError(400, 'Email and password are required');
    }

    const user = await UserModel.findOne({
        where:{
            email:email
        }
    })

    if(!user) {
        throw new ApiError(409, "Email is not valid");
    }

    const ispasswordMatch = await bcrypt.compare(password, user.password);
    if(!ispasswordMatch) {
        throw new ApiError(400, "password is not match");
    }

    const accessToken = await generateAccessToken(user.id)
    //console.log(`....................${accessToken}`);
    const loggedInUser = {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
    };

    const options = {
        httpOnly: true,
        secure: true
    }

    return res
    .status(200)
    .cookie("accessToken", accessToken, options )
    .json(
        new ApiResponse(200, "user login successfully", { loggedInUser, accessToken} )
    )
});

// const GetUserProfile = asyncHandler(async(req, res) => {
//     res.status(200).json(req.user);
// })


const updateUserData = asyncHandler(async(req, res) => {
//const id = JSON.stringify(req.params);
//const id = parseInt(req.params.id, 10);
    const {id} = req.params;
    //const {email :emailFormParams} = JSON.stringify(req.params);
    //const {email:emailFormParams} = req.params;
    //console.log(`...............${req.params}`);   we can't access id like this in the postgress Sql , we will use this below methods
    //console.log(`...666666.....${emailFormBody}`);

    const {name, email, password, role} = req.body;
    console.log(id);

    //check feild is update or not
    if(!name && !email && !password && !role) {
        throw new ApiError(400, 'At least one feild is required to update');
    };

    //check user is exist or not
    const user = await UserModel.findByPk(id)
    //console.log(`..........${user}`);
    if(!user) {
        throw new ApiError(404, 'user not found');
    }

    //update the feild 
    if(name) {
        user.name = name;
    } 
    if(password) {
        user.password = password;
    } 
    if(role) {
        user.role = role;
    }
    if(email) {
        const emailChangeRequest = await UserModel.findOne({
            where: {
                email: email
            }
        })

        if(emailChangeRequest) {
            user.email = email
        }
    }
    await user.save();
    
    res.status(200).json(
        new ApiResponse(200, 'user update successfully')
    )
})



//logout user

const logoutUser = asyncHandler((req, res) => {
    //

})







export {RegisterUser, Login, updateUserData };