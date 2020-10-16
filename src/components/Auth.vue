<template>
  <a-layout class="auth-block">
    <img class="logo" src="../assets/images/tubes.svg" alt="ViewTube">
    <h1 class="page-title">{{ isRegistration ? 'Создание аккаунта' : 'Вход' }}</h1>
    <a-form-model class="auth-form" 
      @submit.prevent="submitUserForm('/search')"
      ref="userForm"
      :model="user"
      :rules="rules"
    >
      <a-form-model-item class="auth-form__field-item" prop="login">
        <a-input
          class="auth-form__field"
          size="large"
          placeholder="Введите логин" 
          v-model="user.login"></a-input>
      </a-form-model-item>
      <a-form-model-item class="auth-form__field-item" prop="password">
        <a-input-password
          class="auth-form__field"
          size="large"
          placeholder="Введите пароль" 
          v-model="user.password"></a-input-password>
      </a-form-model-item>
      <a-form-model-item>
        <a-button class="auth-form__button"
          size="large"
          type="primary"
          html-type="submit"
        >
          {{ isRegistration ? 'Регистрация' : 'Войти' }}
        </a-button>
        <a href="" @click.prevent="switchTarget">{{ isRegistration ? 'Вход' : 'Регистрация' }}</a>
      </a-form-model-item>
    </a-form-model>
  </a-layout>
</template>


<script>
import { login, registration } from "./auth/functions/login.js"

export default {
  name: "Auth",
  data: function () {
    return {
      isRegistration: false,
      user: {
        login: "",
        password: "",
      },
      rules: {
        login: [
          { required: true, message: "Введите логин", trigger: "blur" },
          { required: true, message: "Введите логин", trigger: "change" },
        ],
        password: [
          { required: true, message: "Введите пароль", trigger: "blur" },
          { required: true, message: "Введите пароль", trigger: "change" },
        ]
      },
      errorBannerMessage: ""
    }
  },
  computed: {
    allUsers: function () {
      return JSON.parse(JSON.stringify(this.$store.state.users)) || {}
    }
  },
  beforeCreate: function () {
    if (this.$store.state.currentUser) {
      this.$router.replace("/search")
    }
  },
  methods: {
    submitUserForm: function (to) {
      let self = this
      let user = JSON.parse(JSON.stringify(self.user))

      this.$refs.userForm.validate(formValid => {
        if (!formValid) return

        let isCorrect = false
        let userToken = {}

        if (self.isRegistration) {
          userToken = registration(user)

          self.$store.dispatch("createUser", userToken)
          isCorrect = true

        } else {
          userToken = login(user, self.allUsers)

          if (userToken.key) {
            self.$store.dispatch("changeUser", userToken)
            isCorrect = true
          }
        }

        if (isCorrect) 
          self.$router.push({ path: to })

        else {
          self.$notification.error({
            message: "Пользователь не найден",
            description: "Неверный логин и/или пароль",
          })

          self.resetUserForm() 
        }
      })
    },
    resetUserForm: function () {
      this.$refs.userForm.resetFields()
    },
    switchTarget: function () {
      this.isRegistration = !this.isRegistration
    }
  }
}
</script>


<style scoped>
.auth-block {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  display: flex;
  flex-direction: column;
  align-items: center;
  width: 500px;
  padding-top: 50px;
  padding-bottom: 20px;

  border: 1px solid #575757;
  border-radius: 5px;
}

.logo {
  width: 80px;
  margin-bottom: 25px;
  margin-right: 0;
}

.page-title {
  margin-bottom: 10px;
  font-size: 24px;
}

.auth-form {
  width: 350px;
}

.auth-form__field-item {
  padding-bottom: 5px; /* margin without jumping */
}

.auth-form__field {
  margin-bottom: 3px;
}

.auth-form__button {
  margin-right: 20px;
}


@media (max-width: 520px) {
  .auth-block {
    position: static;
    transform: none;

    width: 100%;
    height: 100vh;
    padding-left: 30px;
    padding-right: 30px;
    border: none;
    border-radius: 0;
  }

  .auth-form {
    width: 100%;
  }
}
</style>