<template>
  <a-layout class="layout">
    <a-layout-header class="header">
      <div class="nav-wrapper">
        <a class="logo" @click.prevent="direction('/')">
          <img src="../assets/images/tubes.svg" alt="ViewTube">
        </a>
        <a-menu
          class="nav-menu"
          mode="horizontal"
          :default-selected-keys="['1']"
        >
          <a-menu-item class="nav-menu__item" key="1">
            Поиск
          </a-menu-item>
          <a-menu-item class="nav-menu__item" key="2">
            Избранное
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
    <a-layout-content class="main-content">
      <h1 class="page-title">Поиск видео</h1>
      <a-input-search 
        class="search-field"
        placeholder="Введите здесь..." 
        size="large" 
        icon-position="before"
        @search="search"
      >
        <a-button class="search-btn" type="primary" slot="enterButton">
          Поиск
        </a-button>
        <a-tooltip slot="suffix">
          <SaveRequestBtn/>
        </a-tooltip>
      </a-input-search>
      <Videos :rawVideos="videos"/>
    </a-layout-content>
  </a-layout>
</template>

<script>
import axios from 'axios'

import SaveRequestBtn from './search/SaveRequestBtn.vue'
import Videos from './search/Videos.vue'

export default {
  name: "Search",
  components: {
    SaveRequestBtn,
    Videos
  },
  data: function () {
    return {
      videos: []
    }
  },
  computed: {
    currentUser: function () {
      if (this.$store.state.currentUser) return Object.keys(this.$store.state.currentUser)[0]
      else return ""
    }
  },
  beforeCreate: function () {
    if (!this.$store.state.currentUser) {
      this.$router.replace("/")
    }
  },
  methods: {
    search: function (query) {
      let self = this
      let apiKey = "AIzaSyAeiJf7Uqc0vvxP9duJhFilS5K4UyNgyJ0"

      /* Searching videos */
      axios.get("https://www.googleapis.com/youtube/v3/search", {
        params: {
          key: apiKey,
          part: "snippet",
          type: "video",
          maxResults: 12,
          q: query,
        }
      })
      .then(function (response) {
        let tempVideos = []
        let videosIds = []

        response.data.items.forEach(function (video) {
          videosIds.push(video.id.videoId)

          tempVideos.push({
            id: video.id.videoId,
            title: video.snippet.title,
            channel: video.snippet.channelTitle,
            preview: video.snippet.thumbnails.medium.url
          })
        })

        /* Getting videos views */
        axios.get("https://www.googleapis.com/youtube/v3/videos", {
          params: {
            key: apiKey,
            part: "statistics",
            id: videosIds.join(),
          }
        }).then(function (response) {
          let videos = response.data.items

          for (let i = 0; i < videos.length; i++) {
            tempVideos[i].viewCount = Number(videos[i].statistics.viewCount)
          }

          self.videos = tempVideos.splice(0, tempVideos.length)
        })
      })
    },
    closeSession: function () {
      this.$store.dispatch("closeSession")
      this.$router.replace("/")
    }
  }
}
</script>


<style scoped>
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

.search-field {
  margin-bottom: 30px;
}

.save-request-btn {
  background-color: transparent;
  border: none;
  cursor: pointer;
  outline: none;
}
</style>
