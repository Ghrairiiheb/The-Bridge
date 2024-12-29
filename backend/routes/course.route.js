import express from "express";
import Course  from "../models/course.model.js";
import mongoose from "mongoose";
import { createCourse, deleteCourse, getCourse, updateCourse } from "../controllers/course.controller.js";
const router = express.Router();

router.post("/",createCourse);
router.delete("/:id",deleteCourse)
router.get("/",getCourse);
router.put("/:id",updateCourse)
export default router;
