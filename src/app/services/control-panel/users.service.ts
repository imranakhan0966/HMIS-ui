import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { AppService } from '../app.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient,private app: AppService) {
   

  }




getDataUsers(){
    return [
        {

id :1001,
name :'Abdul Rafay',
gender:'Male',
employeetype:'Nurse',
phone:'93938383',
cell:'19889383938',
email:'rafay@test.com',
joiningdate:'2001-09-13',
active:true

    },
    {

        id :1002,
        name :'Saleem New',
        gender:'Female',
        employeetype:'Doctor',
        phone:'93938383',
        cell:'19889383938',
        email:'new@test.com',
        joiningdate:'2015-09-13',
        active:false
        
            },
            {

                id :1003,
                name :'Abdul Aleem',
                gender:'Unknown',
                employeetype:'Mechanic',
                phone:'93932322283',
                cell:'484889383938',
                email:'mech@test.com',
                joiningdate:'2002-09-13',
                active:true
                
                    },

                    {

                        id :1004,
                        name :'Abdul Rafay',
                        gender:'Male',
                        employeetype:'Nurse',
                        phone:'93938383',
                        cell:'19889383938',
                        email:'rafay@test.com',
                        joiningdate:'2004-02-10',
                        active:true
                        
                            },

                            {

                                id :1005,
                                name :'Abdul Rafay',
                                gender:'Male',
                                employeetype:'Nurse',
                                phone:'93938383',
                                cell:'19889383938',
                                email:'rafay@test.com',
                                joiningdate:'2007-09-13',
                                active:true
                                
                                    },

                                    {

                                        id :1006,
                                        name :'Abdul Rafay',
                                        gender:'Male',
                                        employeetype:'Nurse',
                                        phone:'93938383',
                                        cell:'19889383938',
                                        email:'rafay@test.com',
                                        joiningdate:'2019-09-13',
                                        active:true
                                        
                                            },

                                            {

                                                id :1007,
                                                name :'Abdul Rafay',
                                                gender:'Male',
                                                employeetype:'Nurse',
                                                phone:'93938383',
                                                cell:'19889383938',
                                                email:'rafay@test.com',
                                                joiningdate:'2020-09-13',
                                                active:true
                                                
                                                    },


                                                    {

                                                        id :1008,
                                                        name :'Abdul Rafay',
                                                        gender:'Male',
                                                        employeetype:'Nurse',
                                                        phone:'93938383',
                                                        cell:'19889383938',
                                                        email:'rafay@test.com',
                                                        joiningdate:'2021-09-13',
                                                        active:true
                                                        
                                                            },



                                                            {

                                                                id :1009,
                                                                name :'Abdul Rafay',
                                                                gender:'Male',
                                                                employeetype:'Nurse',
                                                                phone:'93938383',
                                                                cell:'19889383938',
                                                                email:'rafay@test.com',
                                                                joiningdate:'2022-09-13',
                                                                active:true
                                                                
                                                                    },


                                                                    {

                                                                        id :1010,
                                                                        name :'Seventh Abdul Rafay',
                                                                        gender:'Male',
                                                                        employeetype:'Nurse',
                                                                        phone:'93938383',
                                                                        cell:'19889383938',
                                                                        email:'rafay@test.com',
                                                                        joiningdate:'2023-09-13',
                                                                        active:true
                                                                        
                                                                            },



                                                                            {

                                                                                id :1011,
                                                                                name :'Abdul Rafay',
                                                                                gender:'Male',
                                                                                employeetype:'Nurse',
                                                                                phone:'93938383',
                                                                                cell:'19889383938',
                                                                                email:'rafay@test.com',
                                                                                joiningdate:'2024-09-13',
                                                                                active:true
                                                                                
                                                                                    },

                                                                                    
                                                                            {

                                                                                id :1012,
                                                                                name :'Abdul Kareem ali',
                                                                                gender:'Male',
                                                                                employeetype:'Nurse',
                                                                                phone:'93938383',
                                                                                cell:'19889383938',
                                                                                email:'rafay@test.com',
                                                                                joiningdate:'2025-09-13',
                                                                                active:true
                                                                                
                                                                                    }
        

];
}



 



getCustomers(params?: any) {
    return this.http.get<any>('https://www.primefaces.org/data/customers', { params: params }).toPromise();
}





getHrEmployees(params?: any) {
    return this.app.get(`User/List${params}`).toPromise();
}




removeEmployees(Id:number) {
    return this.app.delete(`User/Delete/${Id}`).toPromise();
}

getHrEmployeesByEmpId(Id:number) {
    return this.app.get(`User/${Id}`).toPromise();
}

getCacheItem(object: any) {
    return this.app.post('Cache/GetCache', object).toPromise();
}






saveLicense(object: any) {
    return this.app.post('User/SaveLicense', object).toPromise();
}


saveEmployee(object: any) {
    return this.app.post('User/InsertUsers', object).toPromise();
}




getLicenseById(Id:number) {
    return this.app.get(`User/GetLicense/${Id}`).toPromise();
}

removeLicense(Id:number) {
    return this.app.delete(`User/DeleteLicense/${Id}`).toPromise();
}



getPermissions() {
    return this.app.get('Role/GetPermissionTree').toPromise()
      
    }



    getRoles() {
        return this.app.get('Role').toPromise()
          
        }




        gtTaskToDo( receiverId:number,  receiverRoleId:number, facilityId :string, pageNumber :number, pageSize :number) {
            return this.app.get(`Welcome/GetTaskToDo?receiverId=${receiverId}&receiverRoleId=${receiverRoleId}&facilityId=${facilityId}&pageNumber=${pageNumber}&pageSize=${pageSize}`).toPromise();
        }
        
        
        
        
        getPersonalReminders( employeeId:number, pageNumber :number, pageSize :number,sortColumn:string,sortOrder:string) {
          return this.app.get(`Welcome/GetPersonalReminders?employeeId=${employeeId}&pageNumber=${pageNumber}&pageSize=${pageSize}&sortColumn=${sortColumn}&sortOrder=${sortOrder}`).toPromise();
        }
        
        
        getSchAppointmentsLoad( fromDate:Date,toDate:Date,providerId:number,siteId:number,facilityId:string, pageNumber :number, pageSize :number,sortColumn:string,sortOrder:string) {
          return this.app.get(`Welcome/GetSchAppointmentsLoad?fromDate=${fromDate}&toDate=${toDate}&providerId=${providerId}&siteId=${siteId}&facilityId=${facilityId}&pageNumber=${pageNumber}&pageSize=${pageSize}&sortColumn=${sortColumn}&sortOrder=${sortOrder}`).toPromise();
        }
        
        
        
        savePersonalReminder(object: any) {
          return this.app.post('Welcome/InsertPersonalReminder', object).toPromise();
        }
        
        
        
        updatePersonalReminder(reminderId: number , employeeId:number,reminderText:string,reminderDateTime:Date,updatedBy:string) {
          return this.app.put(`Welcome/UpdatePersonalReminder?reminderId=${reminderId}&employeeId=${employeeId}&reminderText=${reminderText}&reminderDateTime=${reminderDateTime}&updatedBy=${updatedBy}`,null).toPromise();
        }

        deletePersonalReminder(reminderId: number) {
            return this.app.delete(`Welcome/DeletePersonalReminder?reminderId=${reminderId}`).toPromise();
          }




          getEmployeeFacilityFromCache() {
            return this.app.get('Common/GetEmployeeFacilityFromCache').toPromise();
        }

        // getCarrierId() {
        //     return this.app.get('Common/GetEmployeeFacilityFromCache').toPromise();
        // }
};

