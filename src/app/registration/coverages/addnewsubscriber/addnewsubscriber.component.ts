import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UsersService } from 'src/app/services/control-panel/users.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import {
  HrEmployee,
  Role,
  RelationShip,
  City,
  Country,
  Gender,
  MaritalStatus,
  EmployeeType,
  BloodGroup,
  Facility,
  HREmployeeRequestBindingModel,
  HREmployeeFacilityBindingModel,
  SecEmployeeRoleBindingModel,
  HrLicenseBindingModel,
} from 'src/app/shared/control-panel/users';
import { CoverageService } from 'src/app/services/registration/coverage.service';
import { Observable, Subscriber } from 'rxjs';
import { DemographicsService } from 'src/app/services/registration/demographics.service';
import { ApiService } from 'src/app/services/common/api.service';

@Component({
  selector: 'app-addnewsubscriber',
  templateUrl: './addnewsubscriber.component.html',
  styleUrls: ['./addnewsubscriber.component.css'],
})
export class AddnewsubscriberComponent implements OnInit {

  value: number = 0;
  selectedPayer: any;

  @Input() carrierId: any;
  payers: any[];
  res: any[];
  selectedFiles?: FileList;
  selectedFileNames: string[] = [];

  progressInfos: any[] = [];
  message: string[] = [];

  previews: string[] = [];
  imageInfos?: Observable<any>;  
  selectedImage: File;
  selectedFile: File | null = null;

  isModalOpen: boolean = false;
  
  @Input() visible: boolean;
  @Output() visibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  imagePreview: string;
  

  //-----------------------------//
  @Output() mrSearchEvent = new EventEmitter<string>();
  Detail: any;
  SubDetail: any;
  type: any[];

  selectedtype: any;

  FirstName: any;

  PostalCode: any;

  MiddleName: any;

  LastName: any;

  CellPhone: any;

  dob: Date;

  InsuredIdNo: any;

  Gender: any;

  selectedgender: any;

  Address: any;

  roles: any[] = [];

  selectedRole: any;

  titles: any[] = [];
  selectedtitles: any;

  facilities: any[] = [];
  selectedFacility: any;

  relationships: any[] = [];

  selectedRelationship: any;

  city: any[] = [];

  selectedCity: City;

  Country: any[] = [];

  selectedcountry: any;

  states: any[] = [];

  selectedState: any;

  genders: any[] = [];

  selectedGender: Gender;

  maritalstatuses: any[] = [];

  selectedMaritalStatus: any;

  employeetypes: any[] = [];

  selectedEmployeeType: any;

  bloodgroups: any[] = [];

  selectedBloodGroup: any;

  BLPayer: any[] = [];

  selectedBLPayer: any;

  BLPayerPlan: any[] = [];

  selectedBLPayerPlan: any;

  BLPayerPackage: any[] = [];

  selectedBLPayerPackage: any;

  pc: any;

  dn: any;

  op: any;

  ip: any;

  Active: boolean = false;

  mrNo: any;

  password: string;

  searchMr: any;
  status:any[];  
  clonedSubscribers: { [id: number]: any } = {};

  cacheItems: string[] = [
    'HREmployeeType',
    'RegBloodGroup',
    'HREmployee',
    'RegMaritalStatus',
    'RegGender',
    'RegCountries',
    'RegStates',
    'RegCities',
    'RegRelationShip',
    'SecRole',
    'RegFacility',
    'BLPayer',
    'BLPayerPlan',
    'RegTitle',
    'BLPayerPackage',
  ];

  policy: any = {
    CompanyOrIndividual: ' ',
    Suffix: ' ',
    EnteredBy: 'admin',
    FirstName: ' ',
    MiddleName: ' ',
    LastName: ' ',
    InsuredPhone: ' ',
    BirthDate: ' ',
    Sex: ' ',
    Address1: ' ',
    CarrierId: ' ',
    selectedBLPayerPlan: ' ',
    CountryId: ' ',
    StateId: ' ',
    CityId: ' ',
    ZipCode: ' ',
    InsuredIdNo: ' ',
    // selectedBLPayerPackage : ' ',
    Copay: ' ',
    DNDeductible: ' ',
    OpCopay: ' ',
    Deductibles: ' ',
    Inactive: '',
    OtherPhone: 'null',
    InsuranceTypeCode: 'null',
    Address2: 'null',
    regInsert: 'null',
    InsuredGroupOrPolicyName: ' ',
    InsuredGroupOrPolicyNo: ' ',
    MRNo: '',
    Image:'',
    regInsurancePolicy: [
      // {
      //   // effectiveDate: ' ',
      //   // terminationDate: ' ',
      //   // groupNo: ' ',
      //   // noOfVisits: ' ',
      //   // status: ' ',
      //   // subscriberId: 1,
      //   // amount: ' ',
      // },
    ],
    regDeduct: [
      {
        subscriberId: 1,
        serviceType: 7,
        deductible: 2571,
      },
    ],
  };

  constructor(
    private userService: UsersService,
    public apiService: ApiService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private coverageservice: CoverageService,
    public demoGrpahicsService: DemographicsService
  ) {}

