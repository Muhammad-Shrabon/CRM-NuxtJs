<template>
     <div class="card border border-panel-sub-text/50 rounded-lg p-2 md:p-4 shadow-lg">
        <div class="flex flex-wrap justify-between">
          <div class="w-full ">
              <div class="title flex items-center justify-between  bg-panel-text-light/5 rounded-lg p-2 mb-2">
                <div class="tl_lft">
                  <h6 class="font-jost text-base 2xl:text-lg text-panel-text-light">New Clients/Leads</h6>
                  <p class="font-jost text-xs 2xl:text-sm text-panel-sub-text">All New Clients/Leads</p>
                </div>
                <div class="actn">
                  <Icon class="text-panel-sub-text text-3xl cursor-pointer duration-300 ease-in-out hover:text-panel-text-light" icon="mynaui:dots-vertical-circle"/>
                </div>
              </div>
              <div class="datas pt-5">
                <table class="w-full text-left">
                  <thead class="border-b pb-2 border-panel-sub-dark">
                    <tr>
                      <th class="text-xs 2xl:text-base font-medium font-jost text-panel-text-light">ID.</th>
                      <th class="text-xs 2xl:text-base font-medium font-jost text-panel-text-light">Title</th>
                      <th class="text-xs 2xl:text-base font-medium font-jost text-panel-text-light">Cover</th>
                      <th class="text-xs 2xl:text-base font-medium font-jost text-panel-text-light">P. Catg. </th>
                      <th class="text-xs 2xl:text-base font-medium font-jost text-panel-text-light">Status</th>
                      <th class="text-xs 2xl:text-base font-medium font-jost text-panel-text-light w-20">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr class="border-b border-panel-text-light/5">
                             <td colspan="6" class= "text-xs text-center 2xl:text-base bg-orange-400/20 mt-5 text-orange-200 py-2 px-4">Commin Soon</td>
                    </tr>
                 
                 
                  </tbody>
                </table>
              </div>
            </div>
        
          </div>
        </div>
</template>
<script setup>
import { Icon } from '@iconify/vue';
</script>