import { reactive } from "vue";
import store from "@/store/store.js";
import { supabase } from "@/supabase/init.js";

const state = reactive({
  user: null,
  openDrawer: false,
  data: [],
  generalData: [],
});

const methods = {
  setUser(payload) {
    state.user = payload ? payload.user : null;
  },
  setOpenDrawer(isOpen) {
    state.openDrawer = isOpen;
  },
  setData(data) {
    state.data = data;
  },
  setGeneralData(data) {
    state.generalData = data;
  },
  async getGeneralData() {
    try {
      const { data: eyeShadows, error } = await supabase.from("eyeShadows").select("*");
      if (error) throw error;
      store.methods.setGeneralData(eyeShadows);
      store.methods.setData(eyeShadows);
    } catch (error) {
      console.warn(error.message);
    }
  },
};

export default {
  state,
  methods,
};