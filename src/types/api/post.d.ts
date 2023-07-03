type TPost = {
  id: string
  url: string
  youtubeId: string
  createdAt: string
  updatedAt: string
  user: {
    id: string
    email: string
  }
}

type TPostsResponse = {
  data: TPost[]
  page: number
  pageSize: number
  total: number
}

type TCreatePostParams = {
  url: string
}

type TCreatePostResponse = {
  id: string
  url: string
  createdAt: string
  updatedAt: string
  userId: string
}
