import  jwt  from "jsonwebtoken";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { ApiError } from "../utils/apiError.js";


const authenticatUser = asyncHandler(async(req, res) => {
    const token = req.headers.authorization?.split('')[1]; //get the token to request header
    if(!token) {
        throw new ApiError(401, "Access denied. No token provided.");
    }

    try {
        const decode = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        return decode;
        
    } catch (error) {
        throw new ApiError(401, 'Invalid token');
    }
})

export {authenticatUser};




// {
//     "name": "Nitesh Sharma",
//     "email": "nitesh@gmail.com",
//     "dob": "26/03/2003",
//     "branch": "cs",
//     "semester": "5",
//     "photo": "uiui"
// }