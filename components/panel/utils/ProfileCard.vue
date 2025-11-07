<template>
    <div class="profile__card bg-panel-dark w-full p-5 rounded-lg shadow-md text-center ">
        <div class="img w-40 h-40 m-auto overflow-hidden rounded-full border-4 border-white">
            <img class="w-full h-full object-cover " :src="user['profile'] || 'https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png'" alt="img">
        </div>
        <div class="info pt-5">
            <h3 class="text-lg text-white font-normal font-jost ">{{ user['fullName'] }}</h3>
            <h6 class="text-sm text-white font-light font-jost "></h6>
        </div>
    </div>    
    <!-- <div class="popup w-1/2 h-1/2 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 card p-5 bg-panel-  rounded-lg shadow-md">
      <div class="">
          <input class="text-lg" type="file" @change="onFileSelected" />
          <button  class="text-lg" @click="uploadFile">Upload</button>
      </div>
    </div>    -->
</template>
<script setup>
import { computed, onMounted } from 'vue';
import { useAuthStore } from '../../../store/auth';
import { ref } from 'vue';

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
};

const uploadFile = async () => {
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
    
    // Check if the response was successful
    if (!response.ok) {
      const errorData = await response.json();
      console.error('Upload failed:', response.status, response.statusText, errorData);
      return;
    }
    
    const data = await response.json();
    console.log('Upload successful:', data.secure_url);
  } catch (error) {
    console.error('Error during fetch:', error);
  }
};
</script>
 