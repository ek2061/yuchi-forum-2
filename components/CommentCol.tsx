import { useAppDispatch } from "@/hooks/redux";
import { openModal } from "@/store/login.slice";
import {
  Button,
  CardBody,
  Heading,
  HStack,
  Textarea,
  VStack,
} from "@chakra-ui/react";

export const CommentCol = () => {
  return (
    <CardBody>
      <HStack>
        <Textarea
          variant="filled"
          placeholder="Leave your comment"
          resize="none"
        />
        <Button colorScheme="twitter" borderRadius="20px">
          Submit
        </Button>
      </HStack>
    </CardBody>
  );
};

export const MustBeLoggedIn = () => {
  const dispatch = useAppDispatch();
  const onOpenLoginModal = () => dispatch(openModal());

  return (
    <VStack my={3}>
      <Heading size="sm">You must be logged in to comment</Heading>
      <Button
        bg="blue.400"
        _hover={{ bg: "blue.500" }}
        _active={{ bg: "blue.600" }}
        color="white"
        onClick={onOpenLoginModal}
      >
        Login
      </Button>
    </VStack>
  );
};
