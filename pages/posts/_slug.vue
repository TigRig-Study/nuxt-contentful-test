<template>
  <div class="container">
    <template v-if="currentPost">
      {{ currentPost.fields.title }}
      <img
        v-if="currentPost.fields.image !== undefined"
        :src="currentPost.fields.image.fields.file.url"
        :alt="currentPost.fields.image.fields.title"
        :aspect-ratio="16 / 9"
        width="700"
        height="400"
        class="mx-auto"
      />
      {{ currentPost.fields.publishedDate }}<br />
      {{ currentPost.fields.body }}
    </template>
    <template v-else>
      お探しの記事は見つかりませんでした。
    </template>

    <div>
      <nuxt-link to="/">
        <fa :icon="faAngleDoubleLeft" />
        <span>ホームへ戻る</span>
      </nuxt-link>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { faAngleDoubleLeft } from '@fortawesome/free-solid-svg-icons'
import client from '~/plugins/contentful'

@Component
export default class Slug extends Vue {
  get faAngleDoubleLeft() {
    return faAngleDoubleLeft
  }

  async asyncData({ env, params, payload }) {
    if (payload) return { currentPost: payload }

    let currentPost: any = null
    await client
      .getEntries({
        content_type: env.CTF_BLOG_POST_TYPE_ID,
        'fields.slug': params.slug
      })
      .then((res) => {
        currentPost = res.items[0]
      })
      .catch(console.error)
    return { currentPost }
  }
}
</script>
