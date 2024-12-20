import mongoose, { Schema, Document as MongooseDocument } from "mongoose";

// Define the interface for the document
export interface IDocument extends MongooseDocument {
  filename: string;
  content: string;
  createdAt: Date;
}

// Create the schema
const documentSchema = new Schema<IDocument>({
  filename: {
    type: String,
    required: true,
    trim: true,
  },
  content: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Create and export the model
export const Document = mongoose.model<IDocument>("Document", documentSchema);
