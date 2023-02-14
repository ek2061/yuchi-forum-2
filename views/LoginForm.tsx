import {
  FormControl,
  FormErrorMessage,
  FormHelperText,
  Input,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import { UserIcon } from "@heroicons/react/24/solid";
import React from "react";

export const LoginForm = () => {
  const [input, setInput] = React.useState<string>("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setInput(e.target.value);

  const isError = input === "";

  return (
    <FormControl isInvalid={isError}>
      <InputGroup mt={4}>
        <InputLeftElement pointerEvents="none" insetY={0.5}>
          <UserIcon className="h-5 w-5" />
        </InputLeftElement>
        <Input
          type="text"
          placeholder="account"
          fontSize={18}
          variant="filled"
          value={input}
          onChange={handleInputChange}
        />
      </InputGroup>
      {!isError ? (
        <FormHelperText>
          {"Enter the email you'd like to receive the newsletter on."}
        </FormHelperText>
      ) : (
        <FormErrorMessage>account is required.</FormErrorMessage>
      )}
    </FormControl>
  );
};
