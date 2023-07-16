const fs = require("fs");
const path = require("path");
const Student = require("../models/student");
const { createObjectCsvWriter } = require('csv-writer');

module.exports.downloadCSVReport = async function (req, res) {
  try {
    const allStudents = await Student.find({});

    const csvData = [];

    for (let student of allStudents) {
      const studentData = {
        "Student Id": student.id,
        "Student Name": student.name,
        "Student College": student.college,
        "Student Email": student.email,
        "Student Status": student.placementStatus,
        "DSA Final Score": student.dsa_score,
        "WebD Final Score": student.webdev_score,
        "React Final Score": student.react_score,
      };

      if (student.interviews.length > 0) {
        for (let interview of student.interviews) {
          const interviewData = {
            "Interview Date": interview.date.toString(),
            "Interview Company": interview.company,
            "Interview Result": interview.result,
          };

          const rowData = { ...studentData, ...interviewData };
          csvData.push(rowData);
        }
      } else {
        csvData.push(studentData);
      }
    }

    const csvWriter = createObjectCsvWriter({
      path: 'uploads/studentsReport.csv',
      header: [
        { id: 'Student Id', title: 'Student Id' },
        { id: 'Student Name', title: 'Student Name' },
        { id: 'Student College', title: 'Student College' },
        { id: 'Student Email', title: 'Student Email' },
        { id: 'Student Status', title: 'Student Status' },
        { id: 'DSA Final Score', title: 'DSA Final Score' },
        { id: 'WebD Final Score', title: 'WebD Final Score' },
        { id: 'React Final Score', title: 'React Final Score' },
        { id: 'Interview Date', title: 'Interview Date' },
        { id: 'Interview Company', title: 'Interview Company' },
        { id: 'Interview Result', title: 'Interview Result' },
      ],
    });

    await csvWriter.writeRecords(csvData);

    const filePath = path.join(__dirname, '../uploads/studentsReport.csv');

    res.download(filePath, 'studentsReport.csv', (err) => {
      if (err) {
        console.log(err);
        return res.redirect('back');
      }

      fs.unlinkSync(filePath); // Delete the file after download
    });
  } catch (err) {
    console.log(err);
    return res.redirect('back');
  }
};
