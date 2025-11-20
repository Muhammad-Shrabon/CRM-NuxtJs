<template>
  <div class="settings-page min-h-screen">
    <Breadcrumb current="Project Management" />
 

    <div class="grid grid-cols-12 gap-6 mt-4 bg-panel-dark p-5 rounded-md">
      <section
        class="border-panel-sub-text/20 col-span-6 border dark:bg-panel-dark rounded-xl p-6 shadow-md"
      >
        <h2 class="text-xl border-b border-brdr/20 pb-2 text-panel-text-light font-semibold mb-10"><Icon icon="material-symbols-light:add-chart-outline" class="text-3xl inline-block"/> Create Project</h2>

        <div class="flex gap-10 w-full">
          <div class="flex flex-col gap-2">
            <div class="flex gap-5">
              <div class="w-1/4">
                  <label class="text-sm font-medium text-panel-text-light mb-3">Project Code</label>
                  <input type="text" readonly class="input_style mt-2" v-model="form.projectCode" placeholder="Auto-generated " />
                   <p class="text-panel-sub-text/70 text-xs "> (Auto-Generated)</p>
              </div>
              <div class="w-3/4">
                  <label class="text-sm font-medium text-panel-text-light mb-3">  Project Title</label>
                  <input type="text" class="input_style mt-2" v-model="form.projectTitle" placeholder="Enter project title" />
              </div>
            </div>
            <div class="grp">
              <label class="text-sm font-medium text-panel-text-light mb-3">Description</label>
              <textarea rows="3" class="input_style mt-2" v-model="form.description" placeholder="Describe the project" />
            </div>
          
            <div class="flex gap-5">
              <div class="w-2/4">
                <label class="text-sm font-medium text-panel-text-light mb-3">Industry</label>
                <select class="input_style mt-2" v-model="form.industry">
                  <option value="">Select industry</option>
                  <option>IT</option>
                  <option>Legal</option>
                  <option>Construction</option>
                  <option>Marketing</option>
                  <option>Other</option>
                </select>
              </div>
              <div class="w-2/4">
                    <label class="text-sm font-medium text-panel-text-light mb-3">Project Status</label>
                    <select class="input_style mt-2" v-model="form.status">
                      <option value="draft">Draft</option>
                      <option value="active">Active</option>
                      <option value="completed">Completed</option>
                      <option value="onhold">On Hold</option>
                    </select>
              </div>
             
            </div>
            <div class="flex gap-5">
              <div class="w-2/4">
                  <label class="text-sm font-medium text-panel-text-light PB-1">Project Manager</label>
                  <input type="text" class="input_style mt-2" v-model="form.projectManager" placeholder="Team Manager's @username" />
              </div>
               <div class="w-2/4">
                    <div class="relative">
                    <label class="text-sm font-medium text-panel-text-light mb-3">Client Username</label>
                    <input 
                      type="text" 
                      class="input_style mt-2"   
                      v-model="form.clientUsername"
                      @change="selectClient"  
                      placeholder="Client's @username (Press Enter/blur to verify)" 
                    />
                    
                    <div v-if="clientData" class="flex items-center gap-3 text-sm mt-2 p-2 bg-panel-sub-text/10 rounded">
                      <img 
                        :src="clientData.profile || '/default-avatar.png'" 
                        alt="Client Profile" 
                        class="w-8 h-8 rounded-full object-cover border border-brdr"
                      />
                      
                      <div>
                          <p class="text-panel-text-light font-medium leading-none">{{ clientData.fullName }}</p>
                          <p class="text-panel-sub-text/70 text-xs leading-none">{{ clientData.username }}</p>
                      </div>
                    </div>
                    </div>
              </div>
            </div>

  



            <!-- <div class="relative">
              <label class="text-sm font-medium text-panel-text-light mb-3">Client Username</label>
              <input 
                type="text" 
                class="input_style mt-2"   
                v-model="form.clientUsername"
                @change="selectClient"  
                placeholder="Client's @username (Press Enter/blur to verify)" 
              />
              <p v-if="form.clientUsername" class="text-panel-sub-text/70 text-xs mt-1">
                Selected: **{{ form.clientUsername }}**
              </p>
            </div> -->
            
   
            <div class="grp">
              <label class="text-sm font-medium text-panel-text-light mb-3">Assigned Team</label>
              <div class="flex gap-2">
                <input 
                  type="text" 
                  class="input_style flex-grow" 
                  v-model="currentAssignedUsername" 
                  @keyup.enter="searchAndAddTeamMember" 
                  placeholder="type: @username and press Enter" 
                />
                <!-- <button 
                  type="button" 
                  @click="searchAndAddTeamMember" 
                  class="text-sm px-3 bg-panel-sub-text/20 rounded-md hover:bg-panel-sub-text/30 transition duration-150"
                >
                  Add
                </button> -->
              </div>
            </div>
            <div class="grp">
              <p class="text-panel-sub-text/70 text-xs -mt-3 mb-2">
                  Currently assigned: {{ assignedTeamMembers.length }} member(s)
              </p>
              <div class="flex flex-wrap gap-2">
                <div
                  v-for="member in assignedTeamMembers"
                  :key="member.username"
                  class="flex items-center bg-brdr/50 rounded-full pr-1.5 pl-3 py-1 text-xs text-panel-text-light shadow-sm"
                >
                  <img 
                    :src="member.profile || '/default-avatar.png'" 
                    alt="Profile" 
                    class="w-4 h-4 rounded-full mr-1 object-cover"
                  />
                  {{ member.username }}
                  <button 
                    type="button" 
                    @click="removeTeamMember(member.username)" 
                    class="ml-1 text-panel-sub-text hover:text-red-500 transition duration-150"
                  >
                    <Icon icon="ic:round-close" class="text-sm" />
                  </button>
                </div>
                
                <input type="hidden" v-model="form.assignedTeam" />
              </div>
            </div>
            
            <!-- <label class="text-sm font-medium text-panel-text-light mb-3">Assigned Team</label>
            <input type="text" class="input_style mt-2" v-model="form.assignedTeam" placeholder="Comma-separated Username" /> -->
            <div class="flex gap-2">
              <div class="w-2/4">
                <label class="text-sm font-medium text-panel-text-light mb-3">Start Date</label>
                <input type="date" class="input_style mt-2" v-model="form.startDate" />
              </div>
              <div class="w-2/4">
                <label class="text-sm font-medium text-panel-text-light mb-3">Due Date</label>
                <input type="date" class="input_style mt-2" v-model="form.dueDate" />
              </div>
            </div>
            <div class="flex gap-2">
              <div class="w-2/4">
                <label class="text-sm font-medium text-panel-text-light mb-3">Currency</label>
                <select class="input_style mt-2" v-model="form.currency">
                  <option value="USD">USD</option>
                  <option value="EUR">EUR</option>
                  <option value="BDT">BDT</option>
                </select>
              </div>
              <div class="w-2/4">
                    <label class="text-sm font-medium text-panel-text-light mb-3">Budget Amount</label>
                    <input type="number" class="input_style mt-2" v-model="form.budgetAmount" placeholder="e.g. 5000" />
              </div>
            </div>
            <div class="flex gap-2">
              <div class="w-1/4">
                  <label class="text-sm font-medium text-panel-text-light mb-3">Billing Type</label>
                  <select class="input_style mt-2" v-model="form.billingType">
                    <option value="fixed">Fixed</option>
                    <option value="hourly">Hourly</option>
                    <option value="milestone">Milestone</option>
                  </select>
              </div>
              <div class="w-1/4">
                <label class="text-sm font-medium text-panel-text-light mb-3">Hourly Rate</label>
                <input type="number" class="input_style mt-2" v-model="form.hourlyRate" placeholder="Rate per hour" />
              </div>
              <div class="w-1/4">
                      <label class="text-sm font-medium text-panel-text-light mb-3">Timezone</label>
                      <input type="text" class="input_style mt-2" v-model="form.timezone" placeholder="e.g., Asia/Dhaka" />
              </div>
              <div class="w-1/4">
                  <label class="text-sm font-medium text-panel-text-light mb-3">Preferred Language</label>
                  <select class="input_style mt-2" v-model="form.language">
                    <option value="en">English</option>
                    <option value="bn">Bangla</option>
                  </select>
              </div>
            </div>
            <div class="grp">
              <label class="text-sm font-medium text-panel-text-light mb-3">Attach Files</label>
              <input type="file" multiple class="input_style mt-2" @change="onP_FileChange" /> 
            </div>
            <div class="grp">
              <label class="text-sm font-medium text-panel-text-light mb-3">Internal Notes</label>
              <textarea rows="2" class="input_style mt-2" v-model="form.internalNotes" placeholder="Private notes for team" />
            </div>
           
          </div>

  
        </div>

        <button
          @click="createProject"
          class="text-sm bg-panel-sub-text py-1 px-4 font-medium rounded-sm border border-brdr text-panel-text-light font-jost cursor-pointer mt-5">
          Save Changes
        </button>
       
      </section>
    </div>
  </div>
