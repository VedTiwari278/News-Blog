import User from "../model/Users.js";
import ApiError from "../utils/response/ApiError.js";

export const registerUserService = async (userData) => {
  const { name, email, password } = userData;

  if (!name || !email || !password) {
    throw new ApiError(400, "All fields are required");
  }

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new ApiError(409, "User already exists");
  }

  const newUser = await User.create({
    name,
    email,
    password,
  });

  const userWithoutPassword = newUser.toObject();
  delete userWithoutPassword.password;

  return userWithoutPassword;
};


