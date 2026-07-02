const fs = require("fs");
const filePath = "./data/course-data.json";
let course = JSON.parse(fs.readFileSync(filePath, "utf8"));

exports.getAllCourses = (req, res) => {
    res.status(200).json({
        status: "success",
        results: course.length,
        data: {
            course
        }
    });

};

exports.getCourseById = (req, res) => {
    const id = Number(req.params.id);
    const oneCourse = course.find(c => c.id === id);
    if (!oneCourse) {
        return res.status(404).json({
            status: "fail",
            message: "Course Not Found"
        });

    }
    res.status(200).json({
        status: "success",
        data: {
            course: oneCourse
        }
    });

};

exports.createCourse = (req, res) => {
    try {
        const id =
            course.length > 0
                ? course[course.length - 1].id + 1
                : 1;
        const newCourse = {
            id,
            ...req.body
        };
        course.push(newCourse);
        fs.writeFileSync(
            filePath,
            JSON.stringify(course, null, 2)
        );
        res.status(201).json({
            status: "success",
            data: {
                course: newCourse
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: "error",
            message: error.message
        });
    }
};

exports.updateCourse = (req, res) => {
    const courseId = Number(req.params.id);
    const courseIndex = course.findIndex(
        c => c.id === courseId
    );
    if (courseIndex === -1) {
        return res.status(404).json({
            status: "fail",
            message: "Course Not Found"
        });
    }
    const updatedCourse = Object.assign(
        course[courseIndex],
        req.body
    );
    fs.writeFileSync(
        filePath,
        JSON.stringify(course, null, 2)
    );
    res.status(200).json({
        status: "success",
        message: "Course Updated Successfully",
        data: {
            course: updatedCourse
        }
    });

};

exports.deleteCourse = (req, res) => {
    try {
        const courseId = Number(req.params.id);
        const courseIndex = course.findIndex(
            c => c.id === courseId
        );
        if (courseIndex === -1) {
            return res.status(404).json({
                status: "fail",
                message: "Course Not Found"
            });
        }
        course.splice(courseIndex, 1);
        fs.writeFileSync(
            filePath,
            JSON.stringify(course, null, 2)
        );
        res.status(200).json({
            status: "success",
            message: "Course Deleted Successfully"
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: "error",
            message: error.message
        });
    }
};