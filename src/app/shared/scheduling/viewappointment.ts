
export interface AppointmentActions {
    name: string;
    code: number;
  }



  export interface Patient {
    memberId: string;
    payerName: string;
    plan:string;
  }


  export interface RegPatient {
    mrNo: string;
    patientBirthDate: string;
    patientPicture:string;

    personCellPhone:string;

    personFirstName:string;

    personSex:string;
    personEmail:string;
    personSocialSecurityNo:string;
    personZipCode:string;

  }



  
export interface History {
  


  mrno: number,
  personFullName: string,
  personTitleId: string,
  personSex: string,
  personEmail: string,
  personAddress1: string,
  employmentCompanyName: string  
}


  
export interface Family {
  


  mrno: number,
  personfirstname: string,
  personsex: string,
  relationship: string,
  personAddress1: string,
  passportNo: string  
}



export interface AppointmentHistory{

  
    appId: number,
    providerId: number,
    provider: string,
    mrNo: number,
    appDateTime: string | Date,
    appStatusId: number,
    appStatus: string,
    patientStatusId: number,
    patientStatus:string,
    rescheduleId: number,
    reasons: string,
    visitStatusId: number,
    visitAccountNo: number,
    visitTypeId: number,
    duration: number,
    siteId: number,
    purposeOfVisit: string,
    viewPatientName: string,
    appCriteriaId: number,
    appTypeId: number,
    isConsultationVisit: string,
    patientNotifiedId: string,
    caseId: string

}