import { Button, CardBody, HStack, Textarea } from "@chakra-ui/react";

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
