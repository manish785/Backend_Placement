const Interview = require("../models/interview");
const Student = require("../models/student");

// render add student page
module.exports.addStudent = (req, res) => {
  if (req.isAuthenticated()) {
    return res.render("add_student", {
      title: "Add Student",
    });
  }

  return res.redirect("/");
};

// render edit student page
module.exports.editStudent = async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    
    await student.save();
    console.log(student);

    return res.render("edit_student", {
      title: "Edit Student",
      student_details: student,
    });
  } catch (err) {
    console.log(err);
    return res.redirect("back");
  }
};


// creating a new Student
module.exports.create = async (req, res) => {
  try {
    const {
      name,
      email,
      batch,
      college,
      placementStatus,
      dsa_score,
      react_score,
      webdev_score,
    } = req.body;

    // check if student already exist
    let student = await Student.findOne({ email });
    

      if (!student) {
        await Student.create(
          {
            name,
            email,
            college,
            batch,
            dsa_score,
            react_score,
            webdev_score,
            placementStatus,
          })
          return res.redirect("back");
      } else {
        return res.redirect("back");
      }
  } catch (err) {
    console.log(err);
    return;
  }
};

// Deletion of student
module.exports.destroy = async (req, res) => {
  try {
    const { studentId } = req.params;
    const student = await Student.findById(studentId);

    if (!student) {
      return;
    }

    const interviewsOfStudent = student.interviews;

    // delete reference of student from companies in which this student is enrolled
    if (interviewsOfStudent.length > 0) {
      for (let interview of interviewsOfStudent) {
        await Interview.findOneAndUpdate(
          { company: interview.company },
          { $pull: { students: { student: studentId } } }
        );
      }
    }

    student.deleteOne();
    return res.redirect("back");
  } catch (err) {
    console.log("error", err);
    return;
  }
};

// update student details
module.exports.update = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);

    if (!student) {
      return res.redirect("back");
    }

    student.name = req.body.name;
    student.college = req.body.college;
    student.batch = req.body.batch;
    student.dsa_score = req.body.dsa_score;
    student.react_score = req.body.react_score;
    student.webdev_score = req.body.webdev_score;
    student.placementStatus = req.body.placementStatus;

    await student.save();

    console.log(student);
    return res.redirect("/dashboard");
  } catch (err) {
    console.log(err);
    return res.redirect("back");
  }
};