</template>
<script setup>
  definePageMeta({
    layout: 'admin',
    middleware: 'auth',
  })
  import { Icon } from '@iconify/vue';
  import { ref, computed, onMounted } from 'vue'
  import Breadcrumb from '~/components/panel/Breadcrumb.vue'
  import { useAuthStore } from '~/store/auth'
  import { useRouter } from 'vue-router';
  import { useNuxtApp } from 'nuxt/app';
  import 'sweetalert2/dist/sweetalert2.min.css'


  const uploadedFilesData = ref([]); 
  const selectedFiles = ref([]);
  const cloudName = 'dcgo8awuf';
  const unsignedPreset = 'ml_default';

  const onP_FileChange = (e) => {
    selectedFiles.value = Array.from(e.target.files);
    console.log('e file : ', e.target.files)
    console.log('user id & freelancer id: ', user.value?._id, )
  }

  const projectFileUpload = async() => {
    if (selectedFiles.value.length === 0) {
      console.log('No files selected for upload.');
      return []; // Return an empty array if no files
    }

    const results = [];
    let uploadSuccess = true;

    for (const file of selectedFiles.value) {
      const fileData = new FormData();
      fileData.append('file', file);
      fileData.append('upload_preset', unsignedPreset);

      // Determine resource type based on MIME type
      let resourceType = 'image';
      if (file.type.startsWith('video')) {
        resourceType = 'video';
      } else if (file.type === 'application/pdf') {
        resourceType = 'raw';
      }
      
      const uploadURL = `https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`;

      try {
        const response = await fetch(uploadURL, {
          method: 'POST',
          body: fileData,
        });

        if (!response.ok) {
          const errorData = await response.json();
          console.error(`Upload failed for ${file.name}:`, response.status, errorData);
          uploadSuccess = false;
          showAlert({ type: 'error', value: `File upload failed for ${file.name}.` });
          // Optionally, throw an error or break the loop if one file failure means project submission stops
          continue; 
        }

        const data = await response.json();
        console.log(`Cloudinary data for ${file.name}:`, data);
        
        // 🎯 COLLECT NECESSARY DATA FOR DATABASE STORAGE
        results.push({
          fileName: file.name, // Original file name
          url: data.secure_url, // Secure URL from Cloudinary
          publicId: data.public_id, // Cloudinary Public ID
          resourceType: data.resource_type, // Type (image, video, raw)
          size: data.bytes,
        });

      } catch (error) {
        console.error(`Error uploading ${file.name}:`, error);
        showAlert({ type: 'error', value: `Network error during upload for ${file.name}.` });
        uploadSuccess = false;
      }
    }
    
    // You might want to clear the input here if all went well
    // Note: Clearing the original input field via ref is better practice in a real app

    return results; // Return the array of uploaded file objects
  }

