import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: String,
  lastname: String,
  email: String,
  password: Number,
});

const Users = mongoose.models.Users || mongoose.model("Users", UserSchema);

export default Users;
