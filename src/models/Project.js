import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  image: { type: String, required: true },
  techStack: [{ type: String }],
  liveUrl: { type: String },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.Project || mongoose.model("Project", ProjectSchema);