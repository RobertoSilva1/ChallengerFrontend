import { Injectable } from '@angular/core';
import {Contact} from '../model/contact.interface';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TableService {
  private contactList : Contact[];
  private contactList$: Subject<Contact[]>
  public selectContact = {
    id: null,
    name :'',
    lastname :'',
    nickname :'',
    phone : null,
    email :'',
    company :'',
    job:'',
    birthdate:null,
    address :'',
    notes : '',
    fav: false
  }
  constructor() { 
    this.contactList= [
      {id:1, name: 'Nehuen', lastname: 'Silveira', nickname: 'Checho', phone: 123456789, email: 'chechosilveira@gmail.com', company: 'HolaMundo!', job: 'Developed', birthdate: {}, address: '', notes: 'Im a Notes 1', fav:true},
      {id:2, name: 'Soledad', lastname: 'Arquelin', nickname: 'Sole', phone: 123456789, email: 'solearquelin@gmail.com', company: 'HolaMundo!', job: '3D Graphis', birthdate: {}, address: '', notes: 'Im a Notes 2', fav:false},
      {id:3, name: 'Rafael', lastname: 'Bustos', nickname: 'Nerd', phone: 123456789, email: 'rafabustos@gmail.com', company: 'HolaMundo!', job: 'SEO', birthdate: {}, address: '', notes: 'Im a Notes 3', fav:false},
      {id:4, name: 'Rimuru', lastname: 'Tempest', nickname: 'Slime', phone: 123456789, email: 'rimurufest@gmail.com', company: 'HolaMundo!', job: 'Boss', birthdate: {}, address: '', notes: 'Im a Boss', fav:true},
      {id:5, name: 'Carlos', lastname: 'Oviedo', nickname: 'Wasabi', phone: 123456789, email: 'juampi123@gmail.com', company: 'HolaMundo!', job: 'cleaning staff', birthdate: {}, address: '', notes: 'Im a Notes 4', fav:false},
    ]
    this.contactList$ = new Subject();
  } 

  getContacts$(): Observable<Contact[]>{
    this.contactList$.next(this.contactList)
    return this.contactList$.asObservable();
  }
  addfav(id:Number,fav:boolean){
    for (let index = 0; index < this.contactList.length; index++) {
      if (this.contactList[index].id == id) this.contactList[index].fav=fav
    }
    this.contactList$.next(this.contactList)
  }
  editContact(editContact:Contact){
    let id = editContact.id;
    const index = this.contactList.findIndex(contact=>contact.id == id) 
    this.contactList[index] = editContact
    this.contactList$.next(this.contactList)
    this.cleanSelect()
  }
  
  deleteContact(id:Number){
    for (let index = 0; index < this.contactList.length; index++) {
      if (this.contactList[index].id == id) this.contactList.splice(index,1)
    }
    this.contactList$.next(this.contactList)
  }

  newContact(newContact:Contact){
    this.contactList.push(newContact)
    this.contactList$.next(this.contactList)
    this.cleanSelect()
  }
  lastId(){
    return this.contactList[this.contactList.length - 1].id
  }
  cleanSelect(){
    this.selectContact = {
      id: null,
      name :'',
      lastname :'',
      nickname :'',
      phone : null,
      email :'',
      company :'',
      job:'',
      birthdate:null,
      address :'',
      notes : '',
      fav: false
    }
  }
} 
