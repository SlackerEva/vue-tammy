<template>
  <button @click="onClick">
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      fill="none" 
      viewBox="0 0 24 24" 
      stroke-width="1.5" 
      stroke="currentColor" 
      class="w-6 h-6"
      v-if="isDark === false"
    >
      <path 
        stroke-linecap="round" 
        stroke-linejoin="round" 
        d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
      />
    </svg>
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 24 24" 
      fill="#44ba9f" 
      class="w-6 h-6"
      v-if="isDark === true"
    >
      <path 
        fill-rule="evenodd" 
        d="M6.32 2.577a49.255 49.255 0 0111.36 0c1.497.174 2.57 1.46 2.57 2.93V21a.75.75 0 01-1.085.67L12 18.089l-7.165 3.583A.75.75 0 013.75 21V5.507c0-1.47 1.073-2.756 2.57-2.93z"
        clip-rule="evenodd"
      />
    </svg>
  </button>
</template>
<script>
import { ref } from "vue";
import { supabase } from "@/supabase/init.js";
import { computed } from "vue";
import store from "@/store/store.js";
export default {
  name: "bookmark_btn",
  props: {
    shadowID: Number
  },
  setup(props) {
    const isDark = ref(false);
    const user = computed(() => store.state.user.id);
    //const user = supabase.auth.user().id;
    const insertUserShadow = async () => {
      try {
        const { error } = await supabase.from('userShadows').insert([{ user: user.value, shadow: props.shadowID }]);
        if (error) throw error;
      } catch (error) {
        console.warn(error.message);
      }
    };

    const removeUserShadow = async () => {
      try {
        const { error } = await supabase.from('userShadows').delete().eq('user', user.value).eq('shadow', props.shadowID);
        if (error) throw error;
      } catch (error) {
        console.warn(error.message);
      }
    };

    const selectUserShadows = async () => {
      try {
        const { data, error } = await supabase.from('userShadows').select('id').eq('user', user.value).eq('shadow', props.shadowID);
        if ( error) throw error;
        if (data.length !== 0) {
          isDark.value = true;
        }
      } catch (error) {
        console.warn(error.message);
      }
    };

    selectUserShadows();

    const onClick = () => {
      if (!isDark.value) {
        insertUserShadow();
      } else {
        removeUserShadow();
      }
      isDark.value = !isDark.value;
    };
    return { isDark, onClick, user };
  }
}
</script>