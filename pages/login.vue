<template>
  <div class="login-form">
    <h1>Login Form</h1>
    <form v-if="!$store.state.authUser" @submit.prevent="login">
      <p v-if="formError" class="error">
        {{ formError }}
      </p>
      <input
        v-model="formUsername"
        type="text"
        name="username"
        placeholder="Username"
        required
      />
      <input
        v-model="formPassword"
        type="password"
        name="password"
        placeholder="Password"
        required
      />
      <input type="submit" />
    </form>
    <div v-else>
      <p>Hello {{ $store.state.authUser.username }}!</p>
      <p>
        I am the secret content, I am shown only when the user is connected.
      </p>
      <p><i>You can also refresh this page, you'll still be connected!</i></p>
      <button @click="logout">
        Logout
      </button>
    </div>
    <p>
      <NuxtLink to="/secret">
        Super secret page
      </NuxtLink>
    </p>
  </div>
</template>

<script>
export default {
  head() {
    return {
      title: "Login"
      // meta: [
      //   { name: "twitter:title", content: this.post.title },
      //   { name: "twitter:description", content: 'this.post.content '},
      //   { name: "twitter:image", content: "https://i.imgur.com/UYP2umJ.png" },
      //   { name: "twitter:card", content: "summary_large_image" }
      // ]
    };
  },
  data() {
    return {
      formError: null,
      formUsername: "",
      formPassword: ""
    };
  },
  methods: {
    async login() {
      try {
        await this.$store.dispatch("login", {
          username: this.formUsername,
          password: this.formPassword
        });
        this.formUsername = "";
        this.formPassword = "";
        this.formError = null;
      } catch (e) {
        this.formError = e.message;
      }
    },
    async logout() {
      try {
        await this.$store.dispatch("logout");
      } catch (e) {
        this.formError = e.message;
      }
    }
  }
};
</script>

<style scoped>
.login-form {
  width: 300px;
  margin: 0 auto;
  font-family: Tahoma, Geneva, sans-serif;
}
.login-form h1 {
  text-align: center;
  color: #4fb99f;
  font-size: 24px;
  padding: 20px 0 20px 0;
}
.login-form input[type="password"],
.login-form input[type="text"] {
  width: 100%;
  padding: 15px;
  border: 1px solid #dddddd;
  margin-bottom: 15px;
  box-sizing: border-box;
}
.login-form input[type="submit"] {
  width: 100%;
  padding: 15px;
  background-color: #535b63;
  border: 0;
  box-sizing: border-box;
  cursor: pointer;
  font-weight: bold;
  color: #ffffff;
}
</style>
