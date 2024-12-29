import {
  Button,
  Container,
  Text,
  Flex,
  SimpleGrid,
  Box,
  VStack,
  Heading,
  Input,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useCourseStore } from "../store/course";
import CourseCard from "../components/CourseCard";

const HomePage = () => {
  const { fetchCourses, courses } = useCourseStore();

  useEffect(() => {
    fetchCourses();
    console.log("Fetching courses...");
  }, [fetchCourses]);

  console.log("courses", courses);

  return (
    <Container maxW="container.xl" py={12}>
      {/* Section principale avec image */}
      <Flex
        position="relative"
        alignItems="center"
        justifyContent="center"
        direction="column"
        textAlign="center"
        height="300px"
        mb={12}
        borderRadius="md"
        overflow="hidden"
      >
        <Flex
          position="absolute"
          top={0}
          left={0}
          right={0}
          bottom={0}
          bg="rgba(0, 0, 0, 0.5)"
          zIndex={1}
          width="100%"
          height="100%"
        />
        <Flex
          position="absolute"
          top={0}
          left={0}
          right={0}
          bottom={0}
          backgroundImage="url('https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MTV8MjI0OTAyMXx8ZW58MHx8fHx8')"
          backgroundSize="cover"
          backgroundPosition="center"
          backgroundRepeat="no-repeat"
          zIndex={0}
        />
        <Flex
          position="relative"
          zIndex={2}
          p={8}
          textAlign="center"
          flexDirection="column"
        >
          <Text fontSize="2xl" fontWeight="bold" mb={4} color="white">
            Improve your skills on your own
          </Text>
          <Text fontSize="lg" mb={6} color="white">
            To prepare for a better future
          </Text>
          <Button bg={"#AC2A65"} color={"white"} _hover={{ bg: "#8B2254" }}>
            Register Now
          </Button>
        </Flex>
      </Flex>

      {/* Section des cours */}
      <Flex justifyContent="space-between" alignItems="center" mb={8}>
        <Text fontSize={"30px"} fontWeight={"bold"}>
          Discover Our Courses
        </Text>
        <Button bg={"#AC2A65"} color={"white"} _hover={{ bg: "#8B2254" }}>
          View More
        </Button>
      </Flex>

      <SimpleGrid
        columns={{
          base: 1,
          md: 2,
          lg: 3,
        }}
        spacing={10}
        w="full"
      >
        {courses && courses.length > 0 ? (
          courses.map((course) => (
            <Box
              key={course._id}
              boxShadow="md"
              borderRadius="md"
              overflow="hidden"
            >
              <CourseCard course={course} />
            </Box>
          ))
        ) : (
          <Text>No courses available.</Text>
        )}
      </SimpleGrid>

      {/* Section de contact */}
      <Box
        mt={12}
        bg={"#FBB04D"} // Couleur similaire au design
        p={8}
        borderRadius="30px" // Coins arrondis
        boxShadow="md"
        maxW="900px" // Limite la largeur de la section
        mx="auto" // Centrer horizontalement
      >
        <VStack spacing={8}>
          <Heading as="h2" size="lg" textAlign="center" color="#333">
            Contact Us
          </Heading>
          <VStack spacing={4} w="full">
            <Input
              placeholder="Your Name"
              name="name"
              bg="#FCE8D3"
              borderRadius="30px"
              _placeholder={{ color: "#555" }}
              height="50px"
              border="1px solid #333"
            />
            <Input
              placeholder="Your Email"
              name="email"
              bg="#FCE8D3"
              borderRadius="30px"
              _placeholder={{ color: "#555" }}
              height="50px"
              border="1px solid #333"
            />
            <Input
              placeholder="Your Message"
              name="message"
              bg="#FCE8D3"
              borderRadius="30px"
              _placeholder={{ color: "#555" }}
              height="100px"
              border="1px solid #333"
            />
            <Button
              bg={"#AC2A65"}
              color={"white"}
              _hover={{ bg: "#8B2254" }}
              borderRadius="30px"
              w="200px"
            >
              Send the message
            </Button>
          </VStack>
        </VStack>
      </Box>
    </Container>
  );
};

export default HomePage;
