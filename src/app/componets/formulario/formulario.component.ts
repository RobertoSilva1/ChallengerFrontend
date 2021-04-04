import { Component, OnInit } from '@angular/core';
import { TableService } from 'src/app/services/table.service';
import { AppComponent } from '../../app.component'

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent implements OnInit {
  element = this.tableService.selectContact
  constructor(
    public tableService: TableService,
    public app : AppComponent
  ) {
    this.app.modal
   }

  ngOnInit() {
  }
  onSave(){
    if (this.tableService.selectContact.id == null){
      this.tableService.selectContact.id = this.tableService.lastId() + 1
      this.tableService.newContact(this.element)
    }else{
      this.tableService.editContact(this.element)
    }
  }
}
