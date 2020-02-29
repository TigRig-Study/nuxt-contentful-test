import { blogModule } from '~/store'

export default async () => {
  if (!blogModule.posts.length) await blogModule.getPosts()
}
