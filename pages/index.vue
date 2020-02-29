<template>
  <div class="container">
    <div v-if="posts.length">
      <ul v-for="(post, i) in posts" :key="i" @click="navigateTo(post)">
        <li>{{ post.fields.title }}</li>
        <li>
          <img
            v-if="post.fields.image !== undefined"
            :src="post.fields.image.fields.file.url"
            :alt="post.fields.image.fields.title"
          />
        </li>
      </ul>
    </div>
    <div v-else>
      投稿された記事はありません。
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

import { blogModule } from '~/store'

@Component
export default class Index extends Vue {
  get linkTo() {
    return (name, obj) => {
      return blogModule.linkTo(name, obj)
    }
  }

  navigateTo(blog) {
    this.$router.push(this.linkTo('posts', blog))
  }

  async asyncData() {
    await blogModule.getPosts()
    const posts = blogModule.posts
    return { posts }
  }
}
</script>
