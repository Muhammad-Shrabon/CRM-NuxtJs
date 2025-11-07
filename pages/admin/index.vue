<template>
  <div class="w-full  bg-panel-dark text-9xl rounded-lg p-2 md:p-6">
    <Breadcrumb current="Dashbaord" />
    <div class="grid grid-cols-12 gap-5">
      <div class="col-span-12 xl:col-span-8">
        <div class="card border border-panel-sub-text/50 rounded-lg p-2 md:p-4 shadow-lg">
          <div class="flex flex-wrap justify-between">
            <!-- Recent Project Start -->
             <RecentProject/>
            <!-- Pending Invoices Start -->
             <div class="w-full  lg:w-[49%]  p-2 md:p-5 border border-panel-text-light/20 rounded">
                <div class="title flex items-center justify-between  bg-panel-text-light/5 rounded-lg p-2 mb-2">
                  <div class="tl_lft">
                    <h6 class="font-jost  text-base 2xl:text-lg  text-panel-text-light">Pending Invoices</h6>
                    <p class="font-jost text-xs 2xl:text-sm text-panel-sub-text">All Pending Invoices</p>
                  </div>
                  <div class="actn">
                    <Icon class="text-panel-sub-text text-3xl cursor-pointer duration-300 ease-in-out hover:text-panel-text-light" icon="mynaui:dots-vertical-circle"/>
                  </div>
                </div>
                <div class="datas pt-5">
                  <table class="w-full text-left">
                    <thead class="border-b pb-2 border-panel-sub-dark">
                      <tr class="pb-5">
                        <th class= "text-xs 2xl:text-base font-medium font-jost text-panel-text-light">ID.</th>
                        <th class= "text-xs 2xl:text-base font-medium font-jost text-panel-text-light">Name</th>
                        <th class= "text-xs 2xl:text-base font-medium font-jost text-panel-text-light">P. Catg. </th>
                        <th class= "text-xs 2xl:text-base font-medium font-jost text-panel-text-light">Status</th>
                        <th class= "text-xs 2xl:text-base font-medium font-jost text-panel-text-light w-20">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td colspan="5" class= "text-xs text-center 2xl:text-base bg-orange-400/20 mt-5 text-orange-200 py-2 px-4">Commin Soon</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
             </div>
          
          </div>
        </div>
      </div>
      <!-- Income Analysis Start -->
      <div class="col-span-12 xl:col-span-4">
        <div class="card border border-panel-sub-text/50 rounded-lg  p-2 md:p-4 shadow-lg">
          <div class="title flex items-center justify-between  bg-panel-text-light/5 rounded-lg p-2 mb-2">
            <div class="tl_lft">
              <h6 class="font-jost text-base 2xl:text-lg  text-panel-text-light">Income Analytics</h6>
              <p class="font-jost text-xs 2xl:text-sm text-panel-sub-text">Summery of business</p>
            </div>
            <div class="actn">
              <Icon class="text-panel-sub-text text-3xl cursor-pointer duration-300 ease-in-out hover:text-panel-text-light" icon="mynaui:dots-vertical-circle"/>
            </div>
          </div>

          <div class="datas py-5">
            <Billingchart/>
          </div>

        </div>
      </div>
      <div class="col-span-12">
        <div class="card border border-panel-sub-text/50 rounded-lg p-4 shadow-lg">
          <div class="title flex items-center justify-between  bg-panel-text-light/5 rounded-lg p-2 mb-2">
            <div class="tl_lft">
              <h6 class="font-jost  text-base 2xl:text-lg  text-panel-text-light">Subscription Analytics</h6>
              <p class="font-jost text-sm text-panel-sub-text">last 30 Days Subscription</p>
            </div>
            <div class="actn">
              <Icon class="text-panel-sub-text text-3xl cursor-pointer duration-300 ease-in-out hover:text-panel-text-light" icon="mynaui:dots-vertical-circle"/>
            </div>
          </div>

          <div class="datas py-5">
            <SubcriptionChart />
          </div>

        </div>
      </div>
      <div class="col-span-12">
       <PostList/>
      </div>
    </div>
    <div class="grid grid-cols-12 gap-5 pt-5">
      <div class="col-span-12 lg:col-span-6 xl:col-span-6">
        <NotificationList/>
      </div>
      <div class="col-span-12 lg:col-span-12 xl:col-span-6">
        <AccountPlan/>
      </div>
    </div>
  </div>   
</template>
<script setup>
import { Icon } from '@iconify/vue';
import Billingchart from '../../components/panel/Billingchart.vue';
import NotificationList from '../../components/panel/NotificationList.vue';
import AccountPlan from '../../components/panel/AccountPlan.vue';
import PostList from '../../components/panel/PostList.vue';
import SubcriptionChart from '../../components/panel/SubcriptionChart.vue';
import Breadcrumb from '../../components/panel/Breadcrumb.vue';
import RecentProject from '../../components/panel/cards/RecentProject.vue';
 definePageMeta({
  layout: 'admin',
  middleware: 'auth',
});
</script>