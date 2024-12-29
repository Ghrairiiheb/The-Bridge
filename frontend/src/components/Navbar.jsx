import { Container, Flex, HStack, Text, Button } from "@chakra-ui/react";
import React from "react";
import { BiLogIn } from "react-icons/bi";
import AdminPage from "../pages/AdminPage";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <Container maxWidth={"1140px"} px={4}>
      <Flex
        h={16}
        alignItems={"center"}
        justifyContent={"space-between"}
        flexDirection={{ base: "column", sm: "row" }}
      >
        <Text
          fontSize={{ base: "22", sm: "28" }}
          fontWeight={"blod"}
          textTransform={"uppercase"}
          textAlgin={"center"}
          bgGradient={"linear(to-r, black , black)"}
          bgClip={"text"}
        >
          <Link to={"/"}>The Bridge </Link>
        </Text>
        <HStack spacing={2} alignItems={"center"}>
          <Link to={"/admin"}>
            <Button>
              <BiLogIn />
            </Button>
          </Link>
        </HStack>
      </Flex>
    </Container>
  );
};

export default Navbar;
