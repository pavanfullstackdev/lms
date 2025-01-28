import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { User } from "../models/user.model.js";

const generateAccessAndRefreshTokens = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    //carefull when we are upading only one field make sure validaton false
    await user.save({ validateBeforeSave: false });

    //return both tokens
    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(500, "Access token faield!");
  }
};

const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    throw new ApiError(400, "Please provide all required details.");
  }

  const alreadyExistedUser = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (alreadyExistedUser) {
    throw new ApiError(400, "User with this details already exist.");
  }

  const user = await User.create({
    username: username.toLowerCase(),
    email,
    password,
  });

  const createdUser = await User.findById(user._id).select("-password");

  if (!createdUser) {
    throw new ApiError(500, "Somehing went wrong while creating user!");
  }
  return res
    .status(201)
    .json(new ApiResponse(200, createdUser, "User Registerd Successfully."));
});

const loginUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body; //getting data
  //check data
  if (!username && !email) {
    throw new ApiError(400, "Username or email is required!");
  }
  //find in db is exist or not
  const user = await User.findOne({ $or: [{ username }, { email }] });

  //if user not present in db
  if (!user) {
    throw new ApiError(404, "User not exist! please register.");
  }
  //if user found match the password
  const isPasswordValid = await user.isPasswordCorrect(password);

  //if pass not match
  if (!isPasswordValid) {
    throw new ApiError(401, "Credential are incorrect!");
  }

  // generate tokens if pass match and use them
  const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
    user._id
  );

  //update the user res
  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  // send in secure keys in cookeis
  const options = {
    httpOnly: true,
    secure: true,
  };
  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        {
          user: loggedInUser,
          accessToken,
          refreshToken,
        },
        "User logged in Successfully"
      )
    );
});

const logoutUser = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $set: {
        refreshToken: undefined,
      },
    },
    {
      new: true,
    }
  );

  // Set options for cookies
  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User logged out."));
});
export { registerUser, loginUser, logoutUser };
