<template>
<div v-if='isOpen' id="drawer-navigation" class="fixed z-40 h-screen p-4 overflow-y-auto bg-white w-80 dark:bg-gray-800" tabindex="-1" aria-labelledby="drawer-navigation-label">
    <h5 class="text-base font-semibold text-gray-500 uppercase dark:text-gray-400">
      {{$t('drawer.filters')}}
    </h5>
    <div class="py-4 overflow-y-auto">
      <div class="form-control space-y-2">
        <select 
          class="bg-gray-50 border border-gray-300 text-gray-900 
          text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 
          block w-full p-2.5" 
          v-model="radioChk"
        >
          <option value="all">{{$t('drawer.show-all')}}</option>
          <option value="marked">{{$t('drawer.show-mrk')}}</option>
          <option value="unmarked">{{$t('drawer.show-unmrk')}}</option>
        </select>
        <div v-if="radioChk !== 'all'" class="form-control space-y-2">
          <ul class="items-center w-full text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white">
            <li class="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
              <div class="flex items-center pl-3">
                <input 
                  id="powder" 
                  type="checkbox" 
                  value="powder"
                  v-model="chkbxChk"
                  class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300
                  focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 
                  focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                >
                <label 
                  for="powder" 
                  class="py-3 ml-2 w-full text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  {{$t('drawer.powder')}}
                </label>
              </div>
            </li>
            <li class="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
              <div class="flex items-center pl-3">
                <input 
                  id="rare" 
                  type="checkbox" 
                  value="rare"
                  v-model="chkbxChk"
                  class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300
                  focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 
                  focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                >
                <label 
                  for="rare" 
                  class="py-3 ml-2 w-full text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  {{$t('drawer.rare')}}
                </label>
              </div>
            </li>
          </ul>
          <ul class="items-center w-full text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white">
            <li class="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
              <div class="flex items-center pl-3">
                <input 
                  id="palette" 
                  type="checkbox" 
                  value="palette"
                  v-model="chkbxChk"
                  class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300
                  focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 
                  focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                >
                <label 
                  for="palette" 
                  class="py-3 ml-2 w-full text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  {{$t('drawer.palette')}}
                </label>
              </div>
            </li>
            <li class="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
              <div class="flex items-center pl-3">
                <input 
                  id="pressed" 
                  type="checkbox" 
                  value="pressed"
                  v-model="chkbxChk"
                  class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300
                  focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 
                  focus:ring-2 dark:bg-gray-600 dark:border-gray-500" 
                >
                <label 
                  for="pressed" 
                  class="py-3 ml-2 w-full text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  {{$t('drawer.pressed')}}
                </label>
              </div>
            </li>
          </ul>
        </div>
        <button 
          @click="onClick" 
          class="bg-teal-500 border rounded border-white w-full leading-none
          px-4 py-3 mt-4
          text-white text-base
          hover:border-transparent hover:text-teal-500 
          hover:bg-white hover:border-teal-500" 
        >
          {{$t('drawer.show-btn')}}
        </button>
        <button 
          @click="getRandom" 
          class="bg-teal-500 border rounded border-white w-full leading-none
          px-4 py-3 mt-4
          text-white text-base
          hover:border-transparent hover:text-teal-500 
          hover:bg-white hover:border-teal-500" 
        >
          {{$t('drawer.random')}}
        </button>
      </div>
   </div>
</div>
</template>
<script>
  import store from "@/store/store.js";
  import { supabase } from "@/supabase/init.js";
  import { computed } from "vue";
  import { ref } from "vue";
  export default {
    name: "right_drawer",
    setup()  {
      const filteredData = computed(() => store.state.filteredData);
      const data = computed(() => store.state.data);
      const radioChk = ref('all');
      const chkbxChk = ref([]);
      const isOpen = computed(() => store.state.openDrawer);
      const user = computed(() => store.state.user.id);
      const onClick = () => {
        if (radioChk.value === 'marked') {
          getMarked();
        } else if (radioChk.value === 'unmarked') {
          getUnmarked();
        } else {
          store.methods.setFilteredData(data.value);
        }
      }
      
      const getMarked = async () => {
        try {
          let { data: markedSh, error } = await supabase.from('userShadows').select(`eyeShadows (*)`).eq('user', user.value);
          if (error) throw error;
          if (markedSh) {
            if (chkbxChk.value.length !== 0) {
              store.methods.setFilteredData(markedSh.filter(i => chkbxChk.value.includes(i.eyeShadows.type)).map(i => i.eyeShadows));
            } else {
              store.methods.setFilteredData(markedSh.map(i => i.eyeShadows));
            }
          }
        } catch (error) {
          console.warn(error.message);
        }
      };

      const getUnmarked = async () => {
        try {
          let { data: markedSh, error } = await supabase.from('userShadows').select(`eyeShadows (id)`).eq('user', user.value);
          markedSh = markedSh.map(i => i.eyeShadows.id).toString();
          if (markedSh) {
            let { data: unmarkedSh, error } = await supabase.from('eyeShadows').select(`*`).not('id', 'in', `(${markedSh})`);
            if (error) throw error;
            if (chkbxChk.value.length !== 0) {
              store.methods.setFilteredData(unmarkedSh.filter(i => chkbxChk.value.includes(i.type)));
            } else {
              store.methods.setFilteredData(unmarkedSh);
            }

          }
          if (error) throw error;
        } catch (error) {
          console.warn(error.message);
        }
      };

      const getRandom = async () => {
        try {
          let { data: markedSh, error } = await supabase.from('userShadows').select(`eyeShadows (*)`).eq('user', user.value);
          if (error) throw error;
          if (markedSh) {
            let leng = markedSh.length;
            let random = Math.floor(Math.random() * leng);
            store.methods.setFilteredData(markedSh[random]);
          }
        } catch (error) {
          console.warn(error.message);
        }
      };
      return { isOpen, onClick, radioChk, chkbxChk, user, filteredData, getMarked, getUnmarked, getRandom };
    },
  }
</script>