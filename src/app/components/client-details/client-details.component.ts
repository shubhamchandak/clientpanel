import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

import { Client } from '../../models/Client';

import { ClientService } from '../../services/client.service';

@Component({
  selector: 'app-client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.css']
})
export class ClientDetailsComponent implements OnInit {
  id: string;
  client: Client;
  hasBalance: boolean = false;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private flashMessagesService: FlashMessagesService,
              private clientService: ClientService) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.clientService.getClient(this.id).subscribe(client => {
      if(client != null){
        if(client.balance > 0){
          this.hasBalance = true;
        }
      }
      this.client = client;
    });
  }

}
