import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';

import { ClientService } from '../../services/client.service';

import { Client } from '../../models/Client';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css']
})
export class AddClientComponent implements OnInit {
  client: Client = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    balance: 0,
  }

  disableBalanceOnAdd: boolean = true;

  constructor(private flashMessagesService: FlashMessagesService,
              private clientService: ClientService,
              private router: Router) { }

  ngOnInit() {
  }

  onSubmit({value, valid}: {value: Client, valid: boolean}){
    if(this.disableBalanceOnAdd){
      value.balance = 0;
    }

    if(!valid){
      //show flash-message 
      this.flashMessagesService.show('Please fill out the form correctly!', 
        {cssClass: 'alert-danger', timeout: 4000});
    }
    else{
      //add client
      this.clientService.addClient(value);
      //show flash-message
      this.flashMessagesService.show('Client added successfully!', 
      {cssClass: 'alert-success', timeout: 4000});
      //redirect to dashboard
      this.router.navigate(['/']);
    }
  }

}
