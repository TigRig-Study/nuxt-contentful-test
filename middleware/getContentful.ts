export default async ({ store }) => {
  if (!store.state.blogModule.posts.length)
    await store.dispatch('blogModule/getPosts')
}
