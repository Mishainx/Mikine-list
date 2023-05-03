import mongoose from "mongoose";

const usersCollection = "users";

const usersSchema = new mongoose.Schema({
  email: {
    type: String,
    unique:true,
    index: true
  },
  password: String
});

const usersModel = mongoose.model(usersCollection, usersSchema);

export default usersModel;