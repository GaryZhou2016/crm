import { Component, OnInit } from '@angular/core';
import { AddressesService} from '../../services/addresses.service';
import { Office } from '../../services/office';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-offices',
  templateUrl: './offices.component.html',
  styleUrls: ['./offices.component.css']
})
export class OfficesComponent implements OnInit {
  addresses: Array<Office> = [];
  id: number;
  name: string;
  address: string;
  officeIdToUpdate = null;
  dataSaved = false;
  statusCode: number;
  statusMsg: string;
  requestProcessing = false;
  processValidation = false;

  officeForm = new FormGroup({
       name: new FormControl('', Validators.required),
       address: new FormControl('', Validators.required)
    });

  constructor(private service: AddressesService) {
  }

  officeFormSubmit() {
    this.processValidation = true;
    if (this.officeForm.invalid) {
      return;
    }

    this.resetProcessConfig();
    const office = this.officeForm.value;

    if (this.officeIdToUpdate === null) {
      this.service.createOffice(office).subscribe(
        successCode => {
          //this.statusCode = successCode[0];
          console.log('code = ' + this.statusCode);
          this.statusCode = 201;
          this.updateStatusMsg(this.statusCode);
          this.fetchAll();
          this.backToCreate();
        },
        errorCode => this.statusCode = errorCode
        );
      } else {
       office.id = this.officeIdToUpdate;
       this.service.updateOffice(office).subscribe(
         successCode => {
           this.statusCode = successCode[0];
           this.updateStatusMsg(this.statusCode);
           this.fetchAll();
           this.backToCreate();
          },
          errorCode => {
            this.statusCode = errorCode;
            this.updateStatusMsg(this.statusCode);
          });
        }
      }
      loadOfficeForEdit(officeId: number) {
        this.resetProcessConfig();
        this.service.getOffice(officeId).subscribe(
        office => {
          Object.entries(office).forEach( key => {
            switch (key[0]) {
              case 'id' :
                 this.officeIdToUpdate = key[1];
                 break;
              case 'name' :
                this.name = key[1];
                break;
              case 'address' :
                this.address = key[1];
                break;
            }
          });

          this.officeForm.setValue({ name: this.name, address: this.address });
          this.processValidation = true;
          this.requestProcessing = false;
        },
        errorCode => {
          this.statusCode = errorCode;
          this.updateStatusMsg(this.statusCode);
        });
   }

  backToCreate() {
      this.officeIdToUpdate = null;
      this.officeForm.reset();
      this.processValidation = false;
   }

  remove(officeId: number) {
    this.resetProcessConfig();
    this.service.remove(officeId).subscribe(
      successCode => {
        //this.statusCode = successCode[0];
        this.statusCode = 204;
        this.updateStatusMsg(this.statusCode);
        this.fetchAll();
        this.backToCreate();
      },
      errorCode => {
        this.statusCode = errorCode;
        this.updateStatusMsg(this.statusCode);
      });
  }

  updateStatusMsg(code: number) {
    switch (code) {
      case 201:
        this.statusMsg = 'Office added successfully';
        break;
      case 409:
        this.statusMsg = 'Office already exists';
        break;
      case 200:
        this.statusMsg = 'Office updated successfully';
        break;
      case 204:
        this.statusMsg = 'Office deleted successfully';
        break;
      case 500:
        this.statusMsg = 'Internal server error';
    }

  }

  resetProcessConfig() {
      this.statusCode = null;
      this.requestProcessing = true;
   }

  fetchAll() {
        this.service.load().subscribe(
          addresses => this.addresses = addresses,
          errorCode => this.statusCode = errorCode
        );
   }

  ngOnInit() {
     this.fetchAll();
  }


}

