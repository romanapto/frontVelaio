import { Component, OnInit } from '@angular/core';
import {UsuarioService,Tarea} from '../../servicios/usuario.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  tareas: Tarea[] =[];
  token: String = '';
  id: String='';
  nombre: String='';
  

  constructor(  private _service:UsuarioService, private router:Router) { }

  ngOnInit(): void {

    this._service.getTarea().subscribe((data:any)=>{
      console.log('aqui data', data);
      this.tareas=data;
    });
    
  }

  verTarea(idx:any,title:any) {
    //console.log(this.token);
    this.router.navigate(['/tarea',idx])
  }

  crearTarea(title:any) {
    //console.log(this.token);
    this.router.navigate(['/tarea',0])
  }

}
