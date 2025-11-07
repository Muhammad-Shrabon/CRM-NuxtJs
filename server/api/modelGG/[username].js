import connectDB from "~/server/middleware/mongo";
import Project from "~/server/models/Project";
import User from "~/server/models/User"; // corrected import

export default defineEventHandler(async (event) => {
  await connectDB();

  const { model, username } = event.context.params;
  const models = { User, Project };
  const query_model = models[model];

  if (!model) {
    return { error: "Invalid model name" };
  }

  const method = event.req.method;

  if (method === "GET") {
    try {
      const data = await query_model.findOne({ username });
      if (!data) return { error: "User not found" };
      return data;
    } catch (error) {
      console.error("DB Error:", error);
      return { error: "GET failed", detail: error.message };
    }
  }

  if (method === "PUT") {
    const body = await readBody(event);
    const { id } = body;
    try {
      const updated = await query_model.findByIdAndUpdate(id, body, { new: true });
      return updated;
    } catch (error) {
      return { error: "PUT failed", detail: error.message };
    }
  }

  if (method === "POST") {
    try {
      const body = await readBody(event);
      const created = await query_model.create(body);
      return created;
    } catch (error) {
      return { error: "POST failed", detail: error.message };
    }
  }

  return { error: "Invalid request method" };
});
