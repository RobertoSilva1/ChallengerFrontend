import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import {MatTableDataSource} from '@angular/material/table' ;
import {TableService} from '../app/services/table.service';
import {Contact} from './model/contact.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit{

  title = 'Challenger FrontEnd';
  displayedColumns: string[] = ['id','avatar', 'name', 'email', 'phone','fav'];
  dataSource = new MatTableDataSource
  checkedAll = false
  form : FormGroup
  ids :FormArray
  idAmount = 0
  modal = false

  constructor(private listService:TableService, private formBuilder:FormBuilder){
    this.form = this.formBuilder.group({
      ids : this.formBuilder.array([], [Validators.required])
    })
  }
  deselectAll(){
    for (let index = 0; index < this.idAmount; index++) {
      this.ids.removeAt(0)
    }
    this.idAmount = this.ids.length
  }
  onCheckboxChange(e) {
    this.ids = this.form.get('ids') as FormArray;
    if (e.target.checked) {
      this.ids.push(new FormControl(e.target.value));
    } else {
       const index =   this.ids.controls.findIndex(x => x.value === e.target.value);
       this.ids.removeAt(index);
    }
    this.idAmount = this.ids.length
  }
  submit(){
    for (let index = 0; index < this.idAmount; index++) {
      this.onDelete(this.ids.value[index]);
    }
    for (let index = 0; index < this.idAmount; index++) {
      this.ids.removeAt(0)
    }
    this.idAmount=0
  }
  ngOnInit() :void{
    this.dataSource.data = [
      {id:1, name: 'Nehuen', lastname: 'Silveira', nickname: 'Checho', phone: 123456789, email: 'chechosilveira@gmail.com', company: 'HolaMundo!', job: 'Developed', birthdate: {}, address: '', notes: 'Im a Notes 1', fav:true},
      {id:2, name: 'Soledad', lastname: 'Arquelin', nickname: 'Sole', phone: 123456789, email: 'solearquelin@gmail.com', company: 'HolaMundo!', job: '3D Graphis', birthdate: {}, address: '', notes: 'Im a Notes 2', fav:false},
      {id:3, name: 'Rafael', lastname: 'Bustos', nickname: 'Nerd', phone: 123456789, email: 'rafabustos@gmail.com', company: 'HolaMundo!', job: 'SEO', birthdate: {}, address: '', notes: 'Im a Notes 3', fav:false},
      {id:4, name: 'Rimuru', lastname: 'Tempest', nickname: 'Slime', phone: 123456789, email: 'rimurufest@gmail.com', company: 'HolaMundo!', job: 'Boss', birthdate: {}, address: '', notes: 'Im a Boss', fav:true},
      {id:5, name: 'Carlos', lastname: 'Oviedo', nickname: 'Wasabi', phone: 123456789, email: 'juampi123@gmail.com', company: 'HolaMundo!', job: 'cleaning staff', birthdate: {}, address: '', notes: 'Im a Notes 4', fav:false},
    ]
   this.listService.getContacts$().subscribe(res=>{this.dataSource.data=res;});

  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onDelete(id:number){
    this.listService.deleteContact(id)
    console.log('Eliminar', id)
  }

  nContact(nContact:Contact){
    this.listService.newContact(nContact)
  }
  addFav(id:Number,fav:boolean){
    fav = !fav
    this.listService.addfav(id,fav)
  }
  onEdit(element : Contact){
    this.listService.selectContact = element 
    this.modal = true
    console.log(this.listService.selectContact)
  }
} 
