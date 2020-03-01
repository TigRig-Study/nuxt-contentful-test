import { blogModule } from '~/store'
import client from '~/plugins/contentful'

export default async () => {
  if (!blogModule.posts.length)
    await client
      .getEntries({
        content_type: process.env.CTF_BLOG_POST_TYPE_ID,
        order: '-fields.publishedDate'
      })
      .then((res) => {
        console.log('test4', res)
        blogModule.setPosts(res.items)
      })
      .catch(console.error)
}
