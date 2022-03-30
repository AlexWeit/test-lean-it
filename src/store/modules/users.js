import * as api from '../../api'

export default {
  namespaced: true,
  state: {
    data: []
  },
  mutations: {
    SET_USERS: (state, payload) => {
      state.data = payload
    }
  },
  actions: {
    async fetchUsers ({ commit }) {
      try {
        const { data } = await api.users.getUsers()
        commit('SET_USERS', data)
      } catch (e) {
        console.log(e)
        throw e
      }
    }
  }
}
