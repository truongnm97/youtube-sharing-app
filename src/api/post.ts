import { useMutation, useQuery } from 'react-query'
import { axiosInstance } from './axios'
import { AxiosResponse } from 'axios'
import { generatePath } from '../utils'

export const useGetPosts = (page: number, pageSize?: number, options?: TQueryOptions) => {
  const url = generatePath('/post/:page/:pageSize', { page, pageSize })

  return useQuery(
    url,
    () => {
      return axiosInstance.get<TPostsResponse, AxiosResponse<TPostsResponse>>(url)
    },
    options as any,
  )
}

export const useCreatePost = (options?: TMutationOptions) => {
  return useMutation((payload: TCreatePostParams) => {
    return axiosInstance.post<
      TCreatePostResponse,
      AxiosResponse<TCreatePostResponse>,
      TCreatePostParams
    >('/post', payload)
  }, options)
}
