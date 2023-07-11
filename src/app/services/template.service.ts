import { Injectable } from '@angular/core';
// import { AuthService } from './auth.service';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { DecimalPipe } from '@angular/common';

import { environment } from '../../environments/environment';
import * as moment from 'moment';
// import { Platform } from '@angular/cdk/platform';
// import FileSaver from 'file-saver';

declare const epson: any;

@Injectable()

export class TemplateService {
    
    public loader$ = new Subject<boolean>();
    public loader = false;
    classChangeEvent:Subject<any> = new Subject();
    status_label="";

    isMobileSideBar=false;
    sideBarShow=false;

    store: any = {
    };

    setStore(store: any){
        this.store = {
            ...store
        }
    }

    public currency: any = {
        symbol_left: '$',
        symbol_right: '',
    }
    toggleSideBar() {
        // const main = document.querySelector(".layout-wrapper.layout-sidebar-darkgray.layout-slim.p-ripple-disabled")
        // const mobileActive = main.classList.toggle("layout-mobile-active")
        // if(mobileActive){
        //     const closeIcon = document.getElementById("sidebarCloseIcon")
        //     closeIcon.style.display = "block"
        // }else {
        //     const closeIcon = document.getElementById("sidebarCloseIcon")
        //     closeIcon.style.display = "none"
        // }
    }
    public returnView: boolean = false;
    public bShowSearch: boolean = true;
    public activeNav: any = {};

    public bodyClass = "";

    document: string = '';
    bLoader: boolean = false;
    // dateFormat: string = 'dd/mm/yy';
    public dateFormat: string = 'dd-MMM-yyyy';
    format: string = 'dd/mm/yyyy';
    formatT: string = 'dd/MM/yyyy';
    formatMoment: string = 'DD/MM/YYYY';
    empDefaultImage: string = 'assets/img/no_user.png';
    public transaction_tax_type:string = 'tax_inclusive';

    setClass(value: string){
        this.classChangeEvent.next({val:value});
    }

    transformDecimal(num: number) {
        return (Math.round(num * 100) / 100).toFixed(2);
    }

    getPermission(resource: string, isBool: boolean = false){
        if(this.store.permissions[resource] === undefined || this.store.permissions[resource] == 'n')
            return false;

        if(isBool)
            return this.store.permissions[resource] != 'n';
        
        return this.store.permissions[resource];
    }

    formatDate(date:Date, dateFormat:string = 'DD MMM, YYYY'){
        return moment(date).format(dateFormat);
    }

    numberFormat(number: number, decimals: number = 2, dec_point: string = '.', thousands_sep: string = ',') {
        // http://kevin.vanzonneveld.net
        // +   original by: Jonas Raoni Soares Silva (http://www.jsfromhell.com)
        // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
        // +     bugfix by: Michael White (http://getsprink.com)
        // +     bugfix by: Benjamin Lupton
        // +     bugfix by: Allan Jensen (http://www.winternet.no)
        // +    revised by: Jonas Raoni Soares Silva (http://www.jsfromhell.com)
        // +     bugfix by: Howard Yeend
        // +    revised by: Luke Smith (http://lucassmith.name)
        // +     bugfix by: Diogo Resende
        // +     bugfix by: Rival
        // +      input by: Kheang Hok Chin (http://www.distantia.ca/)
        // +   improved by: davook
        // +   improved by: Brett Zamir (http://brett-zamir.me)
        // +      input by: Jay Klehr
        // +   improved by: Brett Zamir (http://brett-zamir.me)
        // +      input by: Amir Habibi (http://www.residence-mixte.com/)
        // +     bugfix by: Brett Zamir (http://brett-zamir.me)
        // +   improved by: Theriault
        // +   improved by: Drew Noakes
        // *     example 1: number_format(1234.56);
        // *     returns 1: '1,235'
        // *     example 2: number_format(1234.56, 2, ',', ' ');
        // *     returns 2: '1 234,56'
        // *     example 3: number_format(1234.5678, 2, '.', '');
        // *     returns 3: '1234.57'
        // *     example 4: number_format(67, 2, ',', '.');
        // *     returns 4: '67,00'
        // *     example 5: number_format(1000);
        // *     returns 5: '1,000'
        // *     example 6: number_format(67.311, 2);
        // *     returns 6: '67.31'
        // *     example 7: number_format(1000.55, 1);
        // *     returns 7: '1,000.6'
        // *     example 8: number_format(67000, 5, ',', '.');
        // *     returns 8: '67.000,00000'
        // *     example 9: number_format(0.9, 0);
        // *     returns 9: '1'
        // *    example 10: number_format('1.20', 2);
        // *    returns 10: '1.20'
        // *    example 11: number_format('1.20', 4);
        // *    returns 11: '1.2000'
        // *    example 12: number_format('1.2000', 3);
        // *    returns 12: '1.200'
        let n = !isFinite(+number) ? 0 : +number,
            prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
            sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
            dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
            toFixedFix = function (n: number, prec: number) {
                // Fix for IE parseFloat(0.55).toFixed(0) = 0;
                let k = Math.pow(10, prec);
                return Math.round(n * k) / k;
            },
            s = (prec ? toFixedFix(n, prec) : Math.round(n)).toString().split('.');
        if (s[0].length > 3) {
            s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
        }
        if ((s[1] || '').length < prec) {
            s[1] = s[1] || '';
            s[1] += new Array(prec - s[1].length + 1).join('0');
        }
        return s.join(dec);
    }

