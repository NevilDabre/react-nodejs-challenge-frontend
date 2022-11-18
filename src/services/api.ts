import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:8000',
});

export const listPosts = async (token: string) => {
  const response = await instance.get('/post', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data
}

export const deletePost = async (token: string, postId: number) => {
  const response = await instance.delete(`/post/${postId}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data
  
}

export const createPost = async (token: string, content: string) => {
  const response = await instance.post(`/post`, {"content": content}, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data.post
}