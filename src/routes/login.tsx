import { Box, Button, FormControl, FormLabel, Heading, Input, Text, VStack } from "@chakra-ui/react";
import { SyntheticEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login () {
  
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  let navigate = useNavigate();

  const submitHandler = async (e: SyntheticEvent) => {
    e.preventDefault()
    console.log('submitted')
    await fetch('http://localhost:8000/session', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      credentials: 'include',
      body: JSON.stringify({
        email,
        password
      })
    });

    navigate('/');
    
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
          <FormControl>
            <FormLabel>Endereço de email</FormLabel>
            <Input rounded='none' variant='filled' type='email' placeholder="Digite seu email"
              value={email}
              onChange={e => setEmail(e.target.value)}
            ></Input>
          </FormControl>
          <FormControl>
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