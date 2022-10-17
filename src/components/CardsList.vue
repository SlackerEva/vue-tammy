<template>
  <Drawer />
  <div class="bg-white">
    <div class="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
      <h2 class="sr-only">Eye Shadows</h2>
      <div class="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
        <div v-for="eyeShadow in filteredData" :key="eyeShadow.id" class="group items-center shadow-lg" >
          <Card :eyeShadow="eyeShadow" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Drawer from '@/components/Drawer.vue';
import Card from "@/components/Card.vue";
import store from "@/store/store.js";
import { computed } from "vue";
export default {
  name: "cards_list",
  components: {
    Card,
    Drawer
  },
  setup() {
    const filteredData = computed(() => store.state.filteredData);
    store.methods.getData();
    return {filteredData}
  }
};

</script>