<template>
  <div class="save-search">
    <a-popover v-model="isPopoverVisible" trigger="none">
      <div class="popover-content"
        slot="content"
        @mouseenter="_resetPopoverTimout"
        @mouseleave="hidePopover"
      >
        <p>Поиск сохранён в разделе "Избранное"</p>
        <router-link to="favorites">Перейти в избранное</router-link>
      </div>
      <button class="save-request-btn" @click="showModal">
        <a-icon class="icon" type="heart" :theme="isSearchSaved ? 'twoTone' : 'outlined'"/>
      </button>
    </a-popover>
    <SaveSearchModal 
      @click-save="saveSearch" 
      @click-cancel-save="closeModal" 
      :is-search-modal-visible="isSearchModalVisible" 
      :search="{...search}"
      :default-request="{...defaultRequest}"
      :func-type="isSearchSaved ? 'edit' : 'save'"
    />
  </div>
</template>


<script>
import SaveSearchModal from '../main/SaveSearchModal.vue'

export default {
  name: "SaveSearch",
  props: ["search", "default-request"],
  components: {
    SaveSearchModal,
  },
  data: function () {
    return {
      isSearchModalVisible: false,
      isPopoverVisible: false,
      popoverTimeout: "",
    }
  },
  computed: {
    isSearchSaved: {
      get () {
        let allUsers = this.$store.state.users
        let currentUser = this.$store.state.currentUser
        let currentUserSearches = allUsers[currentUser.login].searches

        for (let i = 0; i < currentUserSearches.length; i++) {
          if (currentUserSearches[i].name === this.search.name) {
            return true
          }
        }

        return false
      },
      set (newValue) {
        return newValue
      }
    },
  },
  watch: {
    search: function () {
      return this.isSearchSaved
    }
  },
  methods: {
    saveSearch: function (search) {
      this.closeModal()
      this.showPopover()
      
      let newFavoriteSearch = { data: search }

      if (this.isSearchSaved) {
        let allUsers = this.$store.state.users
        let currentUser = this.$store.state.currentUser
        let currentUserSearches = allUsers[currentUser.login].searches

        for (let i = 0; i < currentUserSearches.length; i++) {
          if (currentUserSearches[i].name === this.search.name) {
            newFavoriteSearch.index = i
          }
        }
      }

      this.$store.commit("addSearch", newFavoriteSearch)
      this.$emit("save-search", { ...search })
      this.isSearchSaved = true
    },
    showModal: function () {
      this.isSearchModalVisible = true
    },
    closeModal: function () {
      this.isSearchModalVisible = false
    },
    showPopover: function () {
      this.isPopoverVisible = true
      this.popoverTimeout = setTimeout(this.hidePopover, 5000)
    },
    hidePopover: function () {
      this.isPopoverVisible = false
    },
    _resetPopoverTimout: function () {
      clearTimeout(this.popoverTimeout)
    },
  }
}
</script>


<style scoped>

.save-request-btn {
  background-color: transparent;
  border: none;
  cursor: pointer;
  outline: none;
}

.icon {
  color: #1890ff;
}

.popover-content {
  width: 220px;
}

.popover-content p {
  padding-bottom: 10px;
}
</style>