import mongoose from "mongoose";

const DepartmentSchema = new mongoose.Schema({
  name: {
    type: String,
  },
});

export default mongoose.model("Department", DepartmentSchema);
