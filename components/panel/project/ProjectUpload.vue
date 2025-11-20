<template>
  <div class="card border border-panel-text-light/20 min-h-80 rounded-xl p-5">
    <Title icon="ic:round-add-task" text="Handover The Project" />

    <div class="form max-w-1/2 m-auto mt-10">

      <!-- File Upload -->
      <div class="grp mb-5 block">
        <label class="block text-lg pb-2 font-jost text-panel-text-light">
          File Upload <sub class="text-panel-sub-text">*zip, pdf or image*</sub>
        </label>
        <input 
          ref="fileInput"
          type="file"
          name="files"
          multiple
          @change="handleFiles"
          class="border bg-panel-text-light/10 border-panel-text-light/40 text-base p-2 font-jost focus:outline-0 text-panel-text-light rounded-lg w-full"
        >
      </div>

      <!-- Selected Files List -->
      <div v-if="selectedFiles.length" class="mb-5">
        <h4 class="font-jost text-panel-text-light mb-2">Selected Files:</h4>
        <ul class="list-disc list-inside text-panel-sub-text">
          <li v-for="(file, index) in selectedFiles" :key="index">{{ file.name }}</li>
        </ul>
      </div>

      <!-- Submit Button -->
      <div class="btn text-end">
        <button 
          @click="submitFiles" 
          class="border border-panel-text-light/40 cursor-pointer text-base px-2 py-1 hover:bg-panel-sub-text duration-300 transition-all font-jost text-panel-text-light rounded bg-panel-sub-dark"
        >
          Submit
        </button>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import Title from '../Title.vue';

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

const props = defineProps({
  projectID: { type: String, required: true },
  user: { type: Object, required: true } // should contain _id
});

const selectedFiles = ref([]);
const fileInput = ref(null);

const handleFiles = (e) => {
  selectedFiles.value = Array.from(e.target.files);
}

const submitFiles = async () => {
  if (!props.projectID) return showAlert({ value: 'Project ID missing!', type: 'error' });
  if (!props.user?._id) return showAlert({ value: 'User ID missing!', type: 'error' });
  if (!selectedFiles.value.length) return showAlert({ value: 'Please select files to upload!', type: 'error' });

  const allowedTypes = ['application/zip', 'application/pdf', 'image/jpeg', 'image/png'];
  for (const file of selectedFiles.value) {
    if (!allowedTypes.includes(file.type)) {
      return showAlert({ value: 'Only zip, pdf, or image files are allowed!', type: 'error' });
    }
  }

  const formData = new FormData();
  formData.append('projectID', props.projectID); 
  formData.append('freelancerID', props.user._id); 
  selectedFiles.value.forEach(file => formData.append('files', file));

  try {
    const res = await fetch('/api/project/delivery', {
      method: 'POST',
      body: formData
    });

    const data = await res.json();

    if (!res.ok) {
      console.error(data);
      return showAlert({ value: 'Error uploading files: ' + (data.statusMessage || 'Unknown error'), type: 'error' });
    }

    showAlert({ value: 'Files uploaded successfully!', type: 'success' });

    // ✅ Reset files
    selectedFiles.value = [];
    if (fileInput.value) fileInput.value.value = ''; // clears the input
    console.log('Uploaded data:', data);

  } catch (err) {
    console.error(err);
    showAlert({ value: 'Error uploading files!', type: 'error' });
  }
}
</script>

<style scoped>
ul {
  padding-left: 1rem;
}
</style>
