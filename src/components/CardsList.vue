<template>
  <div class="bg-white">
    <div class="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
      <h2 class="sr-only">Eye Shadows</h2>
      <button @click="getMarked">Показать отмеченные </button>
      <button @click="getData">Показать все </button>
      <button @click="getUnmarked">Показать не отмеченные </button>
      <button @click="getRandom">Рандомный цвет </button>
      <div class="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
        <div v-for="eyeShadow in data" :key="eyeShadow.id" class="group items-center shadow-lg" >
          <Card :eyeShadow="eyeShadow" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import Card from "@/components/Card.vue";
import { supabase } from "@/supabase/init.js";
import store from "@/store/store.js";
import { computed } from "vue";
export default {
  name: "cards_list",
  components: {
    Card,
  },
  setup() {
    const data = ref(null);
    const dataLoaded = ref(null);
    const user = computed(() => store.state.user.id);

    const getData = async () => {
      try {
        const { data: eyeShadows, error } = await supabase.from("eyeShadows").select("*");
        if (error) throw error;
        data.value = eyeShadows;
        dataLoaded.value = true;
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
          data.value = markedSh.map(i => i.eyeShadows);
        }
      } catch (error) {
        console.warn(error.message);
      }
    };

    const getUnmarked = async () => {
      try {
      //  let { data: markedSh, error } = await supabase.from('userShadows').select(`user, shadow, eyeShadows (*)`).eq('user', user.value);
        let { data: markedSh, error } = await supabase.from('userShadows').select(`eyeShadows (*)`).eq('user', user.value);
        if (error) throw error;
        if (markedSh) {
          data.value = markedSh.map(i => i.eyeShadows);
        }
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
          data.value = markedSh[random];
        }
      } catch (error) {
        console.warn(error.message);
      }
    };

    getData();
    return { data, dataLoaded, user, getMarked, getData, getUnmarked, getRandom };
  },
};

</script>