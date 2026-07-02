const express = require("express");
const router = express.Router();
const {
    getAllCourses,
    getCourseById,
    createCourse,
    updateCourse,
    deleteCourse
} = require("../controller/courseController");
router.get("/", getAllCourses);
router.get("/:id", getCourseById);
router.post("/", createCourse);
router.patch("/:id", updateCourse);
router.delete("/:id", deleteCourse);
module.exports = router;