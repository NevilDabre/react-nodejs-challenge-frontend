import { Card, CardHeader, CardBody, Stack, StackDivider, Box, Text, Button } from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { UserState } from "../reducers/userReducer";
import { deletePost } from "../services/api";

type Props ={
  content: string;
  postUserId: number;
  postId: number;
  onSuccess: Function;
}

const Post = ({ content, postUserId, postId, onSuccess }: Props) => {

  const userLogin = useSelector<RootState, UserState>(
    (state: RootState) => {
      return state.userLogin});
  const { userInfoFromStorage } = userLogin;
  const userId = userInfoFromStorage ? userInfoFromStorage.id : null; 
  const token = userInfoFromStorage ? userInfoFromStorage.token : null;
  async function handleDelete () {
    if(token) {
      await deletePost(token, postId);
      onSuccess();
    }
  }
  return(
    <Card mt={10}>
      <CardHeader>
        {
          userId === postUserId &&
          <>
            <Button onClick={handleDelete} colorScheme='red' size='sm' flex='1' variant='ghost' leftIcon={<DeleteIcon />}>
              Deletar
            </Button>
          </>
        }
      </CardHeader>
      <CardBody>
        <Stack divider={<StackDivider />} spacing='4'>
          <Box>
            <Text pt='2' fontSize='sm'>
              {content}
            </Text>
          </Box>
        </Stack>
      </CardBody>
    </Card>
  )
  
}

export default Post;