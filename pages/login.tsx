import { Header } from "@/components/Header";
import { useAppSelector } from "@/hooks/redux";
import { setAccount, setPassword, togglePwdVis } from "@/store/login.slice";
import {
  Box,
  Button,
  Divider,
  FormControl,
  FormErrorMessage,
  Heading,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Text,
  useToast,
  VStack,
} from "@chakra-ui/react";
import {
  EyeIcon,
  EyeSlashIcon,
  LockClosedIcon,
  UserIcon,
} from "@heroicons/react/24/solid";
import { signIn, SignInResponse } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";

export default function Login() {
  const dispatch = useDispatch();
  const { form, error, pwdVis } = useAppSelector((state) => state.login);

  const router = useRouter();
  const toast = useToast();

  const handleLogin = async () => {
    const res: SignInResponse | undefined = await signIn<"credentials">(
      "credentials",
      { redirect: false, ...form }
    );
    if (res?.ok) {
      router.push("/");
    } else {
      // !fix it: use ChakraProvider
      toast({
        description: "login error",
        status: "error",
        duration: 3000,
      });
    }
  };

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
        <FormControl isInvalid={Boolean(error.account)}>
          <InputGroup mt={5}>
            <InputLeftElement pointerEvents="none" insetY={0.5}>
              <UserIcon className="h-5 w-5" />
            </InputLeftElement>
            <Input
              value={form.account}
              onChange={(e) => dispatch(setAccount(e.target.value))}
              type="text"
              placeholder="account"
              fontSize={18}
              variant="filled"
            />
          </InputGroup>
          {error.account && (
            <FormErrorMessage position="absolute" mt="2px" pl={3}>
              {error.account}
            </FormErrorMessage>
          )}
        </FormControl>
        <FormControl isInvalid={Boolean(error.password)}>
          <InputGroup mt={5}>
            <InputLeftElement pointerEvents="none" insetY={0.5}>
              <LockClosedIcon className="h-5 w-5" />
            </InputLeftElement>
            <Input
              value={form.password}
              onChange={(e) => dispatch(setPassword(e.target.value))}
              type={pwdVis ? "text" : "password"}
              placeholder="password"
              fontSize={18}
              variant="filled"
            />
            <InputRightElement onClick={() => dispatch(togglePwdVis())}>
              {pwdVis ? (
                <EyeSlashIcon className="h-5 w-5" />
              ) : (
                <EyeIcon className="h-5 w-5" />
              )}
            </InputRightElement>
          </InputGroup>
          {error.password && (
            <FormErrorMessage position="absolute" mt="2px" pl={3}>
              {error.password}
            </FormErrorMessage>
          )}
        </FormControl>
        <VStack align="end" w="full">
          <Button color="blue.300" bg="white" p={1}>
            Forgot password?
          </Button>
        </VStack>
        <Button
          w="full"
          bg="green.400"
          _hover={{ bg: "green.500" }}
          _active={{ bg: "green.600" }}
          color="white"
          onClick={handleLogin}
        >
          Login
        </Button>
        <Divider />
        <Text>Or</Text>
        <Button
          w="full"
          bg="blue.400"
          _hover={{ bg: "blue.500" }}
          _active={{ bg: "blue.600" }}
          color="white"
          onClick={() => signIn("google", { callbackUrl: "/" })}
        >
          Continue with Google
        </Button>
        <HStack align="center" w="full">
          <Text userSelect="none">Need an account?</Text>
          <Button color="blue.300" bg="white" p={1}>
            Register
          </Button>
        </HStack>
      </VStack>
    </Box>
  );
}
