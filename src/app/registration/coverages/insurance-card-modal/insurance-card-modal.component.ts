// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
// import {MessageService} from 'primeng/api';
// import { FileUpload } from 'primeng/fileupload';
// import { Observable } from 'rxjs';
// import { AppService } from 'src/app/services/app.service';
// import { UsersService } from 'src/app/services/control-panel/users.service';
// import { CoverageService } from 'src/app/services/registration/coverage.service';

// // import { ImageSharp } from '@ngx-image-sharp/core';


// @Component({
//   selector: 'app-insurance-card-modal',
//   templateUrl: './insurance-card-modal.component.html',
//   styleUrls: ['./insurance-card-modal.component.css'],
//   providers: [MessageService]
// })
// export class InsuranceCardModalComponent implements OnInit {
//   value: number = 0;
//   selectedPayer: any;

//   @Input() carrierId: any;
//   payers: any[];
//   res: any[];
//   selectedFiles?: FileList;
//   selectedFileNames: string[] = [];

//   progressInfos: any[] = [];
//   message: string[] = [];

//   previews: string[] = [];
//   imageInfos?: Observable<any>;

//   selectedImage: File;
//   selectedFile: File | null = null;
//   constructor(private messageService: MessageService,
//     private usersService: UsersService,
//     private coverageservice: CoverageService,
//     private app: AppService,
//     private userService:UsersService,
//     private http: HttpClient) {

//   }

//   ngOnInit(): void {
// debugger
// this.carrierId = this.usersService.getCarrierId();
// console.log(this.carrierId);


//     let interval = setInterval(() => {
//       this.value = this.value + Math.floor(Math.random() * 10) + 1;
//       if (this.value >= 100) {
//           this.value = 100;
//           this.messageService.add({severity: 'info', summary: 'Success', detail: 'Process Completed'});
//           clearInterval(interval);
//       }
//   }, 2000);
//   }
//   @Input() visible: boolean;
//   @Output() visibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();

//   hideModal() {
//     this.selectedImage == null;
//     this.visible = false;
//     debugger

//     this.carrierId = this.usersService.getCarrierId();
//      console.log(this.carrierId);
//     this.visibleChange.emit(this.visible);
//   }


//   imagePreview: string;



// onFileSelected(event: any): void {
//   debugger
//   this.selectedFile = event.files.item(0);
//   this.selectedImage = event.files[0];
//   this.previewImage();
// }
// uploadImage(): void {
//   debugger;
//   if (!this.selectedFile) {
//     return;
//   }
//   const formData: FormData = new FormData();
//   formData.append('image', this.selectedFile, this.selectedFile.name);
//   this.carrierId = this.usersService.getCarrierId();
//   formData.append('PayerId',this.carrierId);
//   this.coverageservice.FetchImageData(formData).then((response)=>{
// debugger

// this.userService.setCardResponse(response.patientName);
//     if(response != null)
//     {
//       console.log(response.patientName);
//       // this.userService.setCardResponse(response.patientName);
//       this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Successfully Inserted' });
//     }
//     }).catch(error => this.messageService.add({ severity: 'error', summary: 'Error', detail: error.message }));

// }


//   previewImage() {
//     debugger
//     const reader = new FileReader();
//     reader.onload = () => {
//       this.imagePreview = reader.result as string;
//     };
//     reader.readAsDataURL(this.selectedImage);
//   }
// }

