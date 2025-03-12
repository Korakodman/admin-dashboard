import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  id: Number,
  name: String,
  lastname: String,
  role: String,
  password: Number,
});

const Users = mongoose.models.Users || mongoose.model("Users", UserSchema);

export default Users;
