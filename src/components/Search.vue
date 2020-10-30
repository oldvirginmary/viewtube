<template>
  <a-layout>
    <Header/>
    <a-layout-content :class="['main-content', {'main-content--center': !isSearchCompleted}]">
      <section class="search-form">
        <h1 class="page-title">Поиск видео</h1>
        <a-input-search 
          class="search-field"
          placeholder="Ждём запрос здесь..." 
          size="large" 
          icon-position="before"
          @search="search"
        >
          <a-button class="search-btn" type="primary" slot="enterButton">
            Поиск
          </a-button>
          <a-tooltip slot="suffix" v-show="isSearchCompleted">
            <SaveSearch 
              :search="request" 
              :default-request="defaultRequest" 
              @save-search="searchSaveHandler"
            />
          </a-tooltip>
        </a-input-search>
      </section>
      <section class="filter-panel" v-show="isSearchCompleted">
        <div class="request-description">
          <h2 class="request-text">Видео по запросу «{{ request.query }}»</h2>
          <p class="videos-amount">{{ videos.videosAmount }}</p>
        </div>
        <div class="videos-filters">
          <button 
            :class="['videos-filters__btn', {'videos-filters__btn--current': displayType === 'list'}]"
            @click="displayType = 'list'"
          >
            <IconBase width="24" height="24">
              <IconList/>
            </IconBase>
          </button>
          <button 
            :class="['videos-filters__btn', {'videos-filters__btn--current': displayType === 'grid'}]"
            @click="displayType = 'grid'"
          >
            <IconBase width="24" height="24">
              <IconGrid/>
            </IconBase>
          </button>
        </div>
      </section>
      <Videos :videos="videos" :display-type="displayType" v-show="isSearchCompleted"/>
    </a-layout-content>
  </a-layout>
</template>


<script>
import axios from 'axios'

import Header from './main/Header.vue'
import SaveSearch from './search/SaveSearch.vue'
import Videos from './search/Videos.vue'

import IconBase from './main/IconBase.vue'
import IconList from './main/icons/IconList.vue'
import IconGrid from './main/icons/IconGrid.vue'

import {apiKey} from '../../api-key.js'

export default {
  name: "Search",
  components: {
    Header,
    SaveSearch,
    Videos,
    IconBase,
    IconList,
    IconGrid,
  },
  data: function () {
    return {
      displayType: "list", // list/grid
      request: {
        query: "",
        name: "",
        sortBy: "",
        maxAmount: new Number(),
      },
      defaultRequest: {
        query: "",
        name: "",
        sortBy: "searchSortUnspecified",
        maxAmount: 12,
      },
      videos: {
        videosAmount: "",
        items: []
      },
      isSearchCompleted: false,
    }
  },
  watch: {
    $route: function (to) {
      if (Object.keys(to.query).length === 0) this.isSearchCompleted = false
    }
  },
  beforeCreate: function () {
    if (!this.$store.state.currentUser) this.$router.replace("/")
  },
  created: function () {
    if (Object.keys(this.$route.query).length > 0) {
      this.request = Object.assign(
        { ...this.defaultRequest }, 
        { ...this.$route.query },
        { maxAmount: Number(this.$route.query.maxAmount) }
      )

      this.search()
    }
  },
  methods: {
    searchSaveHandler: function (search) {
      this.request = search

      let allUsers = this.$store.state.users
      let currentUser = this.$store.state.currentUser
      let currentUserSearches = allUsers[currentUser.login].searches

      for (let i = 0; i < currentUserSearches.length; i++) {
        if (currentUserSearches[i].name === this.request.name) {
          this.$router.push({ query: this.request })
        }
      }

      this.search()
    },
    search: function (query) {
      let self = this

      if (query) {
        self.request = Object.assign(
          { ...self.defaultRequest }, 
          { query: query }
        )

        self.$router.push({ query: { query: self.request.query } })
      }

      self.request.query.replace(" ", "")

      if (self.request.query === "") {
        return
      }

      axios.get("https://www.googleapis.com/youtube/v3/search", {
        params: {
          key: apiKey,
          part: "snippet",
          type: "video",
          order: self.request.sortBy || "searchSortUnspecified",
          maxResults: self.request.maxAmount || 12,
          q: self.request.query,
        }
      }).then(function (response) {
        let tempVideos = []
        let videosIds = []

        self.videos.videosAmount = response.data.pageInfo.totalResults

        response.data.items.forEach(function (video) {
          videosIds.push(video.id.videoId)

          tempVideos.push({
            id: video.id.videoId,
            title: video.snippet.title
              .replace(/&amp;quot;/g,'"').replace(/&amp;quot/g,'"').replace(/&quot;/g,'"'),
            channel: video.snippet.channelTitle,
            preview: video.snippet.thumbnails.medium.url,
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

          self.videos.items = tempVideos.splice(0, tempVideos.length)
        })
      }).then(function () {
        self.isSearchCompleted = true
      })
    },
  }
}
</script>


<style lang="scss" scoped>

.main-content--center {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 0;

  .search-form {
    width: 480px;
    margin-bottom: 0;
  }

  .page-title {
    text-align: center;
  }
}

.search-form {
  margin-bottom: 35px;
}

.filter-panel,
.request-description,
.videos-filters {
  display: flex;
  align-items: center;
}

.filter-panel {
  justify-content: space-between;
  margin-bottom: 22px;
}

.videos-filters__btn {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  border: 2px solid transparent;
  outline: none;
  cursor: pointer;

  svg {
    stroke: #000000;
    width: 32px;
    height: 32px;
  }

  &--current svg {
    stroke: #1890ff;
  }
}

.request-text,
.videos-amount {
  font-size: 18px;
  line-height: 24px;
}

.request-text {
  margin-right: 15px;
}

.videos-amount {
  color: rgba(23, 23, 25, 0.3);
}
</style>