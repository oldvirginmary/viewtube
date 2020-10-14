<template>
  <a-popover v-model="isPopoverVisible" trigger="click">
    <div class="popover-content"
      slot="content"
      @mouseenter="resetPopoverTimout"
      @mouseleave="hidePopover"
    >
      <p>Поиск сохранён в разделе "Избранное"</p>
      <a href="">Перейти в избранное</a>
    </div>
    <button class="save-request-btn" @click="setPopoverTimeout">
      <a-icon class="icon" type="heart" :theme="isRequestSaved ? 'twoTone' : 'outlined'"/>
    </button>
  </a-popover>
</template>


<script>
export default {
  name: "SaveRequestBtn",
  data: function () {
    return {
      isPopoverVisible: false,
      isRequestSaved: false,
      popoverTimeout: ""
    }
  },
  methods: {
    resetPopoverTimout: function () {
      clearTimeout(this.popoverTimeout)
    },
    setPopoverTimeout: function () {
      this.isRequestSaved = true
      this.popoverTimeout = setTimeout(this.hidePopover, 5000)
    },
    hidePopover: function () {
      this.isPopoverVisible = false
    }
  }
}
</script>


<style lang="scss" scoped>
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