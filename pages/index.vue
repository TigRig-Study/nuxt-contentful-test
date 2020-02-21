<template>
  <div class="container">
    <div v-if="posts.length">
      <ul v-for="(post, i) in posts" :key="i">
        <li>{{ post.fields.title }}</li>
        <ul>
          <img
            v-if="post.fields.image !== undefined"
            :src="post.fields.image.fields.file.url"
            :alt="post.fields.image.fields.title"
            :aspect-ratio="16 / 9"
            max-width="400"
            max-height="225"
          />
          <li>{{ post.fields.body }}</li>
          <li>{{ post.fields.publishedDate }}</li>
        </ul>
      </ul>
    </div>
    <div v-else>
      投稿された記事はありません。
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

import client from '~/plugins/contentful'

@Component
export default class Index extends Vue {
  async asyncData({ env }) {
    let posts: any = []
    await client
      .getEntries({
        content_type: env.CTF_BLOG_POST_TYPE_ID,
        order: '-fields.publishedDate'
      })
      .then((res) => (posts = res.items))
      .catch(console.error)
    console.log(posts)
    return { posts }
  }
}
</script>