  ngOnInit(): void {
    debugger;

    this.type = [
      { label: '[Both]', value: '0' },
      { label: 'Person', value: '1' },
      { label: 'Non Person', value: '2' },
      // Add more options as needed
    ];
    this.status=[
      {
         label:'Active', value:'true'

      },
      {
        label:'Inactive', value:'false'
      }
    ];

    this.Gender = [
      { label: 'Male', value: '0' },
      { label: 'Female', value: '1' },

      // Add more options as needed
    ];

    this.FillCache();
  }

  FillCache() {
    this.userService
      .getCacheItem({ entities: this.cacheItems })
      .then((response) => {
        if (response.cache != null) {
          this.FillDropDown(response);
        }
      })
      .catch((error) =>
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: error.message,
        })
      );
  }

  FillDropDown(response: any) {
    let jParse = JSON.parse(JSON.stringify(response)).cache;
    let reghrEmployee = JSON.parse(jParse).HREmployeeType;
    let regmaritalStatus = JSON.parse(jParse).RegMaritalStatus;
    let reggender = JSON.parse(jParse).RegGender;
    let regbgroup = JSON.parse(jParse).RegBloodGroup;
    let regcountries = JSON.parse(jParse).RegCountries;
    let regstates = JSON.parse(jParse).RegStates;
    let regcities = JSON.parse(jParse).RegCities;
    let regrelationships = JSON.parse(jParse).RegRelationShip;
    let regroles = JSON.parse(jParse).SecRole;
    let regfacility = JSON.parse(jParse).RegFacility;
    let regBLPayer = JSON.parse(jParse).BLPayer;
    let regBLPayerPlan = JSON.parse(jParse).BLPayerPlan;
    let regTitles = JSON.parse(jParse).RegTitle;
    let regBLPayerPackage = JSON.parse(jParse).BLPayerPackage;

    if (regfacility) {
      regfacility = regfacility.map((item: { ID: any; Name: any }) => {
        return {
          name: item.Name,
          code: item.ID,
        };
      });

      this.facilities = regfacility;
    }

    if (regroles) {
      regroles = regroles.map((item: { RoleId: any; RoleName: any }) => {
        return {
          name: item.RoleName,
          code: item.RoleId,
        };
      });

      this.roles = regroles;
    }

    if (regrelationships) {
      regrelationships = regrelationships.map(
        (item: { RelationshipId: any; Relationship: any }) => {
          return {
            name: item.Relationship,
            code: item.RelationshipId,
          };
        }
      );

      this.relationships = regrelationships;
    }

    if (regcities) {
      regcities = regcities.map((item: { CityId: any; Name: any }) => {
        return {
          name: item.Name,
          code: item.CityId,
        };
      });

      debugger;
      this.city = regcities.slice(0, 100);
    }

    if (regcountries) {
      regcountries = regcountries.map((item: { CountryId: any; Name: any }) => {
        return {
          name: item.Name,
          code: item.CountryId,
        };
      });

      this.Country = regcountries.slice(0, 100);
    }

    if (regstates) {
      regstates = regstates.map((item: { StateID: any; Name: any }) => {
        return {
          name: item.Name,
          code: item.StateID,
        };
      });

      this.states = regstates.slice(0, 100);
    }

    if (reghrEmployee) {
      reghrEmployee = reghrEmployee.map(
        (item: { TypeID: any; TypeDescription: any }) => {
          return {
            name: item.TypeDescription,
            code: item.TypeID,
          };
        }
      );

      this.employeetypes = reghrEmployee;
    }

    if (regmaritalStatus) {
      regmaritalStatus = regmaritalStatus.map(
        (item: { MaritalStatusId: any; MaritalStatus: any }) => {
          return {
            name: item.MaritalStatus,
            code: item.MaritalStatusId,
          };
        }
      );

      this.maritalstatuses = regmaritalStatus;
    }

    if (reggender) {
      reggender = reggender.map((item: { GenderId: any; Gender: any }) => {
        return {
          name: item.Gender,
          code: item.GenderId,
        };
      });

      this.genders = reggender;
    }

    if (regbgroup) {
      regbgroup = regbgroup.map(
        (item: { BloodGroupId: any; BloodGroup: any }) => {
          return {
            name: item.BloodGroup,
            code: item.BloodGroupId,
          };
        }
      );

      this.bloodgroups = regbgroup;
    }

    if (regBLPayer) {
      debugger
      regBLPayer = regBLPayer.map((item: { PayerId: any; PayerName: any }) => {
        return {
          name: item.PayerName,
          code: item.PayerId,
        };
      });
      debugger;
      this.BLPayer = regBLPayer;
    }

    if (regBLPayerPlan) {
      regBLPayerPlan = regBLPayerPlan.map(
        (item: { PlanId: any; PlanName: any }) => {
          return {
            name: item.PlanName,
            code: item.PlanId,
          };
        }
      );
      debugger;
      this.BLPayerPlan = regBLPayerPlan;
    }

    if (regBLPayerPackage) {
      regBLPayerPackage = regBLPayerPackage.map(
        (item: { PayerPackageId: any; PackageName: any }) => {
          return {
            name: item.PackageName,
            code: item.PayerPackageId,
          };
        }
      );
      debugger;
      this.BLPayerPackage = regBLPayerPackage;
    }

    if (regTitles) {
      regTitles = regTitles.map((item: { TitleId: any; Title: any }) => {
        return {
          name: item.Title,
          code: item.TitleId,
        };
      });
      debugger;
      this.titles = regTitles;
    }
  }

  searchMrEvent(event: any) {
    debugger;
    this.mrNo = event;

    // if(this.mrNo){
    //   this.getInsurrancePayerInfo(+this.mrNo);
    // }
  }

  // GetDemographicsByMRNo(MrNo:string = ''){
  //   debugger
  //   this.apiService.getCoverageAndRegPatient(MrNo).then((demographics) => {
  //     console.log("GetDemographicsByMRNo");

  // this.mrSearchEvent.emit(MrNo);

  //     console.log(demographics);

  //     if(demographics){

  // if(demographics.table1){
  // debugger
  //   this.Detail = demographics.table1[0];
  // }

  // // if(demographics.table2){
  // // debugger
  // //   this.PreSubDetail = demographics.table2[0];
  // // }

  // if(demographics.table1){
  // debugger
  //   this.SubDetail = demographics.table1[0];

  // }

  // // if(demographics.table5){
  // //   this.Family =  demographics.table5;

  // // }

  //     }

  // }).catch(error =>           this.messageService.add({ severity: 'error', summary: 'Error', detail: error.message }));

  // }

  insertsubscriber() {
    debugger;
    console.log(this.policy, 'policy');

    if (this.mrNo != null) {

      // if (this.policy.InsuredGroupOrPolicyName  == " " && this.policy.InsuredGroupOrPolicyNo == " " ) {
      //   this.messageService.add({
      //     severity: 'error',
      //     summary: 'Error',
      //     detail: 'Fields Required',
      //   });

      // }
      
      debugger
      
      this.policy.InsuredGroupOrPolicyName =this.policy.selectedBLPayerPlan.name;
      this.policy.InsuredGroupOrPolicyNo = this.policy.selectedBLPayerPlan.code;
      this.policy.MRNo = this.mrNo;
      this.coverageservice
        .InsertSubscriber(this.policy)
        .then((response) => {
          if (response.success) {
            //this.FillUserInfo(this.employeeId);

            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Successfully Inserted',
            });
          }
        })
        .catch((error) =>
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: error.message,
          })
        );
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'MR No Required',
      });
    }
  }

