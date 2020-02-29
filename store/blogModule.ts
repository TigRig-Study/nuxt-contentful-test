import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators'
import client from '~/plugins/contentful'

@Module({ stateFactory: true, namespaced: true, name: 'blogModule' })
export default class BlogModule extends VuexModule {
  posts: any[] = []

  get linkTo() {
    return (name, obj) => {
      return { name: `${name}-slug`, params: { slug: obj.fields.slug } }
    }
  }

  @Mutation
  setPosts(posts: any[]) {
    this.posts = posts
  }

  @Action
  async getPosts() {
    await client
      .getEntries({
        content_type: process.env.CTF_BLOG_POST_TYPE_ID,
        order: '-fields.publishedDate'
      })
      .then((res) => this.setPosts(res.items))
      .catch(console.error)
  }
}
