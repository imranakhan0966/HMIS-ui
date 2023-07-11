import { Injectable } from "@angular/core";

@Injectable({
	providedIn: 'root'
})
export class ValidationService {
    Validation(value: any) {
		if (value == undefined || value == null || value == "") return true;
		else return false;
	}
}