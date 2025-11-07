<template>
  <div>
    <input type="file" @change="handleFileChange" />
    <button @click="uploadFile">Upload</button>
    <p v-if="uploadUrl">Uploaded: <a :href="uploadUrl" target="_blank">{{ uploadUrl }}</a></p>
  </div>
</template>

<script setup>
 

import { ref } from 'vue';

const file = ref(null);
const uploadUrl = ref('');

const handleFileChange = (e) => {
  file.value = e.target.files[0];
};

const uploadFile = async () => {
  if (!file.value) return alert('Select a file');

  const formData = new FormData();
  formData.append('file', file.value);

  const { data, error } = await $fetch('/api/upload', {
    method: 'POST',
    body: formData
  });

  if (error.value) {
    alert(error.value.message);
  } else {
    uploadUrl.value = data.value.secure_url;
    console.log('File uploaded successfully:', uploadUrl.value);
  }
};
</script>
