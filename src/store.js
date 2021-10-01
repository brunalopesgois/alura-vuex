import Vue from 'vue';
import Vuex from 'vuex';
import http from '@/http';

Vue.use(Vuex);

const estado = {
  token: localStorage.getItem('token') || '',
  usuario: {}
};

const mutations = {
  DEFINIR_USUARIO_LOGADO(state, { token, usuario }) {
    state.token = token;
    state.usuario = usuario;
  },
  DESLOGAR_USUARIO(state) {
    state.token = null;
    state.usuario = {};
  }
};

const actions = {
  efetuarLogin({ commit }, usuario) {
    return new Promise((resolve, reject) => {
      http.post('auth/login', usuario)
        .then(res => {
          commit('DEFINIR_USUARIO_LOGADO', {
            token: res.data.access_token,
            usuario: res.data.user
          });
          localStorage.setItem('token', res.data.access_token)
          resolve(res.data);
        })
        .catch(e => {
          console.log(e);
          reject(e);
        });
    });
  }
};

const getters = {
  usuarioEstaLogado: state => Boolean(state.token)
};

export default new Vuex.Store({
  state: estado,
  mutations,
  actions,
  getters
});