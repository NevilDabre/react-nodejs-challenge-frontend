import { Box, Button, Heading, HStack, Link, Stack, StackDivider, Input, FormControl, FormLabel, Flex, Spacer } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { UserState } from "../reducers/userReducer";
import { useEffect, useState } from "react";
import { createPost, listPosts } from "../services/api";
import Post from "../components/Post";
import { logout } from "../actions/userAction";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

export default function Home () {

  const userLogin = useSelector<RootState, UserState>(
    (state: RootState) => {
      return state.userLogin});
  
  
  const { userInfoFromStorage } = userLogin;
  const name = userInfoFromStorage ? userInfoFromStorage.name : null; 
  const token = userInfoFromStorage ? userInfoFromStorage.token : null; 

  const [posts, setPosts] = useState<any[]>([]);
  const [postContent, setPostContent] = useState('')
  
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
    dispatch(logout())
    navigate('/');
  }

  const createNewPost = async () => {
    if(token){
      const data = await createPost(token, postContent);
      setPosts([data, ...posts])
    }
  }

  return name ? (
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
  :
  (
    <Box
      w={['full', 'md']}
      p={[8, 10]}
      mt={[20, '10vh']}
      mx={'auto'}
      border={['none', '1px']}
      borderColor={['', 'gray.300']}
      borderRadius={10}
    >
      <Stack divider={<StackDivider />} spacing='4'>
        <Heading>Welcome to PostIt</Heading>
        <HStack>
          <Link  href="/login">
            <Button colorScheme='blue'>Entrar</Button>
          </Link>
          <Link href="/register">
            <Button colorScheme='blue'>Registrar</Button>
          </Link>
        </HStack>
      </Stack>

    </Box>
  )
}