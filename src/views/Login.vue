<template>
  <div class="container">
    <h1>Login</h1>
    <form @submit.prevent="efetuarLogin">
      <div class="form-group">
        <label for="email">Email</label>
        <input type="email" class="form-control" v-model="usuario.email">
      </div>
      <div class="form-group">
        <label for="senha">Senha</label>
        <input type="password" class="form-control" v-model="usuario.senha">
      </div>
      <p class="alert alert-danger" v-if="mensagemErro">{{ mensagemErro }}</p>
      <button type="submit" class="btn btn-primary brn-block">
        Logar
      </button>
      <router-link :to="{ name: 'novo.usuario' }">
        Não possui um cadastro, cadastre-se aqui!
      </router-link>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      usuario: {
        email: '',
        senha: ''
      },
      mensagemErro: ''
    }
  },
  methods: {
    efetuarLogin() {
      this.$store.dispatch('efetuarLogin', this.usuario)
        .then(() => {
          this.$router.push({ name: 'gerentes' });
          this.mensagemErro = '';
        })
        .catch(e => {
          console.log(e);
          if (e.request.status === 401) {
            this.mensagemErro = 'E-mail ou senha inválido(s)';
          }
        });

      // this.$http.post('auth/login', this.usuario)
      //   .then(res => {
      //     console.log(res);
      //     localStorage.setItem('token', res.data.access_token);
      //     Não é possível alterar o estado diretamente, necessário usar mutations,
      //     código abaixo para exemplificar:
      //     this.$store.state.token = res.data.access_token;
      //     this.$store.state.usuario = res.data.user;
      //     this.$store.commit('DEFINIR_USUARIO_LOGADO', {
      //       token: res.data.access_token,
      //       usuario: res.data.user
      //     });
      //     this.$router.push({ name: 'gerentes' })
      //   })
      //   .catch(e => console.log(e));
    }
  }
}
</script>

<style>

</style>