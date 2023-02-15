import Logo from "@/public/yuchi-forum-logo.svg";
import { Box, Button, HStack, Text } from "@chakra-ui/react";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

export const Header = () => {
  const { data: session } = useSession();

  return (
    <header className="fixed inset-x-0 top-0 z-[1100] flex h-12 justify-center bg-gray-900 py-2 shadow-xl">
      <Box
        mx="auto"
        display="flex"
        w="full"
        maxW="1280px"
        alignItems="center"
        justifyContent="space-between"
        px={6}
      >
        <Link href="/" className="mr-auto flex items-center whitespace-nowrap">
          <Box
            pos="relative"
            display="inline-block"
            boxSizing="border-box"
            h={8}
            w={8}
            overflow="hidden"
          >
            <Image
              src={Logo}
              alt="yuchi-logo"
              className="absolute m-auto box-border block h-full w-full border-none"
            />
          </Box>
          <h6 className="ml-2 flex-nowrap text-xl font-medium text-gray-100">
            yuchi forum
          </h6>
        </Link>

        <Box display="flex" flexGrow={1} flexBasis="auto" alignItems="center" />

        {session ? (
          <HStack spacing={4}>
            <Text color="white">{session.user?.name}</Text>
            <LogoutButton />
          </HStack>
        ) : (
          <LoginButton />
        )}
      </Box>
    </header>
  );
};

const LogoutButton = () => {
  return (
    <Button h={8} onClick={() => signOut()}>
      Logout
    </Button>
  );
};

const LoginButton = () => {
  return (
    <Button
      variant="outline"
      color="white"
      _hover={{ bg: "gray.600" }}
      _active={{ bg: "blue.600", color: "gray.100" }}
      h={8}
    >
      <Link href="/login">Login</Link>
    </Button>
  );
};
