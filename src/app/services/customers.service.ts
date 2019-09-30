import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Customer } from './customer';

const customers: Array<Customer> = [];
const customerservicepoint = 'http://localhost:8181/UserManagement/customer';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {

  constructor(private http: HttpClient) {
    console.log('inside!!!');
  }
  get() {
    return customers.slice();
  }

  add(customer) {
    customers.push(customer);
    return this.get();
  }

  remove(customer) {
    customers.splice(customers.indexOf(customer), 1);
    return this.get();
  }

  load() {
      return this.http.get(customerservicepoint);
  }
}



