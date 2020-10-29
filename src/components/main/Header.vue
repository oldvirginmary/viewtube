<template>
  <a-layout-header class="header">
    <div class="nav-wrapper">
      <a class="logo" @click.prevent="$router.push('/')">
        <IconBase width="48" height="48" viewBox="0 0 512 512" color="black">
          <IconTubes />
        </IconBase>
      </a>
      <a-menu
        class="nav-menu"
        mode="horizontal"
        :default-selected-keys="[currentPageKey]"
      >
        <a-menu-item class="nav-menu__item" key="1">
          <router-link to="search">Поиск</router-link>
        </a-menu-item>
        <a-menu-item class="nav-menu__item" key="2">
          <router-link to="favorites">Избранное</router-link>
        </a-menu-item>
      </a-menu>
    </div>
    <div class="current-user">
      <a-avatar class="current-user__avatar" icon="user" />
      <span class="current-user__login">{{ currentUser }}</span>
    </div>
    <div class="nav-wrapper">
      <a-menu
        class="nav-menu"
        mode="horizontal"
      >
        <a-menu-item @click="closeSession" class="nav-menu__item" key="1">
          Выход
        </a-menu-item>
      </a-menu>
    </div>
  </a-layout-header>
</template>


<script>
import IconBase from './IconBase.vue'
import IconTubes from './icons/IconTubes.vue'

export default {
  name: "Header",
  components: {
    IconBase,
    IconTubes,
  },
  computed: {
    currentUser: function () {
      if (this.$store.state.currentUser) return this.$store.state.currentUser.login
      else return ""
    },
    currentPageKey: function () {
      let pages = {
        "/search": '1',
        "/favorites": '2',
      }
      return pages[this.$route.path]
    },
  },
  methods: {
    closeSession: function () {
      this.$store.commit("closeSession")
      this.$router.replace("/")
    },
  }
}
</script>


<style scoped>

.logo {
  margin-right: 30px;
}

.current-user {
  display: flex;
  align-items: center;
  margin-left: auto;
  margin-right: 20px;
}

.current-user__avatar {
  margin-right: 10px;
}

.current-user__login {
  color: rgba(0, 0, 0, 0.45);
}
</style>