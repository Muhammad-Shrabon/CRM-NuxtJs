<template>
  <div class="flex justify-between items-center border-b border-brdr/25 dark:border-gray-700 pb-2">
    <span class="text-sm text-panel-text-light dark:text-gray-400">{{ label }}</span>
    <span>
      <Icon icon="material-symbols:edit-rounded" class="w-4 opacity-50 inline-block text-panel-sub-text mr-2"/>
      
      <span
        v-if="!isEditing"
        @dblclick="enableEditing"
        class="text-sm font-medium text-panel-text-light dark:text-white cursor-pointer"
      >
        {{ editedValue }}
      </span>
  
  
      <input
        v-else
        v-model="editedValue"
        @blur="saveChanges"
        @keyup.enter="saveChanges"
        class="text-sm font-medium text-panel-text-light dark:text-white bg-transparent border border-gray-300 dark:border-gray-600 px-1 py-0.5 rounded"
        :placeholder="label"
        autofocus
      />
    </span>


  </div>
</template>

<script setup>
import { Icon } from '@iconify/vue';
import { onMounted, ref } from 'vue'
import { useAuthStore } from '../../store/auth'
import Swal from 'sweetalert2';

const props = defineProps({
  label: String, 
  field: String,  
  value: String, 
  userId: String  
})

const isEditing = ref(false)
const editedValue = ref(props.value)
const authStore = useAuthStore();
const emit = defineEmits(['update-value'])

function enableEditing() {
  isEditing.value = true
}

async function saveChanges() {
  isEditing.value = false

  emit('update-value', {
    field: props.field,
    value: editedValue.value,
  })   

  try {
    const res = await $fetch(`/api/User/${props.userId}`, {
      method: 'PUT',
      body: {
        [props.field]: editedValue.value,
      },
    })
     await authStore.updateUserField(props.field, res)
      Swal.fire("Profile Updated!", `Your profile ${props.field} has been updated.`, "success");
  } catch (err) {
    console.error(`❌ Failed to update ${props.field}:`, err)
  }
}

 
</script>
