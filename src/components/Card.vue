<template>
  <div class="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-w-7 xl:aspect-h-8">
    <a :href="eyeShadow.link" target="_blank">
      <img :src="eyeShadow.imgPath" :alt="eyeShadow.name" class="h-full w-full object-cover object-center group-hover:opacity-75" />
    </a>
  </div>
  <div class="flex place-content-between p-3">
    <h3 v-if="$i18n.locale !== 'en'" class="text-base font-bold text-black-900 content-center truncate">{{ eyeShadow.name }}</h3>
    <h3 v-else class="text-base font-bold text-black-900 content-center truncate">{{ eyeShadow.nameEn }}</h3>
    <Bookmark_btn :shadowID="eyeShadow.id" v-if="user"/>
  </div>
</template>
<script>
import Bookmark_btn from '@/components/UI/bookmarkBtn.vue';
import { computed } from "vue";
import store from "@/store/store.js";
export default {
  name: "card_box",
  components: {
    Bookmark_btn,
  },
  props: {
    eyeShadow: Object
  },
  setup() {
    const user = computed(() => store.state.user);
    return { user };
  }
}
</script>