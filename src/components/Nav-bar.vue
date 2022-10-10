<template>
  <header class="bg-at-light-green text-white">
    <nav class="container py-5 px-4 flex flex-col gap-4 items-center sm:flex-row">
      <div class="flex items-center gap-x-4">
        <h1 class="text-lg">Tammy collector</h1>
      </div>
 <!--  <div class="form-control">
        <input type="text" v-model="search" placeholder="Search" class="input input-bordered" />
      </div>-->   
      <ul class="flex flex-1 justify-end gap-x-10">
        <router-link v-if="!user" class="cursor-pointer" :to="{ name: 'user_login' }">Login</router-link>
        <li v-if="user" @click="logout" class="cursor-pointer">Logout</li>
      </ul> 
    </nav>
  </header>
</template>

<script>
  import store from "@/store/store.js";
 // import { ref } from "vue";
  import { computed } from "vue";
  import { supabase } from "../supabase/init";
  import { useRouter } from "vue-router";
  export default {
    setup() {
      //let search = ref("");
      // Get user from store
      const user = computed(() => store.state.user);
      // Setup ref to router
      const router = useRouter();
      // Logout function
      const logout = async () => {
        await supabase.auth.signOut();
        console.log('bye');
        router.push({ name: "cards_list" });
      };
      return { logout, user };
    },
  };
</script>