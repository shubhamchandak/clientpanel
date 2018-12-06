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
    this.clientsCollection = this.db.collection('clients', ref => ref.orderBy('firstName', 'asc'));
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

   addClient(client: Client): void{
      this.clientsCollection.add(client);
   }

   getClient(id: string): Observable<Client>{
     this.clientDoc = this.db.doc<Client>(`clients/${id}`);
     this.client = this.clientDoc.snapshotChanges()
      .pipe(map(action => {
        if(action.payload.exists == false){
          return null;
        }
        else {
          const data = action.payload.data() as Client;
          data.id = action.payload.id;
          return data;
        }
      }));
     return this.client;
   }
}
