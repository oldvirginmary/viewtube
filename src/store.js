/* Vue */
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    users: JSON.parse(localStorage.getItem("users")),
    currentUser: JSON.parse(localStorage.getItem("currentUser")),
    currentRoute: window.location.pathname,
  },
  mutations: {
    addUser(state, user) {
      state.users[user.login] = user.key;
    },
    syncStorage(state) {
      state.users = JSON.parse(localStorage.getItem("users"));
      state.currentUser = JSON.parse(localStorage.getItem("currentUser"));
    },
    changeRoute(state, newRoute) {
      state.currentRoute = newRoute;
    },
  },
  actions: {
    createUser(context, userData) {
      let users = context.state.users || {};
      users[userData.login] = userData.key;

      localStorage.setItem("users", JSON.stringify(users));
      context.commit("syncStorage");

      context.dispatch("changeUser", userData);
    },
    changeUser(context, userData) {
      let currentUser = {};
      currentUser[userData.login] = userData.key;

      localStorage.setItem("currentUser", JSON.stringify(currentUser));
      context.commit("syncStorage");
    },
    closeSession(context) {
      localStorage.removeItem("currentUser");
      context.commit("syncStorage");
    },
    direction(context, to) {
      history.pushState({ param: to }, "", to);
      context.commit("changeRoute", to);
    },
  },
});