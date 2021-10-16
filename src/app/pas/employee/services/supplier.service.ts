 import {Supplier} from '../model/supplier.model';
import {HttpClient} from '@angular/common/http';
import {Injectable} from  '@angular/core';
import {environment} from '../../../../environments/environment';

@Injectable()
export class SupplierService{
    constructor(private http:HttpClient){}
    getAllSupplier():Supplier[]{
        return [{id:1, supName:"Reliance Fresh", typeOfSupplier:"External", email:"Reliance@gmail.com", phoneNumber:9902087813},
        {id:2, supName:"More Supermarkets",typeOfSupplier:"Internal", email:"moreIndia@gmail.com", phoneNumber:7411749229},
        {id:3, supName:"Avenue Supermarts",typeOfSupplier:"Internal", email:"DMart@yahoo.com", phoneNumber:8762349915},
        {id:4, supName:"Patanjali Ayurworld",typeOfSupplier:"External", email:"Ayurveda@outlook.com", phoneNumber:9740638910},
        {id:5, supName:"Big Basket",typeOfSupplier:"Internal", email:"basket555@gmail.com", phoneNumber:7755500012},
        {id:6, supName:"Nandini Milk",typeOfSupplier:"External", email:"kmf_Nandini@gmail.com", phoneNumber:7845651547},
        {id:7, supName:"Kohinoor Groceries",typeOfSupplier:"Internal", email:"kohinoor777@gmail.com", phoneNumber:7709991111},
        {id:8, supName:"EVEREST Spices",typeOfSupplier:"External", email:"spicesOfIndia@gmail.com", phoneNumber:8618077848}]
    }
}

