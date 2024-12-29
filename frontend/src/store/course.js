import { create } from "zustand";

export const useCourseStore = create((set) => ({
  courses: [],
  error: null,
  setError: (error) => set({ error }),

  setCourses: (courses) => set({ courses }),

  createCourse: async (newCourse) => {
    if (!newCourse.name || !newCourse.price || !newCourse.image) {
      return { success: false, message: "Please fill all fields" };
    }
    try {
      const res = await fetch("/api/courses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newCourse),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Error creating course");
      }
      set((state) => ({ courses: [...state.courses, data] }));
      return { success: true, message: "Course created successfully" };
    } catch (error) {
      console.error("Error creating course:", error);
      return { success: false, message: error.message };
    }
  },

  fetchCourses: async () => {
    try {
      const res = await fetch("/api/courses");
      if (!res.ok) {
        throw new Error("Failed to fetch courses");
      }
      const data = await res.json();
      set({ courses: data });
    } catch (error) {
      console.error("Error fetching courses:", error);
      set({ courses: [] });
    }
  },

  deleteCourse: async (pid) => {
    try {
      const res = await fetch(`/api/courses/${pid}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!data.success) {
        return { success: false, message: data.message };
      }
      set((state) => ({
        courses: state.courses.filter((course) => course._id !== pid),
      }));
      return { success: true, message: data.message };
    } catch (error) {
      console.error("Error deleting course:", error);
      return { success: false, message: error.message };
    }
  },

  updateCourse: async (updatedCourse) => {
    // Utilisation de l'ID depuis selectedCourse directement, si disponible
    const _id = updatedCourse._id || selectedCourse?._id; // Si _id n'est pas passé, il récupère _id de selectedCourse

    if (!_id) {
      return { success: false, message: "Course ID is required" };
    }

    const { name, price, image } = updatedCourse;

    try {
      const res = await fetch(`/api/courses/${_id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name || undefined,  // Si vide, ne pas envoyer
          price: price || undefined,  // Si vide, ne pas envoyer
          image: image || undefined,  // Si vide, ne pas envoyer
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Error updating course");
      }

      set((state) => ({
        courses: state.courses.map((course) =>
          course._id === _id ? { ...course, ...updatedCourse } : course
        ),
      }));
      return { success: true, message: "Course updated successfully" };
    } catch (error) {
      console.error("Error updating course:", error);
      return { success: false, message: error.message };
    }
  },
}));
