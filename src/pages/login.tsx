import { Box, Button, FormControl, FormLabel, Heading, Input, Text, VStack } from "@chakra-ui/react";
import { SyntheticEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../actions/userAction";
import { login as userLogin } from "../store/slices/user"

export default function Login () {
  
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch();

  let navigate = useNavigate();

  const submitHandler = async (e: SyntheticEvent) => {
    e.preventDefault()
    const data = await login(email, password)
    dispatch(userLogin(data))
    navigate('/home');
    
  }
  return (
    <Box
      w={['full', 'md']}
      p={[8, 10]}
      mt={[20, '10vh']}
      mx={'auto'}
      border={['none', '1px']}
      borderColor={['', 'gray.300']}
      borderRadius={10}
    >
      <VStack spacing={4} align='flex-start' w='full'>
        <VStack spacing={1} align={['flex-start', 'center']} w='full'>
          <Heading>Entrar</Heading>
          <Text>Insira seu email e senha para entrar</Text>
        </VStack>
        <form onSubmit={submitHandler}>
          <FormControl pb={5}>
            <FormLabel>Endereço de email</FormLabel>
            <Input rounded='none' variant='filled' type='email' placeholder="Digite seu email"
              value={email}
              onChange={e => setEmail(e.target.value)}
            ></Input>
          </FormControl>
          <FormControl pb={5}>
            <FormLabel>Senha</FormLabel>
            <Input rounded='none' variant='filled' type='password' placeholder="Digite sua senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></Input>
          </FormControl>
          <Button rounded='5px' colorScheme='messenger' w={['full', 'auto']} alignSelf='end' type="submit">Entrar</Button>
        </form>
      </VStack>

    </Box>
  )
}