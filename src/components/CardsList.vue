<template>
  <div class="bg-white">
    <div class="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
      <h2 class="sr-only">Eye Shadows</h2>

      <div class="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
        <a v-for="eyeShadow in data" :key="eyeShadow.id" :href="eyeShadow.link" class="group items-center" target="_blank">
          <div class="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-w-7 xl:aspect-h-8">
            <img :src="eyeShadow.imgPath" :alt="eyeShadow.name" class="h-full w-full object-cover object-center group-hover:opacity-75" />
          </div>
          <h3 class="mt-4 text-sm text-black-900">{{ eyeShadow.name }}</h3>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { supabase } from "@/supabase/init.js";
export default {
  name: "cards_list",
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