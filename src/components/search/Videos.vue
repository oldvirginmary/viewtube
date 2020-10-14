<template>
  <section class="videos">
    <a-row 
      v-for="row in videos"
      :key="videos.indexOf(row)"
      class="videos-row"
    >
      <a-col 
        v-for="video in row"
        :key="video.id"
        @click="showVideo(video)"
        class="video"
      >
        <img class="video__preview" :src="video.preview">
        <h2 class="video__title">{{ video.title }}</h2>
        <p class="video__channel">{{ video.channel }}</p>
        <p class="video__views">{{ video.viewCount }} просмотров</p>
      </a-col>
    </a-row>
  </section>
</template>


<script>
export default {
  name: "Videos",
  props: ["rawVideos"],
  computed: {
    videos: function () {
      let rawVideos = this.rawVideos.slice()
      let videos = []

      for (let i = 0; i < rawVideos.length; i++) {
        
        if (this.rawVideos.length - i <= 4) {
          videos.push(rawVideos.splice(i, 4))
        } else {
          videos.push(rawVideos.splice(i, 4))
          i--
        }
      }

      return videos
    }
  },
  methods: {
    showVideo: function (video) {
      window.location.href = "https://www.youtube.com/watch?v=" + video.id
    }
  }
}
</script>


<style scoped>
.videos-row {
  display: flex;
  margin-bottom: 30px;
}

.video {
  width: 235px;
  cursor: pointer;
}

.video:not(:last-child) {
  margin-right: 28px;
}

.video:hover .video__preview {
  box-shadow: 0 0 0 3px #1890ff;
}

.video__preview {
  width: 100%;
}

.video__title,
.video__channel,
.video__views {
  text-align: left;
}

.video__title {
  font-size: 14px;
}

.video__channel {
  font-size: 13px;
  color: gray;
}

.video__views {
  font-size: 13px;
  color: gray;
}
</style>