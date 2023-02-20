import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import {
  resetForm,
  setAccount,
  setPassword,
  togglePwdVis,
} from "@/store/login.slice";
import {
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
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  Text,
  Tooltip,
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

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LoginModal = ({ isOpen, onClose }: LoginModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent mx={3}>
        <ModalCloseButton />
        <ModalBody mt={4}>
          <LoginForm />
        </ModalBody>

        <ModalFooter mb={4}>
          <Text fontSize="sm" color="gray.400">
            By logging in, you are agreeing to the{" "}
            <Tooltip label="have fun :)">
              <button className="text-blue-500">Terms</button>
            </Tooltip>{" "}
            of Service.
          </Text>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

const LoginForm = () => {
  const dispatch = useAppDispatch();
  const { form, error, pwdVis } = useAppSelector((state) => state.login);

  const toast = useToast();

  const handleLogin = async () => {
    const res: SignInResponse | undefined = await signIn<"credentials">(
      "credentials",
      { redirect: false, ...form }
    );
    if (res?.ok) {
      dispatch(resetForm());
    } else {
      // !fix it: use ChakraProvider
      toast({
        position: "top",
        description: "login error",
        status: "error",
        duration: 3000,
      });
    }
  };

  return (
    <VStack px="1.5rem">
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
        onClick={() => signIn("google")}
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
  );
};
