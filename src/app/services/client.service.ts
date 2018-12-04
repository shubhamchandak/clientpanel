import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'
import { Client } from '../models/Client'

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  clientsCollection: AngularFirestoreCollection<Client>;
  clientDoc: AngularFirestoreDocument<Client>;
  clients: Observable<Client[]>;
  client: Observable<Client>;

  constructor(private db: AngularFirestore) {
    this.clientsCollection = this.db.collection('clients', ref => ref.orderBy('lastName', 'asc'));
   }

   getClients(): Observable<Client[]> {
     this.clients = this.clientsCollection.snapshotChanges()
     .pipe(map(actions => {
       return actions.map(a => {
         const data = a.payload.doc.data() as Client;
         data.id = a.payload.doc.id;
         return data;
       });
     }));
     return this.clients;
   }
}
