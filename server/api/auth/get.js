// /server/api/users/get.js
import connectDB from '~/server/middleware/mongo'
import User from '~/server/models/User'

export default defineEventHandler(async (event) => {
  await connectDB()
  const query = getQuery(event) // { id, username }
  let user = null

  if (query.id) {
    user = await User.findById(query.id)
  } else if (query.username) {
    user = await User.findOne({ username: query.username })
  }

  if (!user) {
    return { error: 'User not found' }
  }

  return user
})
