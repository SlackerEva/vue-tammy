<template>
  <header class="bg-at-light-green text-white">
    <nav class="container py-5 px-4 flex flex-col gap-4 items-center sm:flex-row">
      <button @click="onClick">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" />
        </svg>
      </button>
      <div class="flex items-center gap-x-4">
        <router-link :to="{ name: 'cards_list' }">
          <h1 class="text-lg">Tammy collector</h1>
        </router-link>
      </div>
      <div class="form-control">
        <input type="text" v-model="search" placeholder="Search" class="input input-bordered text-gray-500" />
        <button @click="searchedList">search</button>
      </div>
      <ul class="flex flex-1 justify-end gap-x-10">
        <router-link v-if="!user" class="cursor-pointer" :to="{ name: 'user_login' }">Login</router-link>
        <li v-if="user" @click="logout" class="cursor-pointer">Logout</li>
      </ul> 
    </nav>
  </header>
</template>

<script>
  import store from "@/store/store.js";
  import { ref } from "vue";
  import { computed } from "vue";
  import { supabase } from "../supabase/init";
  import { useRouter } from "vue-router";
  //import Drawer from '@/components/Drawer.vue';
  export default {
    components: {
    //  Drawer
    },
    setup() {
      let search = ref("");
      // Get user from store
      const user = computed(() => store.state.user);
      const data = computed(() => store.state.data);
      const generalData = computed(() => store.state.generalData);
      // Setup ref to router
      const router = useRouter();
      const isOpen = ref(false);

      const onClick = () => { 
        store.methods.setOpenDrawer(!isOpen.value);
        isOpen.value = !isOpen.value
      };

      function searchedList() {
        store.methods.setData(generalData.value.filter((data) =>
          data.name.toLowerCase().includes(search.value.toLowerCase())
        ));
      }

      // Logout function
      const logout = async () => {
          await supabase.auth.signOut();
          router.push({ name: "cards_list" });
      };
      return { logout, user, data, generalData, isOpen, onClick, search, searchedList };
  },
};
</script>