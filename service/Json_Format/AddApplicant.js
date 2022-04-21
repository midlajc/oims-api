const { ObjectId } = require("mongodb");

function Applicant(data) {
  this.name = data.name;
  this.dob = new Date(data.date);
  this.gender = new ObjectId(data.gender);
}

module.exports = {
  Applicant,
};

// {
//     "name": "MIDLAJ C",
//     "dob": "2002-01-15",
//     "gender": 1,
//     "boardOfStudies": "625ff46b4f3eb3deea79920d",
//     "standard": "6260e6a64f3eb3deea79923d",
//     "studentType": 3,
//     "fatherName": "TEST",
//     "fatherEd": "test",
//     "fatherResiAddress": "test",
//     "fatherPin": "tet",
//     "fatherMobile": "029384022",
//     "fatherOfficeAddress": "test",
//     "fatherEmail": "tes@gmail",
//     "motherName": "test",
//     "motherEd": "test",
//     "motherResiAddress": "tet",
//     "motherPin": "test",
//     "motherMobile": "12345678",
//     "motherOfficeAddress": "test",
//     "motherEmail": "test@gmail",
//     "guardianName": "est",
//     "guardianEd": "test",
//     "guardianResiAddress": "test",
//     "guardianPin": "091283",
//     "guardianMobile": "987129387",
//     "guardianOfficeAddress": "test",
//     "guardianEmail": "mails@mail",
//     "emergencyContact": "test",
//     "emergencyContactAddress": "test",
//     "pickupMethod": "2",
//     "pickupInfo": "test",
//     "allergies": "test",
//     "bloodGroup": "O+ve",
//     "medicalCondition": "yes",
//     "medicalDetails": "test",
//     "DoctorName": "test",
//     "doctorMobile": "test",
//     "doctorEmail": "test"
//   }
