import { Box } from "@chakra-ui/react";

export default function Home () {
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
      <h1>Home</h1>
    </Box>
  )
}