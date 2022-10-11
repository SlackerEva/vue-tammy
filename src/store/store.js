import { reactive } from "vue";

const state = reactive({
  user: null,
  openDrawer: false,
  data: [],
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
};

export default {
  state,
  methods,
};