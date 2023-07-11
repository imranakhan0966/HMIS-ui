import { Injectable } from "@angular/core";

@Injectable({
	providedIn: 'root'
})

export class PermissionService {
    constructor() {}
    usrCreate:boolean=false;
    usrUpdate:boolean=false;
    usrList:boolean=false;
    usrDlt:boolean=false;
    grpCreate:boolean=false;
    grpUpdate:boolean=false;
    grpList:boolean=false;
    grpDelete:boolean=false;
    Deltgrps:boolean=false;
    updgrps:boolean=false;
    PwdpCreate:boolean=false;
    PwdpUpdate:boolean=false;
    PwdpList:boolean=false;
    PwdpDlt:boolean=false;
    country:boolean=false;
    city:boolean=false;
    dept:boolean=false;
    jobTitle:boolean=false;
    desig:boolean=false;
    gender:boolean=false;
    company:boolean=false;
    status:boolean=false;
    marStatus:boolean=false;
    avgSpeedUsrInfo:boolean=false;
    helmetWearUsrInfo:boolean=false;
    trDetUserInfo:boolean=false;
    disconnectAlertUsrInfo:boolean=false;
    disconnectAlertUsrCount:boolean=false;
    helmetViolateSummary:boolean=false;
    speedViolateCount:boolean=false;
    speedViolateReport:boolean=false;
    usrGrpReport:boolean=false;
    usrThreshold:boolean=false;
    trDetail:boolean=false;
    dsrJourney:boolean=false;
    trAboveSpeed:boolean=false;
    getAssignedPermission(){
        var sideBar =JSON.parse(localStorage.getItem("permission") || "[]");
        for(var i=0;i<=sideBar.length;i++)
        {
            if(sideBar[i]?.permissionDesc=="User Create"){
                this.usrCreate=true;
            }
            if(sideBar[i]?.permissionDesc=="User Update"){
                this.usrUpdate=true;
            }
            if(sideBar[i]?.permissionDesc=="User List"){
                this.usrList=true;
            }
            if(sideBar[i]?.permissionDesc=="User Delete"){
                this.usrDlt=true;
            }
            if(sideBar[i]?.permissionDesc=="Group Create"){
                this.grpCreate=true;
            }
            if(sideBar[i]?.permissionDesc=="Group Update"){
                this.grpUpdate=true;
            }
            if(sideBar[i]?.permissionDesc=="Group List"){
                this.grpList=true;
            }
            if(sideBar[i]?.permissionDesc=="Group Delete"){
                this.grpDelete=true;
            }
            if(sideBar[i]?.permissionDesc=="Password Policy Create"){
                this.PwdpCreate=true;
            }
            if(sideBar[i]?.permissionDesc=="Password Policy Update"){
                this.PwdpUpdate=true;
            }
            if(sideBar[i]?.permissionDesc=="Password Policy List"){
                this.PwdpList=true;
            }
            if(sideBar[i]?.permissionDesc=="Password Policy Delete"){
                this.PwdpDlt=true;
            }
            if(sideBar[i]?.permissionDesc=="Country"){
                this.country=true;
            }
            if(sideBar[i]?.permissionDesc=="City"){
                this.city=true;
            }
            if(sideBar[i]?.permissionDesc=="City"){
                this.city=true;
            }
            if(sideBar[i]?.permissionDesc=="Department"){
                this.dept=true;
            }
            if(sideBar[i]?.permissionDesc=="Designation"){
                this.desig=true;
            }
            if(sideBar[i]?.permissionDesc=="Gender"){
                this.gender=true;
            }
            if(sideBar[i]?.permissionDesc=="Company"){
                this.company=true;
            }
            if(sideBar[i]?.permissionDesc=="Status"){
                this.status=true;
            }
            if(sideBar[i]?.permissionDesc=="Marital Status"){
                this.marStatus=true;
            }
            if(sideBar[i]?.permissionDesc=="Job Title"){
                this.jobTitle=true;
            }
            if(sideBar[i]?.permissionDesc=="Tracking Details"){
                this.trDetail=true;
            }
            if(sideBar[i]?.permissionDesc=="DRS journey"){
                this.dsrJourney=true;
            }
            if(sideBar[i]?.permissionDesc=="Tracking Above Speed"){
                this.trAboveSpeed=true;
            }
            if(sideBar[i]?.permissionDesc=="Average Speed Information with User Info"){
                this.avgSpeedUsrInfo=true;
            }
            if(sideBar[i]?.permissionDesc=="Helmet Wearing Information User Info"){
                this.helmetWearUsrInfo=true;
            }
            if(sideBar[i]?.permissionDesc=="Tracking Details Report with User Info"){
                this.trDetUserInfo=true;
            }
            if(sideBar[i]?.permissionDesc=="Disconnecting Alert Report"){
                this.disconnectAlertUsrInfo=true;
            }
            if(sideBar[i]?.permissionDesc=="Disconnecting Alert User Count"){
                this.disconnectAlertUsrCount=true;
            }
            if(sideBar[i]?.permissionDesc=="Helmet Violation Summary"){
                this.helmetViolateSummary=true;
            }
            if(sideBar[i]?.permissionDesc=="Speed Violation Count"){
                this.speedViolateCount=true;
            }
            if(sideBar[i]?.permissionDesc=="Speed Violation Report"){
                this.speedViolateReport=true;
            }
            if(sideBar[i]?.permissionDesc=="User and Group Report"){
                this.usrGrpReport=true;
            }
            if(sideBar[i]?.permissionDesc=="User Threshold Report"){
                this.usrThreshold=true;
            }
            else
            {
                
            }
        }
    }

}