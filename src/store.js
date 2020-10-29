import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

let local = {
  users: localStorage.getItem("users") ? 
    JSON.parse(localStorage.getItem("users")) : null,
  currentUser: localStorage.getItem("currentUser") ? 
    JSON.parse(localStorage.getItem("currentUser")) : null,
}

export default new Vuex.Store({
  state: {
    users: local.users,
    currentUser: local.currentUser,
  },
  mutations: {
    createUser(state, userData) {
      let users = state.users || {}
      users[userData.login] = {
        key: userData.key,
        searches: [],
      }

      state.users = users
      localStorage.setItem("users", JSON.stringify(users))
    },
    changeUser(state, userData) {
      let user = state.currentUser || {}
      user = {
        login: userData.login,
        key: state.users[userData.login].key,
      }

      state.currentUser = user

      localStorage.setItem("currentUser", JSON.stringify(user))
    },
    closeSession(state) {
      state.currentUser = null
      localStorage.removeItem("currentUser")
    },
    addSearch(state, search) {
      if (typeof search.index == "number") { // существует ли свойство index
        state.users[state.currentUser.login]
          .searches[search.index] = search.data
      } else {
        state.users[state.currentUser.login].searches.push(search.data)
      }
      
      localStorage.setItem("users", JSON.stringify(state.users))
    },
    removeSearch(state, searchIndex) {
      state.users[state.currentUser.login].searches.splice(searchIndex, 1)
      
      localStorage.setItem("users", JSON.stringify(state.users))
    },
  },
})