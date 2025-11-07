<template>
    <div class="w-full mb-3 lg:mb-0 lg:w-[49%]  p-2 md:p-5 border border-panel-text-light/20 rounded">
                <div class="title flex items-center justify-between  bg-panel-text-light/5 rounded-lg p-2 mb-2">
                  <div class="tl_lft">
                    <h6 class="font-jost  text-base 2xl:text-lg  text-panel-text-light">Recent Projects</h6>
                    <p class="font-jost text-xs 2xl:text-sm text-panel-sub-text">All Recent Projects</p>
                  </div>
                  <div class="actn">
                    <Icon class="text-panel-sub-text text-3xl cursor-pointer duration-300 ease-in-out hover:text-panel-text-light" icon="mynaui:dots-vertical-circle"/>
                  </div>
                </div>
                <div class="datas pt-5 overflow-y-auto max-h-60"> 
                  <table class="min-w-full bg-panel-dark text-panel-text-light rounded-md overflow-hidden">
        <thead>
          <tr class="bg-panel-sub-dark">
            <th class="py-3 px-2 text-left text-sm font-medium">ID</th>
            <th class="py-3 px-2 text-left text-sm font-medium">Title</th>
            <th class="py-3 px-2 text-left text-sm font-medium">Status</th>
            <th class="py-3 px-2 text-left text-sm font-medium">Due Date</th>
            <th class="py-3 px-2 text-left text-sm font-medium">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="projects.length === 0 && !loadingProjects">
            <td colspan="9" class="text-panel-text-light  text-sm  text-center py-4">---No Projects Created Yet---</td>
          </tr>
          <tr v-if="projects.length === 0 && loadingProjects">
             <td colspan="9" class="text-panel-text-light text-sm text-center py-4">Loading projects...</td>
          </tr>
          <tr v-for="(project,index) in projects" :key="project._id" class="border-b border-brdr/20 hover:bg-panel-sub-dark/50">
            <td class="py-2 !pl-2 text-sm">{{ ++index }}</td>
            <td class="py-2 !px-2 text-sm whitespace-nowrap overflow-hidden text-ellipsis pr-15">{{ project.projectTitle }}</td>
            <td class="py-2 !px-2 text-sm capitalize pl-5">{{ project.status }}</td>
            <td class="py-2 !px-2 text-sm">{{ new Date(project.dueDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', }) }}</td>
            <td class="py-2 !px-2 text-sm">
              <button @click="editProject(project._id)" class="edit !p-0 !mr-1"><Icon icon="ic:baseline-edit" /></button>
              <button @click="deleteProject(project._id)" class="delete !p-0 !mr-1"><Icon icon="ic:baseline-delete" /></button>
              <button @click="viewProject(project._id)" class="view !p-0 !mr-1"><Icon icon="ic:sharp-arrow-right-alt" /></button>
            </td>
          </tr>
        </tbody>
      </table>
                </div>
             </div>
</template>
<script setup>
import { Icon } from '@iconify/vue';
import { computed, onMounted, ref } from 'vue';  
import { useAuthStore } from '~/store/auth';

definePageMeta({
  layout: 'admin',
  middleware: 'auth',
});
 
const loadingProjects = ref(false);
const projects = ref([]);
const authStore = useAuthStore()
const user = computed(() => authStore.user) 

const projectFetch = async () => {
  try {
    loadingProjects.value = true;
    // Ensure user.value._id is available before fetching
    if (!user.value?._id) {
      console.warn('User ID not available to fetch projects.');
      return;
    }
    const response = await fetch(`/api/query/Project/${user.value._id}`);
    const data = await response.json();
    projects.value = data.data || []; // Assuming data.data holds the array of projects
    console.log('Project value :', data.data);
  } catch (error) {
    console.error('Error fetching projects: ', error.message); // Use console.error for errors
  } finally {
    loadingProjects.value = false;
  }
};

onMounted(async () => {
  if (!authStore.user) {
    await authStore.fetchUser(); 
  }
  projectFetch(); 
});
  projectFetch(); 

</script>