//   const pFile = ref(null)
//   const cloudName = 'dcgo8awuf';
//   const unsignedPreset = 'ml_default';

//   const onP_FileChange = (e) => {

//     pFile.value = e.target.files[0];
//     console.log(pFile.value.type)

//   }

//  const ProjectfileUpload = async() => {
//       if(!pFile.value) return;

//       const fileData = new FormData();
//       fileData.append('file',pFile.value);
//       fileData.append('upload_preset', unsignedPreset)

//       const resourceType = pFile.value.type.startsWith('video') ? 'video': pFile.value.type === 'application/pdf' ? 'raw' : 'image';
//       const uploadURL = `https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`;

//      try{
//         const response = await fetch(uploadURL, {
//             method: 'POST',
//             body: fileData,
//           });

          
//           if (!response.ok) {
//             const errorData = await response.json();
//             console.error('Upload PFile failed:', response.status, response.statusText, errorData);
//             return;
//           }
          
//           const data = await response.json();
//           console.log('pFile data after Cloudinary: ', data);
//      }catch(error){
//       console.log('error pfile: ', error)
//      }
      
//  }

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

  const authStore = useAuthStore()
  const user = computed(() => authStore.user)

  const preview = ref(null)
  const router = useRouter();
  let pcode =  'PRJ-' + Math.floor(1000 + Math.random() * 9000);

  const currentAssignedUsername = ref(''); 
  const assignedTeamMembers = ref([]); 

  const removeTeamMember = (username) => {
    assignedTeamMembers.value = assignedTeamMembers.value.filter(
      (member) => member.username !== username
    );
    updateAssignedTeamString();
  };

  const updateAssignedTeamString = () => {
    form.value.assignedTeam = assignedTeamMembers.value
      .map((member) => member.username)
      .join(', ');
  };

  const searchAndAddTeamMember = async () => {
    const username = currentAssignedUsername.value.trim();

    if (!username) {
      showAlert({ type: 'warning', value: 'Please enter a username to search for the team.' });
      return;
    }
    
    // Prevent adding duplicates
    if (assignedTeamMembers.value.some(member => member.username === username)) {
      showAlert({ type: 'info', value: `@${username} is already on the team.` });
      currentAssignedUsername.value = '';
      return;
    }

    try {
      const response = await fetch(`/api/UserSearch/${username}`);
      
      if (!response.ok) {
          const errorData = await response.json().catch(() => ({})); 
          const errorMessage = errorData.body?.error || `Team member not found or server error (${response.status})`;
          showAlert({ type: 'error', value: errorMessage });
          return; 
      }

      const data = await response.json();
      
      if (data && data.username) { 
        assignedTeamMembers.value.push(data);
        updateAssignedTeamString(); 
        showAlert({ type: 'success', value: `${data.fullName || data.username} added to team.` });
        currentAssignedUsername.value = ''; 
      } else {
        showAlert({ type: 'error', value: 'User not found or data is invalid.' });
      }
    } catch (error) {
      console.error('Error fetching team member:', error);
      showAlert({ type: 'error', value: 'Network error fetching team member.' });
    }
  };


  const clientData = ref(null); 

  const form = ref({
      projectTitle: '',
      projectCode: pcode,
      description: '',
      industry: '',
      status: 'draft',
      clientUsername: '',  
      assignedTeam: '',  
      projectManager: '',
      startDate: '',
      dueDate: '',
      budgetAmount: null,
      currency: 'USD',
      billingType: 'fixed',
      hourlyRate: null,
      internalNotes: '',
      files:[],
      timezone: 'UTC',
      language: 'en',
  })

  onMounted(() => {
    console.log('user client: ', user.value?.username) 

    if (!authStore.user) {
      authStore.fetchUser().then(() => {
        if (user.value && user.value.username) {
          form.value.projectManager = user.value.username; 
        }
      });
    } else {
      if (user.value && user.value.username) {
        form.value.projectManager = user.value.username;
      }
    }

    if (!form.value.timezone) {
      form.value.timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    }
  })

  const onFileChange = (event) => {
    if (event.target.files.length > 0) {
      preview.value = true;
    } else {
      preview.value = false;
    }
  }

  const selectClient = async () => {
    const username = form.value.clientUsername; 

    if (!username) {
      showAlert({ type: 'warning', value: 'Please enter a username to search.' });
      clientData.value = null; 
      return;
    }
    
    clientData.value = null; 

    try {
      const response = await fetch(`/api/UserSearch/${username}`);
      
      if (!response.ok) {
          const errorData = await response.json().catch(() => ({})); 
          const errorMessage = errorData.body?.error || `Client not found or server error (${response.status} ${response.statusText})`;
          
          showAlert({ type: 'error', value: errorMessage });
          form.value.clientUsername = ''; // Clear input on failure
          return; 
      }

      const data = await response.json();
      console.log('Client data:', data);

      if (data && data.username) { 
        // 🎯 SUCCESS: Store the entire user object here for display
        clientData.value = data; 
        form.value.clientUsername = data.username; // Confirm the username in the model
        showAlert({ type: 'success', value: `Client selected: ${data.fullName || data.username}` });
      } else {
        showAlert({ type: 'error', value: 'Client data is invalid or user not found.' });
        form.value.clientUsername = '';
      }
    } catch (error) {
      console.error('Error fetching client:', error);
        showAlert({ type: 'error', value: 'Network error or failed to connect to API.' });
        form.value.clientUsername = '';
      }
    };




  const createProject = async () => {
    try {
   // 1. UPLOAD FILES TO CLOUDINARY AND GET THE RESPONSES
      const cloudinaryFileResponses = await projectFileUpload();
      
      // 2. ASSIGN THE ARRAY OF CLOUDINARY RESPONSES TO THE FORM
      // This array contains the structured data you want to save to the database
      form.value.files = cloudinaryFileResponses;

      const assignedTeamArray = form.value.assignedTeam
        .split(',')
        .map(id => id.trim())
        .filter(id => id !== '');

      if (!form.value.clientUsername || !clientData.value) {
        showAlert({ type: 'error', value: 'Please verify and select a valid Client Username.' });
        return;
      }

      const payload = {
        ...form.value,
        assignedTeam: assignedTeamArray,
        startDate: form.value.startDate,
        dueDate: form.value.dueDate,
        freelancerId: user.value?._id,
        projectCode: pcode,
      };

      if (!payload.projectCode) delete payload.projectCode;
      if (payload.budgetAmount === null) delete payload.budgetAmount;
      if (payload.hourlyRate === null) delete payload.hourlyRate;
      if (!payload.internalNotes) delete payload.internalNotes;
      if (!payload.contractId) delete payload.contractId;
      if (!payload.files || payload.files.length === 0) delete payload.files;

      const response = await $fetch(`/api/project`, {
        method: 'POST',
        body: payload,
      });

      console.log('Project create response:', response);

      if(response.statusCode == 500){
        showAlert({type:'error',value:response.body.error});
      }else{
        form.value = {
          projectTitle: '',
          projectCode: pcode = 'PRJ-' + Math.floor(1000 + Math.random() * 9000),
          description: '',
          industry: '',
          status: 'draft',
          clientUsername: '',  
          assignedTeam: [],
          projectManager: user.value?.username || '',  
          startDate: '',
          dueDate: '',
          budgetAmount: null,
          currency: 'USD',
          billingType: 'fixed',
          hourlyRate: null,
          internalNotes: '',
          files:[],
          timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
          language: 'en'
        };
        clientData.value = null; 
        preview.value = null;
        showAlert({type:'success',value:'Create A New Project'});
      }

    } catch (error) {
      console.error('Failed to create project:', error);
      let errorMessage = '❌ Failed to create project.';
      if (error.data && error.data.body?.error) {
        errorMessage += ` Details: ${error.data.body.error}`;
      } else if (error.message) {
        errorMessage += ` Details: ${error.message}`;
      }
      showAlert({type:'error',value:errorMessage}); 
    } 
    }
</script>
