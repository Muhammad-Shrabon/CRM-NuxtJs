<template>
  <div class="settings-page ">
     <Breadcrumb current="User Setting" />

    <div class="grid grid-cols-12 gap-6 mt-4 bg-panel-dark p-5  rounded-md">
        <!-- Profile Picture Upload -->
      <div class="flex items-center  md:col-span-6 lg:col-span-12 space-x-6  bg-panel-dark rounded-md mb-10">
        <div class="w-32 h-32">
         <!-- Show preview image if uploaded -->
          <img
            v-if="preview"
            :src="preview" 
            alt="Profile"
            class="w-full h-full object-cover rounded-sm border border-gray-300 dark:border-gray-600"
          />

          <!-- Fallback default image -->
          <img
            v-else
            :src="user?.profile || 'https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png'"
            alt="Profile"
            class="w-full h-full object-cover rounded-sm border border-gray-300 dark:border-gray-600"
          />
          <!-- <div class="">
              <input class="text-lg" type="file" @change="onFileSelected" />
              <button  class="text-lg" @click="uploadFile">Upload</button>
          </div> -->
        </div>
        <div>
          <input type="file" @change="onFileSelected" accept="image/*" class="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" />
          <p class="text-xs text-gray-400 mt-1">JPG, PNG up to 2MB </p>
        </div>
          <button @click="uploadFile" class="text-sm bg-panel-sub-text py-1 px-4 font-medium rounded-sm border border-brdr text-panel-text-light font-jost cursor-pointer mt-2">Save Profile</button>
      </div>
      <!-- Profile Settings -->
      <section class="border-panel-sub-text/20 col-span-12  md:col-span-6 lg:col-span-6 border dark:bg-panel-dark rounded-xl p-6 shadow-md">
        <h2 class="text-lg text-panel-text-light font-semibold mb-10">Profile Settings</h2>
        <div class="flex gap-10">
          <div class="w-1/2">
            <div class="space-y-4">
              <SettingItem field="fullName" :userId="user['_id']" label="Full Name" :value="user['fullName']" />
              <SettingItem field="email" :userId="user['_id']" label="Email" :value="user['email']" />
              <SettingItem field="phone" :userId="user['_id']" label="Phone" :value="user['phone']"  />
              <SettingItem field="dateOfBirth" :userId="user['_id']" label="Date Of Birth" :value="user['dateOfBirth'] || 'add value'" />
              <SettingItem field="gender" :userId="user['_id']" label="Gender" :value="user['gender'] || 'add value'" />
              <SettingItem field="nationality" :userId="user['_id']" label="Nationality" :value="user['nationality'] || 'add value'"  />
            </div>
          </div>
          <div class="w-1/2">
                <div class="space-y-4">
                  <SettingItem field="maritalStatus" :userId="user['_id']" label="Marital Status" :value="user['maritalStatus'] || 'add value'" />
                  <SettingItem field="address" :userId="user['_id']" label="Address" :value="user['address'] || 'add value'" />
                  <SettingItem field="cityPostalCode" :userId="user['_id']" label="City Postal Code" :value="user['cityPostalCode'] || 'add value'"  />
                  <SettingItem field="occupation" :userId="user['_id']" label="Occupation" :value="user['occupation'] || 'add value'" />
                  <SettingItem field="organization" :userId="user['_id']" label="Organization" :value="user['organization'] || 'add value'" />
                  <SettingItem field="joinedDate" :userId="user['_id']" label="Joined Date" :value="user['joinedDate'] || 'add value'"  />
                </div>
          </div>

        </div>
          <button class="text-sm bg-panel-sub-text py-1 px-4 font-medium rounded-sm border border-brdr text-panel-text-light font-jost cursor-pointer mt-5">Save Changes</button>

      </section>

      <!-- Account Settings -->
      <section class="bg-panel-dark border border-panel-sub-text/20 dark:bg-panel-dark  col-span-12 md:col-span-6 lg:col-span-3 rounded-xl p-6 shadow-md">
        <h2 class="text-lg text-panel-text-light font-semibold mb-10">Password Change</h2>
        <div class="space-y-4">
          <SettingItem field="username" :userId="user['_id']" label="Old Password" value="••••••••" />
          <SettingItem :userId="user['_id']" label="New Password" value="••••••••" />
          <button class="text-sm bg-panel-sub-text py-1 px-4 font-medium rounded-sm border border-brdr text-panel-text-light font-jost cursor-pointer mt-12">Save Password</button>
        </div>
      </section>

      <!-- Notification Preferences -->
      <section class="bg-panel-dark border border-panel-sub-text/20 dark:bg-panel-dark rounded-xl p-6 shadow-md col-span-12 md:col-span-6 lg:col-span-3">
        <h2 class="text-lg font-semibold text-panel-text-light mb-10">Notification Preferences</h2>
        <div class="space-y-4">
          <label class="flex items-center space-x-3">
            <input type="checkbox" checked class="form-checkbox h-5 w-5 text-blue-600" />
            <span class="text-panel-text-light">Email Notifications</span>
          </label>
          <label class="flex items-center space-x-3">
            <input type="checkbox" class="form-checkbox h-5 w-5 text-blue-600" />
            <span class="text-panel-text-light">Push Notifications</span>
          </label>
        </div>
      </section>
      <div v-if="message == true" class="absolute w-42  h-42 m-auto border border-panel-sub-text/20 shadow-lg rounded-full bottom-0 right-0 bg-panel-dark/50 flex justify-center align-middle backdrop-blur-sm" >
        <img class=" m-auto z-1" src="../../assets/image/load.gif" alt="loading" />
        <span class="absolute text-center bottom-10 text-white/80 italic font-thin translate-middle-x z-3">Processing</span>
      </div>
    </div>
  </div>
