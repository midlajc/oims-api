const { ObjectId } = require("mongodb");

function Applicant(data) {
  this.name = data.name;
  this.dob = new Date(data.dob);
  this.gender_id = data.gender ? ObjectId(data.gender) : "";
  this.student_type_id = ObjectId(data.studentType);
  this.board_of_studies_id = data.boardOfStudies
    ? ObjectId(data.boardOfStudies)
    : "";
  this.standard_id = data.standard ? ObjectId(data.standard) : "";
}

function ApplicantParentDetails(data) {
  this.applicant_id = ObjectId(data._id);
  this.father_name = data.fatherName;
  this.father_resi_address = data.fatherResiAddress;
  this.father_pin = data.fatherPin;
  this.father_mobile = data.fatherMobile;
  this.father_office_address = data.fatherOfficeAddress;
  this.father_email = data.fatherEmail;
  this.mother_name = data.motherName;
  this.mother_resi_address = data.motherResiAddress;
  this.mother_pin = data.motherPin;
  this.mother_mobile = data.motherMobile;
  this.mother_office_address = data.motherOfficeAddress;
  this.mother_email = data.motherEmail;
  this.guardian_name = data.guardianName;
  this.guardian_resi_address = data.guardianResiAddress;
  this.guardian_pin = data.guardianPin;
  this.guardian_mobile = data.guardianMobile;
  this.guardian_office_address = data.guardianOfficeAddress;
  this.guardian_email = data.guardianEmail;
}

function ApplicantOtherDetails(data) {
  this.applicant_id = ObjectId(data._id);
  this.emergency_contact = data.emergencyContact;
  this.emergency_contact_address = data.emergencyContactAddress;
  this.pickup_method = data.pickupMethod;
  this.pickup_info = data.pickupInfo;
  this.allergies = data.allergies;
  this.blood_group = data.bloodGroup;
  this.medical_condition = data.medicalCondition;
  this.medical_details = data.medicalDetails;
  this.doctor_name = data.doctorName;
  this.doctor_mobile = data.doctorMobile;
  this.doctor_email = data.doctorEmail;
}

function AdmissionStatus(data) {
  this.applicant_id = ObjectId(data._id);
  this.primary_verification_status = false;
  this.officer_approval_status = false;
  this.manager_approval_status = false;
}

function Student(data) {
  this._id = ObjectId(data._id);
  this.name = data.name;
  this.dob = new Date(data.dob);
  this.gender_id = data.gender_id ? ObjectId(data.gender_id) : "";
  this.student_type_id = ObjectId(data.student_type_id);
  this.board_of_studies_id = data.board_of_studies_id
    ? ObjectId(data.board_of_studies_id)
    : "";
  this.standard_id = data.standard_id ? ObjectId(data.standard_id) : "";
}

function StudentParentDetails(data) {
  this._id = ObjectId(data.applicant_id);
  this.student_id = ObjectId(data.applicant_id);
  this.father_name = data.father_name;
  this.father_resi_address = data.father_resi_address;
  this.father_pin = data.father_pin;
  this.father_mobile = data.father_mobile;
  this.father_office_address = data.father_office_address;
  this.father_email = data.father_email;
  this.mother_name = data.mother_name;
  this.mother_resi_address = data.mother_resi_address;
  this.mother_pin = data.mother_pin;
  this.mother_mobile = data.mother_mobile;
  this.mother_office_address = data.mother_office_address;
  this.mother_email = data.mother_email;
  this.guardian_name = data.guardian_name;
  this.guardian_resi_address = data.guardian_resi_address;
  this.guardian_pin = data.guardian_pin;
  this.guardian_mobile = data.guardian_mobile;
  this.guardian_office_address = data.guardian_office_address;
  this.guardian_email = data.guardian_email;
}

function StudentOtherDetails(data) {
  this._id = ObjectId(data.applicant_id);
  this.student_id = ObjectId(data.applicant_id);
  this.emergency_contact = data.emergency_contact;
  this.emergency_contact_address = data.emergency_contact_address;
  this.pickup_method = data.pickup_method;
  this.pickup_info = data.pickup_info;
  this.allergies = data.allergies;
  this.blood_group = data.blood_group;
  this.medical_condition = data.medical_condition;
  this.medical_details = data.medical_details;
  this.doctor_name = data.doctor_name;
  this.doctor_mobile = data.doctor_mobile;
  this.doctor_email = data.doctor_email;
}

module.exports = {
  Applicant,
  ApplicantParentDetails,
  ApplicantOtherDetails,
  AdmissionStatus,
  Student,
  StudentParentDetails,
  StudentOtherDetails,
};
