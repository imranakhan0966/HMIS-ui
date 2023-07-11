import { Component, OnInit } from '@angular/core';
import { MessageService, TreeNode } from 'primeng/api';
import { EnvironmentService } from 'src/app/services/common/environment.service';
import { SidenavbarService } from 'src/app/services/common/sidenavbar.service';
import { UsersService } from 'src/app/services/control-panel/users.service';
import { Role } from 'src/app/shared/control-panel/users';



@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})



export class RolesComponent implements OnInit {
  permissions: TreeNode[];
  selectedPermissions: TreeNode;



  roles: Role[];

    selectedRoles: Role[];
  constructor(private sidebarService:SidenavbarService, private environmentService:EnvironmentService, private userService: UsersService, private messageService: MessageService) { 

    this.roles = [
      {name: 'New York', code: 'NY'},
      {name: 'Rome', code: 'RM'},
      {name: 'London', code: 'LDN'},
      {name: 'Istanbul', code: 'IST'},
      {name: 'Paris', code: 'PRS'}
  ];
  }

  ngOnInit(): void {

     this.environmentService.checkLoginStatusAndRoute();
		this.environmentService.setPermissions();
    this.sidebarService.toggleSidebarVisibility(true); // this.environmentService.checkLoginStatusAndRoute();
	
    this.userService.getRoles().then((perms) =>{
debugger;
if(perms.table2){

  this.roles = perms.table2.map((item: { roleId : any; roleName: any; }) => {
    return {
      name: item.roleName,
      code: item.roleId
    };
  });
}




    });
  


    this.userService.getPermissions().then((perms) =>
    
    (this.permissions =<TreeNode[]> JSON.parse(perms.tree)));

  }


  nodeSelect(event:any) {
    this.messageService.add({severity: 'info', summary: 'Node Selected', detail: `Id: ${event.node.data} label: ${event.node.label}`});

    console.log(this.selectedPermissions);
}

nodeUnselect(event:any) {
    this.messageService.add({severity: 'info', summary: 'Node Unselected', detail: `Id: ${event.node.data} label: ${event.node.label}`});
    console.log(this.selectedPermissions);

}


expandAll(){
  this.permissions.forEach( node => {
      this.expandRecursive(node, true);
  } );
}

collapseAll(){
  this.permissions.forEach( node => {
      this.expandRecursive(node, false);
  } );
}

private expandRecursive(node:TreeNode, isExpand:boolean){
  node.expanded = isExpand;
  if (node.children){
      node.children.forEach( childNode => {
          this.expandRecursive(childNode, isExpand);
      } );
  }
}
}
