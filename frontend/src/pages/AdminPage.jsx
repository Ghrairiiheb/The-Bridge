import React, { useState, useEffect } from "react";
import {
  Container,
  Heading,
  VStack,
  Box,
  Button,
  useToast,
  Flex,
  SimpleGrid,
  Text,
  HStack,
  Input,
  IconButton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@chakra-ui/react";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import { useCourseStore } from "../store/course";

const AdminPage = () => {
  const [newCourse, setNewCourse] = useState({
    name: "",
    price: "",
    image: "",
  });
  const [selectedCourse, setSelectedCourse] = useState(null); // Pour le cours sélectionné à modifier
  const { isOpen, onOpen, onClose } = useDisclosure(); // Pour le modal
  const toast = useToast();

  const { createCourse, fetchCourses, updateCourse, deleteCourse, courses } =
    useCourseStore();

  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);

  // Ajouter un cours
  const handleAddCourse = async () => {
    const { success, message } = await createCourse(newCourse);
    if (!success) {
      toast({
        title: "Error",
        description: message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Success",
        description: message,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      fetchCourses();
    }
    setNewCourse({ name: "", price: "", image: "" });
  };

  // Supprimer un cours
  const handleDeleteCourse = async (pid) => {
    const { success, message } = await deleteCourse(pid);
    toast({
      title: success ? "Success" : "Error",
      description: message,
      status: success ? "success" : "error",
      duration: 3000,
      isClosable: true,
    });
    fetchCourses();
  };

  // Ouvrir le modal pour mettre à jour un cours
  const handleEditCourse = (course) => {
    setSelectedCourse(course); // Remplir les données existantes
    onOpen(); // Ouvrir le modal
  };

  // Mettre à jour un cours
  const handleUpdateCourse = async () => {
    const { success, message } = await updateCourse(selectedCourse);
    toast({
      title: success ? "Success" : "Error",
      description: message,
      status: success ? "success" : "error",
      duration: 3000,
      isClosable: true,
    });
    onClose(); // Fermer le modal
    fetchCourses(); // Recharger la liste des cours
  };

  return (
    <Container maxW={"container.sm"} py={8}>
      <VStack
        spacing={8}
        bg={"#FDEACD"}
        p={8}
        borderRadius={"md"}
        boxShadow={"md"}
      >
        <Heading as={"h2"} size={"xl"} textAlign={"center"} mb={4}>
          Add New Course
        </Heading>
        <Box w={"full"}>
          <VStack spacing={4}>
            <Input
              placeholder="Course Name"
              name="name"
              value={newCourse.name}
              onChange={(e) =>
                setNewCourse({ ...newCourse, name: e.target.value })
              }
            />
            <Input
              placeholder="Price"
              name="price"
              value={newCourse.price}
              onChange={(e) =>
                setNewCourse({ ...newCourse, price: e.target.value })
              }
            />
            <Input
              placeholder="Image"
              name="image"
              value={newCourse.image}
              onChange={(e) =>
                setNewCourse({ ...newCourse, image: e.target.value })
              }
            />
            <Button
              bg={"#AC2A65"}
              color={"white"}
              _hover={{ bg: "#8B2254" }}
              onClick={handleAddCourse}
              w="200px"
              mt={4}
            >
              Add Course
            </Button>
          </VStack>
        </Box>
      </VStack>

      <Flex justifyContent="space-between" alignItems="center" mt={10} mb={8}>
        <Text fontSize={"30px"} fontWeight={"bold"}>
          List Of Courses
        </Text>
      </Flex>

      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6} w="full">
        {Array.isArray(courses) && courses.length > 0 ? (
          courses.map((course) => (
            <Box
              key={course._id}
              boxShadow="lg"
              borderRadius="10px"
              overflow="hidden"
            >
              <Box h="150px" overflow="hidden">
                <img
                  src={course.image}
                  alt={course.name}
                  style={{ width: "100%", objectFit: "cover" }}
                />
              </Box>
              <Box p={4}>
                <Text fontWeight="bold" fontSize="lg" mb={2} noOfLines={1}>
                  {course.name}
                </Text>
                <Text fontWeight="bold" color="#AC2A65" mt={2}>
                  {course.price}
                </Text>
                <HStack>
                  <IconButton
                    icon={<EditIcon />}
                    colorScheme="blue"
                    onClick={() => handleEditCourse(course)}
                  />
                  <IconButton
                    icon={<DeleteIcon />}
                    colorScheme="red"
                    onClick={() => handleDeleteCourse(course._id)}
                  />
                </HStack>
              </Box>
            </Box>
          ))
        ) : (
          <Text>No courses available.</Text>
        )}
      </SimpleGrid>

      {/* Modal pour mettre à jour un cours */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update Course</ModalHeader>
          <ModalBody>
            <VStack spacing={4}>
              <Input
                placeholder="Course Name"
                value={selectedCourse?.name || ""}
                onChange={(e) =>
                  setSelectedCourse({ ...selectedCourse, name: e.target.value })
                }
              />
              <Input
                placeholder="Price"
                value={selectedCourse?.price || ""}
                onChange={(e) =>
                  setSelectedCourse({
                    ...selectedCourse,
                    price: e.target.value,
                  })
                }
              />
              <Input
                placeholder="Image"
                value={selectedCourse?.image || ""}
                onChange={(e) =>
                  setSelectedCourse({
                    ...selectedCourse,
                    image: e.target.value,
                  })
                }
              />
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleUpdateCourse}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Container>
  );
};

export default AdminPage;
