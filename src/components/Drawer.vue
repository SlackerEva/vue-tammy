<template>
<div v-if='isOpen' id="drawer-navigation" class="fixed z-40 h-screen p-4 overflow-y-auto bg-white w-80 dark:bg-gray-800" tabindex="-1" aria-labelledby="drawer-navigation-label">
    <h5 id="drawer-navigation-label" class="text-base font-semibold text-gray-500 uppercase dark:text-gray-400">{{$t('drawer.filters')}}</h5>
    <div class="py-4 overflow-y-auto">
      <div class="form-control space-y-2">
        <label class="label cursor-pointer flex items-center p-2">
          <span class="label-text">{{$t('drawer.show-all')}}</span> 
          <input v-model="radioChk" value="all" type="radio" name="radio-6" class="radio checked:bg-red-500" checked />
        </label>
        <label class="label cursor-pointer flex items-center p-2">
          <span class="label-text">{{$t('drawer.show-mrk')}}</span> 
          <input v-model="radioChk" value="marked" type="radio" name="radio-6" class="radio checked:bg-blue-500" />
        </label>
        <label class="label cursor-pointer flex items-center p-2">
          <span class="label-text">{{$t('drawer.show-unmrk')}}</span> 
          <input v-model="radioChk" value="unmarked" type="radio" name="radio-6" class="radio checked:bg-blue-500" />
        </label>
        <div class="form-control space-y-2">
          <label class="label cursor-pointer flex items-center p-2">
            <span class="label-text">{{$t('drawer.powder')}}</span> 
            <input v-model="chkbxChk" type="checkbox" value="powder" id="powder" />
          </label>
          <label class="label cursor-pointer flex items-center p-2">
            <span class="label-text">{{$t('drawer.rare')}}</span> 
            <input v-model="chkbxChk" type="checkbox" value="rare" id="rare" />
          </label>
          <label class="label cursor-pointer flex items-center p-2">
            <span class="label-text">{{$t('drawer.palette')}}</span> 
            <input v-model="chkbxChk" type="checkbox" value="palette" id="palets" />
          </label>
          <label class="label cursor-pointer flex items-center p-2">
            <span class="label-text">{{$t('drawer.pressed')}}</span> 
            <input v-model="chkbxChk" type="checkbox" value="pressed" id="pressed" />
          </label>
        </div>
        <button @click="onClick" class="cursor-pointer flex items-center p-2" id="btn">{{$t('drawer.show-btn')}}</button>
        <button @click="getRandom" class="cursor-pointer flex items-center p-2" id="btn">{{$t('drawer.random')}}</button>
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
      const radioChk = ref();
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