</template>
<script setup>
definePageMeta({
  layout: 'admin',
  middleware: 'auth',
})

import { computed, onMounted, ref } from 'vue'
import SettingItem from '~/components/settings/SettingItem.vue'
import Breadcrumb from '../../components/panel/Breadcrumb.vue';
import { useAuthStore } from '../../store/auth'
import Swal from 'sweetalert2';
// const user = ref({
//   fullName: 'John Doe',
//   username: 'admin_user',
//   email: 'admin@example.com',
//   phone: '+123456789',
//   dob: '1992-01-01',
//   gender: 'Male',
//   profileImage: `/assets/image/pfl.jpg`, // fallback image
// })

const message = ref('')

const preview = ref(null)
 



const authStore = useAuthStore();
const user = computed(() => authStore.user);

onMounted(() => {
  if (!authStore.user) {
    authStore.fetchUser();
  }
});

const file = ref(null);
const cloudName = 'dcgo8awuf'; 
// Use the actual name of your unsigned upload preset
const unsignedPreset = 'ml_default'; // <-- Replace this with your preset name

const onFileSelected = (event) => {
  file.value = event.target.files[0];
  if (file.value) {
    const reader = new FileReader();
    reader.onload = (e) => {
      preview.value = e.target.result;
    };
    reader.readAsDataURL(file.value);
  } else {
    preview.value = null;
  }
};

const uploadFile = async (e) => {
  if (!file.value) return; 
  const formData = new FormData();
  formData.append('file', file.value);
  formData.append('upload_preset', unsignedPreset);
  
  const resourceType = file.value.type.startsWith('video') ? 'video' : file.value.type === 'application/pdf' ? 'raw' : 'image';
  const uploadUrl = `https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`;

  try {
    const response = await fetch(uploadUrl, {
      method: 'POST',
      body: formData,
    });

    
    if (!response.ok) {
      const errorData = await response.json();
      console.error('Upload failed:', response.status, response.statusText, errorData);
      return;
    }
    
    const data = await response.json();
   
    try {
       message.value = true;
        const res = await $fetch(`/api/User/${user.value._id}`, {
        method: 'PUT',
        body: {
          'profile': data.secure_url,
        },
      })
    console.log('mdb response status:', data.secure_url);

      await authStore.updateUserField('profile', res)
      Swal.fire("Profile Updated!", "Your profile picture has been updated.", "success");
    } catch (err) {
      console.error(`❌ Failed to update profile:`, err)
    }
    message.value = false;
    preview.value = null;  
  } catch (error) {
    console.error('Error during fetch:', error);
  }
};
</script>
