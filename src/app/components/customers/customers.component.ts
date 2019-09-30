import { Component, OnInit } from '@angular/core';
import { CustomersService } from '../../services/customers.service';
import { Customer } from 'src/app/services/customer';
import { Office } from 'src/app/services/office';


@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {
  dataArray: object[];
  customers: Array<Customer> = [];
  constructor(private service: CustomersService) { }

  ngOnInit() {
    this.service.load().subscribe(
      data => {
        this.dataArray = data as object [];
        this.updateCustomers();
      }
    );
  }

  updateCustomers() {
    this.dataArray.forEach( (obj) => {
        const cm = {} as Customer;
        cm.offices = [];
        Object.entries(obj).forEach( key => {
          // console.log(key[0] + ' ' + key[1]);
          switch ( key[0] ) {
            case 'id':
              cm.id = key[1];
              break;
            case 'firstname':
              cm.firstname = key[1];
              break;
            case 'lastname':
              cm.lastname = key[1];
              break;
            case 'offices':
              if (key[1]) {
                 Object.entries(key[1]).forEach( ad => {
                   const addr = {} as Office;
                   Object.entries(ad[1]).forEach( adKey => {
                     // console.log(adKey[0] + ' ' + adKey[1]);
                     switch ( adKey[0] ) {
                     case 'id':
                     addr.id = adKey[1];
                     break;
                     case 'name':
                     addr.name = adKey[1];
                     break;
                     case 'address':
                     addr.address = adKey[1];
                     break;
                     }
                   });
                   console.log ('whole ' + addr);
                   cm.offices.push(addr);
                 }
                 );
              }
              break;
          }
        });
        this.customers.push(cm);
    });
  }

}


