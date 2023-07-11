import { Component, OnInit, Input, NgModule } from '@angular/core';
import { TemplateService } from 'src/app/services/template.service';

@Component({
  selector: 'app-title-bar',
  templateUrl: './title-bar.component.html',
  styleUrls: ['./title-bar.component.css']
})
export class TitleBarComponent implements OnInit {

  constructor(public state: TemplateService) { }
  @Input() title: string = '';
  @Input() home: any = null;
  @Input() breadCrumbs: any = null;
  ngOnInit(): void {
  }
  handleToggleNavbar(){
		this.state.toggleSideBar();
	}
}
