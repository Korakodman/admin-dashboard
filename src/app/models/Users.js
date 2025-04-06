import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: String,
  lastname: String,
  role: String,
  password: String,
});

const Users = mongoose.models.Users || mongoose.model("Users", UserSchema);

export default Users;
