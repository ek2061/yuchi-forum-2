import { Header } from "@/components/Header";
import {
  Box,
  Button,
  FormControl,
  Heading,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
  VStack,
} from "@chakra-ui/react";
import { LockClosedIcon, UserIcon } from "@heroicons/react/24/solid";
import Head from "next/head";

export default function Login() {
  return (
    <Box w="full" mx="auto" px="0.75rem" py="1.5rem">
      <Head>
        <title>Login | yuchi forum</title>
        <meta
          name="description"
          content="login yuchi forum and join the hot topic"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />

      <VStack
        mx="auto"
        flex="0 0 auto"
        maxW="406px"
        borderRadius="0.3rem"
        p="1.5rem"
        boxShadow="lg"
        boxSizing="border-box"
        bg="white"
      >
        <Heading size="lg" fontWeight="medium">
          Login
        </Heading>
        <Heading size="md" fontWeight="normal">
          Join the hot topic and have fun!
        </Heading>

        <FormControl isRequired>
          <InputGroup mt={4}>
            <InputLeftElement pointerEvents="none" insetY={0.5}>
              <UserIcon className="h-5 w-5" />
            </InputLeftElement>
            <Input
              type="text"
              placeholder="account"
              fontSize={18}
              variant="filled"
            />
          </InputGroup>
        </FormControl>

        <FormControl isRequired>
          <InputGroup mt={4}>
            <InputLeftElement pointerEvents="none" insetY={0.5}>
              <LockClosedIcon className="h-5 w-5" />
            </InputLeftElement>
            <Input
              type="password"
              placeholder="password"
              fontSize={18}
              variant="filled"
            />
          </InputGroup>
        </FormControl>

        <VStack align="end" w="full">
          <Button color="blue.300" bg="white" p={1}>
            Forgot password?
          </Button>
        </VStack>

        <Button
          w="full"
          bg="blue.400"
          _hover={{ bg: "blue.500" }}
          _active={{ bg: "blue.600" }}
          color="white"
        >
          Login
        </Button>

        <HStack align="center" w="full">
          <Text>Need an account?</Text>
          <Button color="blue.300" bg="white" p={1}>
            Register
          </Button>
        </HStack>
      </VStack>
    </Box>
  );
}
