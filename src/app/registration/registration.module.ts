import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegistrationRoutingModule } from './registration-routing.module';
import { DemographicsComponent } from './demographics/demographics.component';
import { CoveragesComponent } from './coverages/coverages.component';
import { ToastModule } from 'primeng/toast';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { SplitButtonModule } from 'primeng/splitbutton';
import { UsersService } from '../services/control-panel/users.service';

// Import PrimeNG modules
import { AccordionModule } from 'primeng/accordion';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { AvatarModule } from 'primeng/avatar';
import { BadgeModule } from 'primeng/badge';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { CalendarModule } from 'primeng/calendar';
import { CarouselModule } from 'primeng/carousel';
import { CascadeSelectModule } from 'primeng/cascadeselect';
import { CheckboxModule } from 'primeng/checkbox';
import { ChipModule } from 'primeng/chip';
import { ChipsModule } from 'primeng/chips';
import { CodeHighlighterModule } from 'primeng/codehighlighter';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ColorPickerModule } from 'primeng/colorpicker';
import { ContextMenuModule } from 'primeng/contextmenu';
import { DataViewModule } from 'primeng/dataview';
import { VirtualScrollerModule } from 'primeng/virtualscroller';
import { DialogModule } from 'primeng/dialog';
import { DividerModule } from 'primeng/divider';
import { DockModule } from 'primeng/dock';
import { DropdownModule } from 'primeng/dropdown';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { FieldsetModule } from 'primeng/fieldset';
import { FileUploadModule } from 'primeng/fileupload';
import { GalleriaModule } from 'primeng/galleria';
import { GMapModule } from 'primeng/gmap';
import { InplaceModule } from 'primeng/inplace';
import { InputMaskModule } from 'primeng/inputmask';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ImageModule } from 'primeng/image';
import { KnobModule } from 'primeng/knob';
import { LightboxModule } from 'primeng/lightbox';
import { ListboxModule } from 'primeng/listbox';
import { MegaMenuModule } from 'primeng/megamenu';
import { MenuModule } from 'primeng/menu';
import { MenubarModule } from 'primeng/menubar';
import { MessagesModule } from 'primeng/messages';
import { MultiSelectModule } from 'primeng/multiselect';
import { OrganizationChartModule } from 'primeng/organizationchart';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { PaginatorModule } from 'primeng/paginator';
import { PanelModule } from 'primeng/panel';
import { PanelMenuModule } from 'primeng/panelmenu';
import { PasswordModule } from 'primeng/password';
import { ProgressBarModule } from 'primeng/progressbar';
import { RadioButtonModule } from 'primeng/radiobutton';
import { RatingModule } from 'primeng/rating';
import { ScrollerModule } from 'primeng/scroller';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { ScrollTopModule } from 'primeng/scrolltop';
import { SelectButtonModule } from 'primeng/selectbutton';
import { SkeletonModule } from 'primeng/skeleton';
import { SlideMenuModule } from 'primeng/slidemenu';
import { SliderModule } from 'primeng/slider';
import { SpeedDialModule } from 'primeng/speeddial';
import { SpinnerModule } from 'primeng/spinner';
import { SplitterModule } from 'primeng/splitter';
import { StepsModule } from 'primeng/steps';
import { TabMenuModule } from 'primeng/tabmenu';
import { TableModule } from 'primeng/table';
import { TabViewModule } from 'primeng/tabview';
import { TagModule } from 'primeng/tag';
import { TerminalModule } from 'primeng/terminal';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { TimelineModule } from 'primeng/timeline';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { ToolbarModule } from 'primeng/toolbar';
import { TooltipModule } from 'primeng/tooltip';
import { TriStateCheckboxModule } from 'primeng/tristatecheckbox';
import { TreeModule } from 'primeng/tree';
import { TreeSelectModule } from 'primeng/treeselect';
import { TreeTableModule } from 'primeng/treetable';
import { AnimateModule } from 'primeng/animate';
import { CardModule } from 'primeng/card';
import { BlockUIModule } from 'primeng/blockui';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {ConfirmPopupModule} from 'primeng/confirmpopup';

