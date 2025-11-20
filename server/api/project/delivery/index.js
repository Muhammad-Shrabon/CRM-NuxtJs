import mongoose from 'mongoose';
import connectDB from "~/server/middleware/mongo";
import Delivery from "~/server/models/Delivery";
import { writeFileSync, mkdirSync } from "fs";
import { join } from "path";
import { createError } from "h3";

export default defineEventHandler(async (event) => {
  await connectDB();

  const form = await readMultipartFormData(event);
  if (!form?.length) throw createError({ statusCode: 400, statusMessage: "No form data received" });

  const projectID = form.find(f => f.name === "projectID")?.data?.toString();
  const freelancerID = form.find(f => f.name === "freelancerID")?.data?.toString();

  if (!projectID || !freelancerID) {
    throw createError({ statusCode: 400, statusMessage: "projectID and freelancerID are required" });
  }

  // Validate ObjectIds
  if (!mongoose.Types.ObjectId.isValid(projectID)) {
    throw createError({ statusCode: 400, statusMessage: "Invalid projectID" });
  }
  if (!mongoose.Types.ObjectId.isValid(freelancerID)) {
    throw createError({ statusCode: 400, statusMessage: "Invalid freelancerID" });
  }

  const uploadedFiles = form.filter(f => f.name === "files" && f.filename);
  if (!uploadedFiles.length) {
    throw createError({ statusCode: 400, statusMessage: "No files uploaded" });
  }

  const uploadDir = join(process.cwd(), "public", "uploads");
  mkdirSync(uploadDir, { recursive: true });

  const filePaths = [];
  for (const file of uploadedFiles) {
    const fileName = `${Date.now()}_${file.filename}`;
    const filePath = join(uploadDir, fileName);
    writeFileSync(filePath, file.data);
    filePaths.push(`/uploads/${fileName}`);
  }

  const delivery = await Delivery.create({
    projectID,
    freelancerID,
    files: filePaths,
    status:"pending",
  });

  return {
    statusCode: 200,
    message: "Files uploaded successfully",
    data: delivery
  };
});
