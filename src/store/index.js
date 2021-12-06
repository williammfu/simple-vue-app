import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    users: JSON.parse(localStorage.getItem("list_of_users")) || [],
  },
  mutations: {
    update(state, payload) {
      const { users } = payload;
      state.users = users;
      localStorage.setItem("list_of_users", JSON.stringify(state.users));
    },
  },
  actions: {
    update({ commit }, payload) {
      commit("update", payload);
    },
  },
  modules: {},
});
