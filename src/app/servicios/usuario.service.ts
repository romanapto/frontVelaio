import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';



@Injectable()
export class UsuarioService {

  usuarios: Tarea[] =[];
  
  
  urltarea = 'http://192.168.64.7:8080/tareas';
  urlPersona = 'http://192.168.64.7:8080/personas';
  

  constructor( private http: HttpClient) { 

    //console.log("Servicio listo para usarse!!!");
}


getTarea():any{
  return this.http.get(this.urltarea,{
    headers: {
      'Content-Type': 'application/json',
      }
      })
}

getTareaId(id:any):any{
  const options = {
    params: new HttpParams().set('idTarea', id)
  };
  return this.http.get(this.urltarea,options)
}

postPersona(persona:any):any{
  return this.http.post(this.urlPersona,persona ,{
    headers: {
      'Content-Type': 'application/json',
      }
      })
    
}

postTarea(tarea:any):any{
  return this.http.post(this.urltarea,tarea ,{
    headers: {
      'Content-Type': 'application/json',
      }
      })
    
}

  


}

export interface Tarea {

  idtarea:string;
  nombreTarea:string;
  usuario:[];
}