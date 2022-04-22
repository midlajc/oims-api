const { ObjectId } = require("mongodb");

function Applicant(data) {
  this.name = data.name;
  this.dob = new Date(data.dob);
  this.gender_id = data.gender ? ObjectId(data.gender) : "";
  this.board_of_studies_id = data.boardOfStudies
    ? ObjectId(data.boardOfStudies)
    : "";
  this.standard_id = data.standard ? ObjectId(data.standard) : "";
}

function ParentDetails(data) {
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

function OtherDetails(data) {
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

module.exports = {
  Applicant,
  ParentDetails,
  OtherDetails,
  AdmissionStatus,
};
