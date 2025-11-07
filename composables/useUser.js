// /composables/useUsers.js
export const useUsers = () => {
  const client = ref(null)
  const freelancer = ref(null)
  const loading = ref(false)
  const error = ref(null)

  const fetchUsers = async ({ freelancerId, clientUsername }) => {
    try {
      loading.value = true
      error.value = null

      const [freelancerData, clientData] = await Promise.all([
        freelancerId ? $fetch('/api/auth/get/', { query: { id: freelancerId } }) : null,
        clientUsername ? $fetch('/api/auth/get/', { query: { username: clientUsername } }) : null
      ])

      freelancer.value = freelancerData
      client.value = clientData
    } catch (err) {
      console.error('Error fetching users:', err)
      error.value = err
    } finally {
      loading.value = false
    }
  }

  return { client, freelancer, loading, error, fetchUsers }
}
