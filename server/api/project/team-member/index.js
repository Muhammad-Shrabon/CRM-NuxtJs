import connectDB from "~/server/middleware/mongo"
import TeamMember  from "~/server/models/TeamMember";  

export default defineEventHandler( async (e) => {
    await connectDB();

    const reqMethod = e.req.method.toLowerCase();
    const query = getQuery(e);

    switch (reqMethod) {
        
        // ----------------------------------------------------
        // 2. CREATE (POST) - /api/team_members
        // ----------------------------------------------------
        
        case 'post':
            try {
                const readData = await readBody(e);

                if (!readData.projectID || !readData.freelancerID || !readData.members || readData.members.length === 0) {
                     e.res.statusCode = 400;
                     return { 
                        statusCode: 400, 
                        body: { error: 'Missing required fields (projectID, freelancerID, or members list).' } 
                    };
                }

                const response = await TeamMember.create(readData);

                e.res.statusCode = 201;  
                return { 
                    statusCode: 201, 
                    body: response 
                };
            } catch (error) {
                console.error("Error creating TeamMember:", error);
                e.res.statusCode = 400; 
                return { 
                    statusCode: 400, 
                    body: { error: 'Failed to create team member due to invalid data.', details: error.message } 
                };
        }

        // ----------------------------------------------------
        // 3. READ (GET) - /api/team_members or /api/team_members?id=...
        // ----------------------------------------------------
        case 'get':
            try {
                let response;
                if (query.id) {
                    response = await TeamMember.findById(query.id).exec();
                    if (!response) {
                        e.res.statusCode = 404;
                        return { 
                            statusCode: 404, 
                            body: { error: `Team member entry with ID ${query.id} not found.` } 
                        };
                    }
                } else {
                    response = await TeamMember.find().sort({ createdAt: -1 }).exec();
                }

                e.res.statusCode = 200;
                return { 
                    statusCode: 200, 
                    body: response 
                };
            } catch (error) {
                console.error("Error reading team members:", error);
                e.res.statusCode = 500;
                return { 
                    statusCode: 500, 
                    body: { error: 'Failed to fetch team members.', details: error.message } 
                };
            }

        // ----------------------------------------------------
        // 4. UPDATE (PUT) - /api/team_members?id=...
        // ----------------------------------------------------
        case 'put':
            try {
                if (!query.id) {
                    e.res.statusCode = 400;
                    return { statusCode: 400, body: { error: 'Missing ID for update operation.' } };
                }

                const updateData = await readBody(e);
                // Use { new: true } to return the updated document
                const response = await TeamMember.findByIdAndUpdate(query.id, updateData, { new: true, runValidators: true }).exec();

                if (!response) {
                    e.res.statusCode = 404;
                    return { statusCode: 404, body: { error: `Team member entry with ID ${query.id} not found for update.` } };
                }

                e.res.statusCode = 200;
                return { 
                    statusCode: 200, 
                    body: response 
                };
            } catch (error) {
                console.error("Error updating TeamMember:", error);
                e.res.statusCode = 400;
                return { 
                    statusCode: 400, 
                    body: { error: 'Failed to update team member.', details: error.message } 
                };
            }

        // ----------------------------------------------------
        // 5. DELETE (DELETE) - /api/team_members?id=...
        // ----------------------------------------------------
        case 'delete':
            try {
                if (!query.id) {
                    e.res.statusCode = 400;
                    return { statusCode: 400, body: { error: 'Missing ID for delete operation.' } };
                }

                const response = await TeamMember.findByIdAndDelete(query.id).exec();

                if (!response) {
                    e.res.statusCode = 404;
                    return { statusCode: 404, body: { error: `Team member entry with ID ${query.id} not found for deletion.` } };
                }

                e.res.statusCode = 204; // 204 No Content - successful deletion with no body
                return { 
                    statusCode: 204, 
                    body: null 
                };
            } catch (error) {
                console.error("Error deleting TeamMember:", error);
                e.res.statusCode = 500;
                return { 
                    statusCode: 500, 
                    body: { error: 'Failed to delete team member.', details: error.message } 
                };
            }

        // ----------------------------------------------------
        // 6. Default - Method Not Allowed
        // ----------------------------------------------------
        default:
            e.res.statusCode = 405; // 405 Method Not Allowed
            return { 
                statusCode: 405, 
                body: { error: `${e.req.method} method not supported for this route.` } 
            };
    }
});