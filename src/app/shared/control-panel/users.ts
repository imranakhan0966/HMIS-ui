
export class HREmployeeRequestBindingModel{

    //user information
    EmployeeId:number;
    //title
    Prefix:string;
    IsEmployee:boolean;
    IsRefProvider:boolean;
    //individual
    IsPerson:boolean;
    Active:boolean;
    FullName:string;
    Credential:string;

    ArFullName:string;
    DOB:string | Date;
    Gender:string;
    MaritalStatus:string;
    EmployeeType:number;
    BloodGroup:string;
    PassPo:string;
    VIPPatientAccess:boolean;
    DriversLicenseNo:string;
    JoiningDate:string|Date;

    //personal information

    selectedFacility:Facility[];
    
selectedRole: Role;

UserName:string;
Initials:string;
Password:string;

HomePager:string;
HomeAddress1:string;

EmerRelationship:string;
selectedRelationship: RelationShip;
EmerAddress1:string;
EmerFullName:string;
EmerCountryId:number;
EmerStateId:number;
EmerCityId:number;
EmerZipCode:number;
EmerEmail:string;
EmerPhone:string;
EmerCellPhone:string;
EmerPager:string;
EmerFax:string;

Nic:string;

CityID:number;
CountryID:number;
StateID:string;
ZipCode:string;
CellNo:string;
Phone:string;
Email:string;
Fax:string;

BusAddress1:string;
BusCountryId:number;
BusCityId:number;
BusStateId:number;
BusZipCode:number;
BusEmail:string;
BusPhone:string;
BusCellPhone:string;
BusPager:string;
BusFax:string;


LicenseInfo:HrLicenseBindingModel[];
EmployeeRole:SecEmployeeRoleBindingModel[];

EmployeeFacility:HREmployeeFacilityBindingModel[];


}




export class SecEmployeeRoleBindingModel
{
    
   
   EmployeeId :number;

   RoleId :number;

  CreatedOn :Date;

    CreatedBy :string;

    UpdatedOn :Date;

     UpdatedBy :string;
}

export class HrLicenseBindingModel  {
    
    //HRLicenseId: number,
    EmployeeId: number;
    LicenseName: string;
    LicenseNo: number;
    ExpiryDate: string | Date;
    Active: boolean
 }




 
export class HREmployeeFacilityBindingModel  {
    
    //HRLicenseId: number,
    EmployeeId: number;
    FacilityID: number;
    CreatedOn :Date;

    CreatedBy :string;

    UpdatedOn :Date;

     UpdatedBy :string;
 }






export interface Country {
    name?: string;
    code?: string;
}



export interface HrEmployee {
  


      rowNum: number,
      employeeId: number,
      fullName: string,
      gender: string,
      employeeType: string,
      phone: string,
      cellNo: null,
      email: null,
      joiningDate: string|Date,
      active:boolean,
      typeDescription: string       
}



export interface HrLicense  {
    
       hrLicenseId: number,
       employeeId: number,
       licenseName: string,
       licenseNo: number,
       expiryDate: string | Date,
       active: boolean
    }







export interface RelationShip {
    name: string;
    code: number;
}




export interface City {
    name: string;
    code: number;
}







export interface State {
    name: string;
    code: number;
}





export interface Role {
    name: string;
    code: string;
}




export interface Facility {
    name: string;
    code: string;
}


export interface Gender {
    name: string;
    code: string;
}



export interface MaritalStatus {
    name: string;
    code: string;
}


export interface EmployeeType {
    name: string;
    code: string;
}

export interface BloodGroup {
    name: string;
    code: string;
}




export interface Resources {
    name: string;
    code: number;
}


export interface Status {
    name: string;
    code: number;
}


export class ProviderSchedule {
    active: boolean;

    maxOverloadApps:number;
    breakEndTime: string;
    breakStartTime: string;

    breakReason: string;
    usage:string;

    facilityID: number;
    providerId: number;
    siteId:number;

    providerName:string;
    facilityName:string;
    siteName:string;

    psId:number;






    startDate:string;
    startTime:string;


    monday:boolean;
    tuesday:boolean;

    wednesday:boolean;

    thursday:boolean;

    friday:boolean;

    saturday:boolean;

    sunday:boolean;



}
export class EligilibityHistory
{
    visitAccountNo: string;
    mrNo:string;
    patientName: string;
    facilityId: string;
    facilityName: string;
    eligibilityId: string;
    elRequestStatus: string;
    elStatus:string;
    createdBy:string;
    createdDate: string;
    requestStr: string;
    responseStr: string;
    messageTypeId: string;
    messageRequestDate: Date;
    messageResponseDate: Date;
    }