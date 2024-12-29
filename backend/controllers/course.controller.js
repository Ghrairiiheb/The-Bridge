import Course from "../models/course.model.js"; // Import du modèle Course

export const getCourse = async (req, res) => {
  try {
    const courses = await Course.find({});
    res.json(courses); // Envoyer les cours en tant que réponse JSON
  } catch (error) {
    console.error("Error in get course:", error.message);
    res.status(500).json({ message: "Server Error" }); // Envoyer une réponse d'erreur
  }
};

export const updateCourse = async (req, res) => {
  const { id } = req.params;
  const { name, price, image } = req.body;
  try {
    const updatedCourse = await Course.findByIdAndUpdate(
      id,
      { name, price, image },
      { new: true }
    );
    if (!updatedCourse)
      return res.status(404).json({ message: "Course not found" });
    res.json({ message: "Course updated", data: updatedCourse });
  } catch (error) {
    console.error("Error in update course:", error.message);
    res.status(500).json({ message: "Server Error" });
  }
};

export const deleteCourse = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedCourse = await Course.findByIdAndDelete(id);
    if (!deletedCourse)
      return res.status(404).json({ message: "Course not found" });
    res.status(200).json({ success: true, message: "Course deleted" });
  } catch (error) {
    console.error("Error in delete course", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const createCourse = async (req, res) => {
  const course = req.body;
  if (!course.name || !course.price || !course.image) {
    return res.status(400).json({ message: "Please fill in all fields" });
  }
  const newCourse = new Course(course);
  try {
    await newCourse.save();
    res.status(201).json({ success: true, data: newCourse });
  } catch (error) {
    console.error("Error in create course", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
