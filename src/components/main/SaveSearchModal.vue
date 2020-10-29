<template>
  <a-modal 
    v-model="isModalVisible" 
    @ok="clickSave" 
    @cancel="clickCancelSave" 
    ok-text="Сохранить"
    cancel-text="Отмена"
    centered
  >
    <h2 class="modal-title">{{ funcType === "save" ? "Сохранить запрос" : "Изменить запрос" }}</h2>
    <a-form-model
      class="modal-form"
      ref="modalForm"
      :rules="rules"
      :model="request"
    >
      <a-form-model-item class="modal-form__field-item" label="Запрос">
        <a-input
          class="modal-form__field"
          v-model="request.query"
          :disabled="funcType === 'save'"
        />
      </a-form-model-item>
      <a-form-model-item class="modal-form__field-item" label="Название" prop="name">
        <a-input
          class="modal-form__field"
          v-model="request.name"
          placeholder="Укажите название"
        />
      </a-form-model-item>
      <a-form-model-item class="modal-form__field-item" label="Сортировать по">
        <a-select :default-value="request.sortBy" @change="selectSorting">
          <a-select-option value="searchSortUnspecified">
            Без сортировки
          </a-select-option>
          <a-select-option value="date">
            По дате
          </a-select-option>
          <a-select-option value="rating">
            По рейтингу
          </a-select-option>
          <a-select-option value="viewCount">
            По количеству просмотров
          </a-select-option>
          <a-select-option value="relevance">
            Рекомендуемые
          </a-select-option>
          <a-select-option value="title">
            По заголовку
          </a-select-option>
          <a-select-option value="videoCount">
            По количеству видео
          </a-select-option>
        </a-select>
      </a-form-model-item>
      <a-form-model-item 
        class="modal-form__field-item modal-form__field-item--slider" 
        label="Количество видео в запросе"
      >
        <div class="fields-wrapper">
          <a-slider class="input-slider" v-model="request.maxAmount" :min="1" :max="50" />
          <a-input-number class="input-number" v-model="request.maxAmount" :min="1" :max="50" />
        </div>
      </a-form-model-item>
    </a-form-model>
  </a-modal>
</template>


<script>
export default {
  name: "SaveSearchModal",
  props: {
    "is-search-modal-visible": {
      type: Boolean,
      required: true
    }, 
    "search": {
      type: Object,
      required: true
    },
    "default-request": {
      type: Object,
      required: false
    },
    "func-type": {
      type: String,
      required: true,
    },
  },
  data: function () {
    return {
      rules: {
        name: [
          { required: true, message: " ", trigger: "blur" },
          { required: true, message: " ", trigger: "change" },
        ],
      },
      request: {
        query: this.search.query || "",
        name: this.search.name || "",
        sortBy: this.search.sortBy || "searchSortUnspecified",
        maxAmount: Number(this.search.maxAmount) || 12,
      },
    }
  },
  computed: {
    isModalVisible: {
      get () {
        return this.isSearchModalVisible
      },
      set (newValue) {
        return newValue
      }
    },
  },
  watch: {
    search: {
      handler () {
        let mask = this.defaultRequest || {}

        this.request = Object.assign(
          { ...mask },
          this.search,
        )
      },
      deep: true,
    },
  },
  methods: {
    clickSave: function () {
      let isModalFormValid = false

      this.$refs.modalForm.validate(function (formValid) {
        if (formValid) isModalFormValid = true
      })

      if (isModalFormValid) this.$emit("click-save", this.request)
    },
    clickCancelSave: function () {
      this.$emit("click-cancel-save")
    },
    selectSorting: function (value) {
      this.request.sortBy = value
    },
  },
}
</script>


<style lang="scss" scoped>

.modal-title {
  margin-bottom: 10px;
  text-align: center;
}

.modal-form {
  padding: 5px;
}

.modal-form__field-item {
  &--slider {
    .fields-wrapper {
      display: flex;
      justify-content: space-between;
    }
    
    .input-slider {
      flex-grow: 1;
      margin-right: 40px;
    }
  }
}

.modal-form__field-item:last-child {
  margin-bottom: 0;
}
</style>