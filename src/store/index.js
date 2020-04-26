import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: null,
    name:'',
    id:0,
    department:'',
    position:'',
  },
  mutations: {
    setToken (state, token) {
      state.token = token
    },
    setName (state, name) {
      state.name = name
    },
    setDepartment (state, department) {
      state.department = department
    },
    setPosition (state, position) {
      state.position = position
    },
    setId (state, id) {
      state.id = id
    },
  },
  actions: {
  },
  modules: {
  }
})
