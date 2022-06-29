import mongoose from "mongoose";

const VALID_EMAIL_RE =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate(email: string) {
      return VALID_EMAIL_RE.test(email);
    },
  },
  departmentId: {
    type: mongoose.Types.ObjectId,
    ref: "Department",
    required: true,
  },
});

export default mongoose.model("User", UserSchema);
