<template>
  <div class="min-h-full font-Poppins box-border">
    <Nav></Nav>
    <router-view />
  </div>
</template>

<script>
import Nav from '@/components/Nav-bar.vue';
//import CardsList from '@/components/CardsList.vue'
import { ref } from "vue";
import { supabase } from "@/supabase/init.js";
import store from "@/store/store.js";
export default {
  name: 'App',
  components: {
    Nav,
  },
  setup() {

    // Create data / vars
    const appReady = ref(null);
    // Check to see if user is already logged in
    const user = supabase.auth.user();
    // If user does not exist, need to make app ready
    if (!user) {
      appReady.value = true;
    }
    // Runs when there is a auth state change
    // if user is logged in, this will fire
    supabase.auth.onAuthStateChange((_, session) => {
      store.methods.setUser(session);
      appReady.value = true;
    });
    return { appReady };
  },
}
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700&display=swap");
</style>
