import { blogModule } from '~/store'

export default async () => {
  if (blogModule.posts.length === 0) await blogModule.getPosts()
}
