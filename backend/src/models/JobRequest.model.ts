import mongoose, { Document, Schema } from "mongoose";

// Define the JobStatus type
export type JobStatus = "Open" | "In Progress" | "Closed";

// Job Request interface
export interface IJobRequest extends Document {
  title: string;
  description: string;
  category: string;
  location: string;
  contactName: string;
  contactEmail: string;
  status: JobStatus;
  createdAt: Date;
}

// Create the JobRequest schema
const JobRequestSchema = new Schema<IJobRequest>(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      maxlength: [100, "Title cannot exceed 100 characters"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
    },
    category: {
      type: String,
      enum: ["Plumbing", "Electrical", "Painting", "Joinery", "Other"],
      default: "Other",
    },
    location: {
      type: String,
      trim: true,
    },
    contactName: {
      type: String,
      trim: true,
    },
    contactEmail: {
      type: String,
      trim: true,
      lowercase: true,
      match: [
        /^\S+@\S+\.\S+$/,
        "Please provide a valid email address",
      ],
    },
    status: {
      type: String,
      enum: ["Open", "In Progress", "Closed"],
      default: "Open",
    },
  },
  {
    timestamps: true, 
  }
);

const JobRequest = mongoose.model<IJobRequest>("JobRequest", JobRequestSchema);
export default JobRequest;