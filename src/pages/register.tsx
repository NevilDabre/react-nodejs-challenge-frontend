import { Box, Button, FormControl, FormLabel, Heading, Input, Text, VStack } from "@chakra-ui/react";

import { SyntheticEvent, useState } from "react";
import { useNavigate } from "react-router-dom"


export default function Register () {

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  let navigate = useNavigate();

  const submitHandler = async (e: SyntheticEvent) => {
    e.preventDefault()

    await fetch('http://localhost:8000/user', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        name,
        email,
        password
      })
    });

    navigate('/login');
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
          <Heading>Registrar</Heading>
          <Text>Informe seu nome, email e senha para registrar</Text>
        </VStack>
        <form onSubmit={submitHandler}>
          <FormControl pb={5}>
            <FormLabel>Nome</FormLabel>
            <Input rounded='none' variant='filled' placeholder="Digite seu nome"
              value={name}
              onChange={e => setName(e.target.value)}
            ></Input>
          </FormControl>
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
              onChange={e => setPassword(e.target.value)}
            ></Input>
          </FormControl>
          <Button rounded='5px' colorScheme='messenger' w={['full', 'auto']} alignSelf='end' type="submit">Registrar</Button>
        </form>
      </VStack>

    </Box>
  )
}