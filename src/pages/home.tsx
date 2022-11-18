import { Box, Button, Heading, Input, FormControl, FormLabel, Flex, Spacer } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { createPost, listPosts } from "../services/api";
import Post from "../components/Post";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { RootState } from "../store";
import { logout } from "../store/slices/user";

export default function Home () {


  const userData: any = useSelector<RootState>((state) => state.user)
  console.log(userData)
  
  

  const [posts, setPosts] = useState<any[]>([]);
  const [postContent, setPostContent] = useState('')

  const token = userData.user.accessToken
  const name = userData.user.name

  
  const handlePosts = async () => {
    if(token){
      const data = await listPosts(token);
      setPosts(data.reverse()) 
    }
  }
  useEffect(() => {
    handlePosts()
  }, [token])

  const dispatch = useDispatch();
  let navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout({}))
    navigate('/');
  }

  const createNewPost = async () => {
    if(token){
      const data = await createPost(token, postContent);
      setPosts([data, ...posts])
    }
  }

  return (
    <>
      <Spacer/>
      <Flex bgColor='black' display='flex' width='full' alignItems='flex-end'>
        <Button onClick={handleLogout} m={10} colorScheme='red'>Logout</Button>
      </Flex>
      <Box
        w={['full', 'md']}
        p={[8, 10]}
        mt={[20, '10vh']}
        mx={'auto'}
        borderRadius={10}
      >
        <Heading size='md'>Olá {name}, estes são os últimos posts</Heading>
      </Box>
      {
        posts &&
        <Box
        w={['full']}
        p={[8, 10]}
        pt={20}
        mx={'auto'}
        borderRadius={10}
        >
        <FormControl>
          <FormLabel><Heading size='sm'>Crie um novo post</Heading></FormLabel>
          <Input rounded='none' type='text' placeholder="Crie um novo post"
          value={postContent}
          onChange={e => setPostContent(e.target.value)}
          ></Input>
          <Button onClick={createNewPost} mt={10} type="submit" colorScheme='blue'>Postar</Button>
        </FormControl>
          {posts.map((item) =>
            <Post onSuccess={handlePosts} postId={item.id} postUserId={item.userId} content={item.content} key={item.id}/>
          )}
        </Box>
      }
    </>
  )
}