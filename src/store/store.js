import { reactive } from "vue";
import store from "@/store/store.js";
import { supabase } from "@/supabase/init.js";

const state = reactive({
  user: null,
  openDrawer: false,
  filteredData: [],
  data: [],
});

const methods = {
  setUser(payload) {
    state.user = payload ? payload.user : null;
  },
  setOpenDrawer(isOpen) {
    state.openDrawer = isOpen;
  },
  setFilteredData(data) {
    state.filteredData = data;
  },
  setData(data) {
    state.data = data;
  },
  async getData() {
    try {
      const { data: eyeShadows, error } = await supabase.from("eyeShadows").select("*");
      if (error) throw error;
      store.methods.setData(eyeShadows);
      store.methods.setFilteredData(eyeShadows);
    } catch (error) {
      console.warn(error.message);
    }
  },
};

export default {
  state,
  methods,
};