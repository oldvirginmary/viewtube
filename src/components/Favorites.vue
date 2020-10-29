<template>
  <a-layout>
    <Header/>
    <a-layout-content class="main-content">
      <h1 class="page-title">Избранное</h1>
      <ul>
        <li class="favorite-search" 
          v-for="(search, index) in searches" 
          :key="index"
          @mouseover="editedSearch = index"
          @mouseleave="editedSearch = new Number()"
          @click="toSearch(index)"
        >
          <p class="favorite-search__title">{{ search.name }}</p>
          <div class="favorite-search__actions" v-show="editedSearch === index">
            <a class="favorite-search__action" 
              @mousedown.prevent
              @click.stop="showModal(index)"
            >
              Редактировать
            </a>
            <a class="favorite-search__action favorite-search__action--red" 
              @mousedown.prevent
              @click.stop="removeSearch(index)"
            >
              Удалить
            </a>
          </div>
        </li>
      </ul>
    </a-layout-content>
    <SaveSearchModal 
      @click-save="saveSearch" 
      @click-cancel-save="closeModal" 
      :is-search-modal-visible="isSearchModalVisible" 
      :search="{...searches[currentSearchIndex]}"
      :func-type="'edit'"
    />
    
  </a-layout>
</template>


<script>
import Header from './main/Header.vue'
import SaveSearchModal from './main/SaveSearchModal.vue'

export default {
  name: "Favorites",
  components: {
    Header,
    SaveSearchModal,
  },
  data: function () {
    return {
      isSearchModalVisible: false,
      editedSearch: new Number(),
      currentSearchIndex: new Number(),
      searches: this.$store.state.users[this.$store.state.currentUser.login].searches,
    }
  },
  beforeCreate: function () {
    if (!this.$store.state.currentUser) this.$router.replace("/")
  },
  methods: {
    saveSearch: function (newSearch) {
      this.closeModal()
      this.searches[this.currentSearchIndex] = newSearch
      this.$store.commit("addSearch", {
        index: this.currentSearchIndex,
        data: newSearch,
      })
      this.isSearchSaved = true
    },
    removeSearch: function (searchIndex) {
      this.$store.commit("removeSearch", searchIndex)
    },
    toSearch: function (searchItemIndex) {
      this.$router.push({ path: 'search', query: this.searches[searchItemIndex] })
    },
    showModal: function (searchIndex) {
      this.currentSearchIndex = searchIndex
      this.isSearchModalVisible = true
    },
    closeModal: function () {
      this.isSearchModalVisible = false
    },
  },
}
</script>


<style lang="scss" scoped>

.favorite-search {
  display: flex;
  justify-content: space-between;
  padding: 8px 12px;
  border-bottom: 2px solid #F1F1F1;
  cursor: pointer;

  &:hover {
    background-color: #F1F1F1;
  }
}

.favorite-search__title {
  text-align: left;
}

.favorite-search__action {
  &--red {
    color: #FF0000;
  }

  &:hover {
    opacity: 0.5;
  }

  &:not(:last-child) {
    margin-right: 10px;
  }
}
</style>