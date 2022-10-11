<template>
<div v-if='isOpen' id="drawer-navigation" class="fixed z-40 h-screen p-4 overflow-y-auto bg-white w-80 dark:bg-gray-800" tabindex="-1" aria-labelledby="drawer-navigation-label">
    <h5 id="drawer-navigation-label" class="text-base font-semibold text-gray-500 uppercase dark:text-gray-400">Фильтры</h5>
    <div class="py-4 overflow-y-auto">
      <div class="form-control space-y-2">
        <label class="label cursor-pointer flex items-center p-2">
          <span class="label-text">Показать все</span> 
          <input v-model="radioChk" value="all" type="radio" name="radio-6" class="radio checked:bg-red-500" checked />
        </label>
        <label class="label cursor-pointer flex items-center p-2">
          <span class="label-text">Показать отмеченные</span> 
          <input v-model="radioChk" value="marked" type="radio" name="radio-6" class="radio checked:bg-blue-500" />
        </label>
        <label class="label cursor-pointer flex items-center p-2">
          <span class="label-text">Показать неотмеченные</span> 
          <input v-model="radioChk" value="unmarked" type="radio" name="radio-6" class="radio checked:bg-blue-500" />
        </label>
        <div class="form-control space-y-2">
          <label class="label cursor-pointer flex items-center p-2">
            <span class="label-text">Рассыпчатые</span> 
            <input type="checkbox" value="shadows" id="shadows" />
          </label>
          <label class="label cursor-pointer flex items-center p-2">
            <span class="label-text">Лимитки</span> 
            <input type="checkbox" value="rare" id="rare" />
          </label>
          <label class="label cursor-pointer flex items-center p-2">
            <span class="label-text">Палетки</span> 
            <input type="checkbox" value="palets" id="palets" />
          </label>
          <label class="label cursor-pointer flex items-center p-2">
            <span class="label-text">Пресованные</span> 
            <input type="checkbox" value="pressed" id="pressed" />
          </label>
        </div>
        <button @click="onClick" class="cursor-pointer flex items-center p-2" id="btn">Show Selected Value</button>
        <button @click="getRandom" class="cursor-pointer flex items-center p-2" id="btn">Show Random</button>
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
      const data = computed(() => store.state.data);
      const radioChk = ref();
      const isOpen = computed(() => store.state.openDrawer);
      const user = computed(() => store.state.user.id);
      const onClick = () => {
        if (radioChk.value === 'marked') {
          getMarked();
        } else if (radioChk.value === 'unmarked') {
          getUnmarked();
        } else {
          getData();
        }
      }

      const getData = async () => {
        try {
          const { data: eyeShadows, error } = await supabase.from("eyeShadows").select("*");
          if (error) throw error;
          store.methods.setData(eyeShadows);
        } catch (error) {
          console.warn(error.message);
        }
      };

      const getMarked = async () => {
        try {
        //  let { data: markedSh, error } = await supabase.from('userShadows').select(`user, shadow, eyeShadows (*)`).eq('user', user.value);
          let { data: markedSh, error } = await supabase.from('userShadows').select(`eyeShadows (*)`).eq('user', user.value);
          if (error) throw error;
          if (markedSh) {
            store.methods.setData(markedSh.map(i => i.eyeShadows));
          }
        } catch (error) {
          console.warn(error.message);
        }
      };

      const getUnmarked = async () => {
        try {
        //  let { data: unmarkedSh, error } = await supabase.from('userShadows').select(`user, shadow, eyeShadows (*)`).eq('user', user.value);
          let { data: markedSh, error } = await supabase.from('userShadows').select(`eyeShadows (id)`).eq('user', user.value);
          markedSh = markedSh.map(i => i.eyeShadows.id).toString();
          if (markedSh) {
            let { data: unmarkedSh, error } = await supabase.from('eyeShadows').select(`*`).not('id', 'in', `(${markedSh})`);
            if (error) throw error;
            store.methods.setData(unmarkedSh);
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
            store.methods.setData(markedSh[random]);
          }
        } catch (error) {
          console.warn(error.message);
        }
      };

      getData();
      return { isOpen, onClick, radioChk, user, data, getMarked, getData, getUnmarked, getRandom };
    },
  }
</script>