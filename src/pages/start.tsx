import { Box, Button, Heading, HStack, Link, Stack, StackDivider } from "@chakra-ui/react";

export default function Start () {
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