openModal(): void {
  if (this.policy.CarrierId != null) {
    this.isModalOpen = true;
  }
  else { 
    this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Insurance Carrier Requried' })
   }
}
  
hideModal() {
  this.selectedFile == null;
  this.selectedImage == null;
  this.visible = false;
  this.isModalOpen = false;
  debugger

  
   console.log(this.carrierId);
  this.visibleChange.emit(this.visible);
}

onFileSelected(event: any): void {
  debugger
  this.selectedFile = event.files.item(0);
  this.selectedImage = event.files[0];
  
  }
  uploadImage(): void {
  debugger;
  if (!this.selectedFile) {
    return;
  }
  
  const formData: FormData = new FormData();
  formData.append('image', this.selectedFile, this.selectedFile.name);
  
  formData.append('PayerId',this.policy.CarrierId);
  this.previewImage();

  this.coverageservice.FetchImageData(formData).then((response)=>{
  debugger
  this.policy.FirstName = response.patientName
  const fullName = response.patientName;
const nameParts = fullName.split(' ');

if (nameParts.length >= 2) {
  this.policy.FirstName = nameParts[0];
  this.policy.LastName = nameParts[nameParts.length - 1];
}
  this.policy.InsuredIdNo = response.insuranceMemberID;
 this.policy.Image== response.image;
const effectiveDate = response.effectiveDate;
const effDate = effectiveDate.split('T');
let policyno='';
if(response.policyNumber !=null &&response.policyNumber!=undefined)
{
policyno=response.policyNumber;
}
if(response.expiryDate!=null && response.expiryDate!=undefined){
const ExpiryDate = response.expiryDate;
const exDate = ExpiryDate.split('T');


// Create a new policy object
const newPolicy = {
  effectiveDate: effDate[0], // Assign the termination date
  terminationDate: exDate[0]
  // Assign the effective date
  // ... Assign other properties of the policy as needed
};


// Add the new policy object to the regInsurancePolicy array
this.policy.regInsurancePolicy.push(newPolicy);
}
else{
  
  const newPolicy = {
  effectiveDate: effDate[0], // Assign the termination date
  terminationDate: '',
  groupNo:policyno // Assign the effective date
  // ... Assign other properties of the policy as needed
  
};
this.policy.regInsurancePolicy.push(newPolicy);
}
    if(response != null)
    {
        this.messageService.add({severity: 'info', summary: 'Success', detail: 'Process Completed'});
       // this.hideModal() ;
    }
    }).catch(error => this.messageService.add({ severity: 'error', summary: 'Error', detail: error.message }));
  
  }
  
  
  previewImage() {
    debugger
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(this.selectedImage);
  }
  

}


