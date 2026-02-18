import mongoose from "mongoose";
import bcrypt from "bcrypt"; // ya 'bcrypt', dono me se koi use kar sakte ho

const { Schema, model } = mongoose;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true, 
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

// 🔹 Pre-save hook to hash password before saving
userSchema.pre("save", async function (next) {
  const user = this;

  // Only hash if password is new or modified
  if (!user.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(user.password, salt);
    user.password = hashedPassword;
    next();
  } catch (err) {
    next(err);
  }
});

// 🔹 Optional: method to compare password during login
userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

const User = model("User", userSchema);

export default User;