import { NgxPermissionsModule } from 'ngx-permissions';
import { ConfirmationService, SharedModule } from 'primeng/api';
import { EncounterComponent } from './encounter/encounter.component';
import { AlertComponent } from './alert/alert.component';
import { TemporarydemographicsComponent } from './temporarydemographics/temporarydemographics.component';
import { DemographicsEditComponent } from './demographics/demographics-edit/demographics-edit.component';
import { TempdemographicsEditComponent } from './temporarydemographics/tempdemographics-edit/tempdemographics-edit.component';
import { DemographicsListComponent } from './demographics/demographics-list/demographics-list.component';
import { TempdemographicsListComponent } from './temporarydemographics/tempdemographics-list/tempdemographics-list.component';
import { CommoncomponentModule } from '../commoncomponent/commoncomponent.module';
import { AddnewsubscriberComponent } from './coverages/addnewsubscriber/addnewsubscriber.component';
import { EligibilityComponent } from './eligibility/eligibility.component';
import { EligibilityHistoryComponent } from './eligibility-history/eligibility-history.component';


@NgModule({
  declarations: [
    DemographicsComponent,
    CoveragesComponent,
    EncounterComponent,
    AlertComponent,
    TemporarydemographicsComponent,
    DemographicsEditComponent,
    TempdemographicsEditComponent,
    DemographicsListComponent,
    TempdemographicsListComponent,
    AddnewsubscriberComponent,
    EligibilityComponent,
    EligibilityHistoryComponent
    
  ],
  imports: [
    CommonModule,
    RegistrationRoutingModule,
    SharedModule,
    CommonModule,
   
    ConfirmPopupModule,
    SidebarModule,SplitButtonModule,
    ButtonModule,ToastModule,CheckboxModule,
    

    AvatarModule,
    FormsModule,
    
    ReactiveFormsModule,
    AccordionModule,
    AutoCompleteModule,
    BadgeModule,
    BreadcrumbModule,
    BlockUIModule,
    ButtonModule,
    CalendarModule,
    CarouselModule,
    CascadeSelectModule,
    CheckboxModule,
    ChipsModule,
    ChipModule,
    CodeHighlighterModule,
    ColorPickerModule,
    ConfirmDialogModule,
    ContextMenuModule,
    VirtualScrollerModule,
    DataViewModule,
    DialogModule,
    DividerModule,
    DockModule,
    DropdownModule,
    DynamicDialogModule,
    FieldsetModule,
    FileUploadModule,
    GalleriaModule,
    GMapModule,
    InplaceModule,
    InputMaskModule,
    InputSwitchModule,
    InputTextModule,
    InputTextareaModule,
    InputNumberModule,
    ImageModule,
    KnobModule,
    LightboxModule,
    ListboxModule,
    MegaMenuModule,
    MenuModule,
    MenubarModule,
    MessagesModule,
    MultiSelectModule,
    OrganizationChartModule,
    OverlayPanelModule,
    PaginatorModule,
    PanelModule,
    PanelMenuModule,
    PasswordModule,
    ProgressSpinnerModule,
    ProgressBarModule,
    RadioButtonModule,
    RatingModule,
    SelectButtonModule,
    SidebarModule,
    ScrollerModule,
    ScrollPanelModule,
    ScrollTopModule,
    SkeletonModule,
    SlideMenuModule,
    SliderModule,
    SpeedDialModule,
    SpinnerModule,
    SplitterModule,
    SplitButtonModule,
    StepsModule,
    TableModule,
    TabMenuModule,
    TabViewModule,
    TagModule,
    TerminalModule,
    TieredMenuModule,
    TimelineModule,
    ToastModule,
    ToggleButtonModule,
    ToolbarModule,
    TooltipModule,
    TriStateCheckboxModule,
    TreeModule,
    TreeSelectModule,
    TreeTableModule,
    AnimateModule,
    CardModule,
    CommoncomponentModule,
    NgxPermissionsModule.forChild()
  ],
  providers: 
  [
    UsersService,
    ConfirmationService
  ],
})
export class RegistrationModule { }
