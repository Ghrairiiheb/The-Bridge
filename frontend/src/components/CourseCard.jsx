import { Box, Heading, Image, Text } from "@chakra-ui/react";
import React from "react";

const CourseCard = ({ course }) => {
  const bg = "gray.800";
  return (
    <Box shadow="lg" rounded="lg" overflow="hidden" transition="all 0.3s">
      <Image src={course.image} alt={course.name} h={48} objectFit="cover" />
      <Box p={4}>
        <Heading as="h3" size="md" mb={2}>
          {course.name}
        </Heading>
        <Text fontWeight="bold" fontSize="xl" color={"#AC2A65"} mb={4}>
          {course.price}
        </Text>
      </Box>
    </Box>
  );
};
export default CourseCard;
