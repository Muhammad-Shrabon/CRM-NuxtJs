<template>
          <div class="card border border-panel-text-light/20 rounded-xl p-5">
              <Title icon="ic:round-add-task" text="Member Add Project" />
              <div class="form mt-10">
                <div class="grp mb-5 block">
                  <label for="" class="block text-lg pb-2 font-jost text-panel-text-light">Username</label>
                  <input v-model="formData.username" type="text" placeholder="ex: @sulaiamn" class="border border-panel-text-light/40 text-base p-2 font-jost focus:outline-0 text-panel-text-light rounded-lg w-full">
                </div>
                <div class="grp mb-5 block">
                  <label for="" class="block text-lg pb-2 font-jost text-panel-text-light">Username</label>
                  <select v-model="formData.role" class="border border-panel-text-light/40 text-base p-2 font-jost focus:outline-0 text-panel-text-light rounded-lg w-full" name="" id="">
                    <option value="">Select Role</option>
                    <option value="client">Client</option>
                    <option value="associateFreelancer">Associate Freelancer</option>
                    <option value="fieldFreelancer">Field Freelancer</option>
                    <option value="projectManager">Project Manager</option>
                  </select> 
                </div>
              
                <div class="btn text-end">
                  <button @click="addTeamMember"  class="border border-panel-text-light/40 cursor-pointer text-base px-2 py-1 hover:bg-panel-sub-text duration-300 transition-all font-jost text-panel-text-light rounded bg-panel-sub-dark">Add Members</button>
                </div>
              </div>
          </div>
</template>
<script setup>
import { ref } from 'vue'
import Title from '../Title.vue'

const props = defineProps({
  projectID: String,
  user: Object
})

  const { $swal } = useNuxtApp()

  const showAlert = ({value,type}) => {
    const Toast = $swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.style.zIndex = 9999999;
        toast.onmouseenter = Toast.stopTimer;
        toast.onmouseleave = Toast.resumeTimer;
      }
    });

    Toast.fire({
      icon: type,
      title: value,
    });
  };


const formData = ref({
  username: "",
  role: ""
})

const addTeamMember = async () => {
  if (!formData.value.username) {
   return showAlert({ type: 'error', value: 'Please enter a username' });
  }

  if (!formData.value.role) {
   return showAlert({ type: 'error', value: 'Please select a role' });
  }

  try {
    let userRes = null;

    try {
      userRes = await $fetch(`/api/UserSearch/${formData.value.username}`)
    } catch (e) {
     return showAlert({ type: 'error', value: 'No user found with this username!' });
    }

    const memberID = userRes?._id;
    if (!memberID) {
      return showAlert({ type: 'error', value: 'No user found with this username!' });
    }

    const payload = {
      projectID: props.projectID,
      freelancerID: props.user?._id,
      members: [{user:memberID,role:formData.value.role,assignBy:props.user?._id}],
    };

    const teamRes = await $fetch('/api/query/TeamMember', {
      method: 'POST',
      body: payload
    });

    console.log('Team member added response:', teamRes);

    return showAlert({ type: 'success', value: 'Member added successfully!' });

  } catch (err) {
    return showAlert({ type: 'error', value: 'Something went wrong while adding member' });
  }
};

 
</script>