import { asyncHandler } from "../utils/asyncHandler.js"
import {ApiError} from "../utils/ApiError.js"
import { User} from "../models/user.model.js"
import {uploadOnCloudinary} from "../utils/cloudinary.js"
import { ApiResponse}  from "../utils/ApiResponse.js"
const registerUser = asyncHandler( async (req,res)=> {
   const {fullname,username,email,password} = req.body

   if(
    [fullname,email,username,password].some((field)=>{
        return field?.trim() === ""
    })
   ){
    throw new ApiError(400 , "All Filed are required")
   }

   const existedUser = User.findOne({
    $or : [{username},{email}]
   })

   if(existedUser){
    throw new ApiError(409, " User with email or username exists")
   }

   const avatarLocalPath = req.files?.avatar[0]?.path
   const coverImageLocalPath = req.files?.coverImage[0]?.path

   if(!avatarLocalPath){

        throw new ApiError(400, "Avatar file is required")
   }

   const avatar = await uploadOnCloudinary(avatarLocalPath)
   const coverImage = await uploadOnCloudinary(coverImageLocalPath)

   if(!avatar){
            throw new ApiError(400, "Avatar file is required")

   }

   User.create({
    fullname,
    avatar: avatar.url,
    coverImage: coverImage?.url || "",
    email,
    username : username.toLowerCase()
   })

   const createdUser = await User.findById(User._id).select(
    "-password -refreshToken" 
   )
   if(!createdUser){
        throw new ApiError(500, " User with email or username exists")
   }

   return res.status(201).json(
    new ApiResponse(200,createdUser," USer registerd succesfully")
   )

})



export { registerUser }