    randHex() {
        return (Math.floor(Math.random() * 56) + 100).toString(16);
    }

    setHeight(): number{
        let headerHeight = 92;
        let middleHeight = 0;
        let content = document.getElementById('content');
        let bottomNav = document.getElementsByClassName('bottom-nav');
        let docHeight = window.innerHeight;
        let bottomHeight = 75;
        if(!this.bShowSearch){
            headerHeight = headerHeight - 44;
        }
        if(bottomNav.length > 0){
            middleHeight = bottomNav[0].clientHeight+26;
            let container:any = document.getElementsByClassName('height-container')[0];
            container.style.height = (docHeight - headerHeight - bottomHeight - middleHeight) + "px";
        }
        return docHeight - headerHeight - bottomHeight;
    }

    getRandomColor() {
        return this.randHex() + "" + this.randHex() + "" + this.randHex();
    }

    isEmptyObject(obj: any) {
        return (obj && (Object.keys(obj).length === 0));
    }

    currencyFormat(val: number, isAbs = false){
        if(isAbs)
            val = Math.abs(val);
        if(this.currency === undefined)
            return val;
        return (this.currency.symbol_left ? this.currency.symbol_left +"":"")
            + this.numberFormat(val)
            +(this.currency.symbol_right ? this.currency.symbol_right +" ":"");
    }

    // isEmpty(val: any) {
    //     if(val.length !== undefined){
    //         return val.length == 0;
    //     }
    //     if(typeof val == 'object'){
    //         return val == {};
    //     }
    //     return val == '';
    // }

    isUndefined(val?: number) {
        return val === undefined;
    }

    isNull(val?: number){
        return val === null;
    }

    constructor(public decimal:DecimalPipe) {
        this.loader$.pipe(debounceTime(300)).subscribe(loader => {
            this.loader = loader;
        });

        // this.isMobileSideBar = platform.ANDROID || platform.IOS;
    }

    // exportExcel(list: any, filename = 'file') {
    //     import('xlsx').then((xlsx) => {
    //       const worksheet = xlsx.utils.json_to_sheet(list);
    //       const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
    //       const excelBuffer: any = xlsx.write(workbook, {
    //         bookType: 'xlsx',
    //         type: 'array',
    //       });
    //       this.saveAsExcelFile(excelBuffer, filename);
    //     });
    //   }

      // saveAsExcelFile(buffer: any, fileName: string): void {
      //   let EXCEL_TYPE =
      //     'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
      //   let EXCEL_EXTENSION = '.xlsx';
      //   const data: Blob = new Blob([buffer], {
      //     type: EXCEL_TYPE,
      //   });
      //   FileSaver.saveAs(
      //     data,
      //     fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION
      //   );
      // }
}