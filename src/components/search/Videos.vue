<template>
  <section :class="[
      'videos',
      {'videos--list': displayType === 'list'},
      {'videos--grid': displayType === 'grid'},
    ]"
  >
    <a 
      class="video"
      v-for="video in videos.items" 
      :href="getVideoLink(video)"
      :key="video.id"
      target="_blank"
    >
      <img class="video__preview" :src="video.preview">
      <div class="video__description-wrapper">
        <h2 class="video__title">
          {{ displayType === "grid" ? limitStr(video.title, 60) : limitStr(video.title, 400) }}
        </h2>
        <p class="video__channel">{{ video.channel }}</p>
        <p class="video__views">{{ video.viewCount }} просмотров</p>
      </div>
    </a>
  </section>
</template>


<script>
import limitStr from './functions/limitStr.js'

export default {
  name: "Videos",
  props: ["videos", "display-type"],
  data: function () {
    return {isItVis: true,}
  },
  methods: {
    getVideoLink: function (video) {
      return "https://www.youtube.com/watch?v=" + video.id
    },
    limitStr: function (str, num, symb) {
      return limitStr(str, num, symb)
    }
  },
}
</script>


<style lang="scss" scoped>

.videos {
  &--grid {
    display: flex;
    flex-wrap: wrap;

    .video {
      flex-direction: column;
      width: 235px;

      &:not(:nth-child(4n)) {
        margin-right: 28px;
      }
    }

    .video__preview {
      width: 100%;
      margin-bottom: 10px;
    }
  }

  &--list {
    .video {
      width: 700px;
      margin-bottom: 22px;
    }

    .video__preview {
      width: 235px;
      margin-right: 20px;
    }
  }
}

.video {
  display: flex;
  margin-bottom: 28px;
  cursor: pointer;
}

.video__title,
.video__channel,
.video__views {
  text-align: left;
}

.video__title {
  margin-bottom: 8px;
  font-size: 14px;
  line-height: 16px;
  font-weight: bold;
}

.video__channel,
.video__views {
  font-size: 13px;
  line-height: 16px;
  color: gray;
}
</style>