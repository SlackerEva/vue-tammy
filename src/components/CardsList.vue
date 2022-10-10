<template>
  <div class="bg-white">
    <div class="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
      <h2 class="sr-only">Eye Shadows</h2>
      <div class="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
        <div v-for="eyeShadow in data" :key="eyeShadow.id" class="group items-center" >
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
export default {
  name: "cards_list",
  components: {
    Card,
  },
  setup() {
    const data = ref(null);
    const dataLoaded = ref(null);

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
    getData();
    return { data, dataLoaded };
  },
};

</script>