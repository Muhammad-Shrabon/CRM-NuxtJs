// File Path: server/api/User/[username].js (or .ts)

import connectDB from "~/server/middleware/mongo";
import User from "~/server/models/User"; 
import { defineEventHandler, readBody } from 'h3'; // Import necessary H3 utilities

export default defineEventHandler(async (event) => {
  // 1. Connect to the database
  try {
    await connectDB();
  } catch (dbError) {
    console.error("Database connection failed:", dbError);
    event.res.statusCode = 503; // Service Unavailable
    return {
      error: 'Database connection unavailable.',
      detail: dbError.message,
    };
  }
  
  // 2. Extract parameters
  const username = event.context.params.username;
  const reqMethod = event.req.method;

  // We only support GET requests for finding a single user
  if (reqMethod !== 'GET') {
    event.res.statusCode = 405; 
    return { 
      error: `Method ${reqMethod} not allowed for single user lookup.`
    };
  }

  // 3. Validate input
  if (!username) {
    event.res.statusCode = 400; // Bad Request
    return { 
      error: 'Username parameter is missing in the request path.'
    };
  }

  // 4. Perform the database lookup
  try {
    // Query the database for a single user document matching the username field
    const user = await User.findOne({ username: username }).lean(); // Use .lean() for faster query performance
    
    // 5. Handle Not Found (404)
    if (!user) {
      event.res.statusCode = 404; // Not Found
      return { 
        error: `User with username ${username} not found.`
      };
    }

    // 6. Success: return the user data
    // H3 automatically sets statusCode 200 on successful return
    return user; 
    
  } catch (error) {
    // 7. Handle Internal Server Errors (e.g., Mongoose validation or query failure)
    console.error(`Error fetching user by username ${username}:`, error);
    
    event.res.statusCode = 500; 
    return {
      error: 'Internal Server Error during user lookup.', 
      detail: error.message,
    };
  }
});