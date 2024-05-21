import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: [3, "Name must contain at least 3 character!"],
    maxLength: [32, "Name cannot exceed 32 character!"],
  },
  email: {
    type: String,
    required: true,
    validate: [validator.isEmail, "Please provide a valid email!"],
  },
  phone: {
    type: Number,
    required: true,
  },
  avatar: {
    public_id: {
      type: String,
    },
    url: {
      type: String,
    },
  },
  education: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
    enum: ["Reader", "Author"],
  },
  password: {
    type: String,
    required: true,
    minLength: [8, "Password must contain at least 8 character!"],
    maxLength: [32, "Password cannot exceed 32 character!"],
    select : false,
  },
  createdOn: {
    type: Date,
    default: Date.now,
  },
});

userSchema.pre("save",async function(){
  if(!this.isModified("password")){
    next()
  }
  this.password = await bcrypt.hash(this.password,10)
});


userSchema.methods.comparePassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};
export const User = mongoose.model("User", userSchema);
