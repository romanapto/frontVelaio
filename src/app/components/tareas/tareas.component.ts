import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioService } from 'src/app/servicios/usuario.service';

@Component({
  selector: 'app-tareas',
  templateUrl: './tareas.component.html',
  styleUrls: ['./tareas.component.css']
})
export class TareasComponent implements OnInit {

  
  forma: FormGroup ;
  idTarea:String='';

  constructor(private fb: FormBuilder, private activatedRoute:ActivatedRoute, private _service:UsuarioService,private router:Router) { 
    this.crearFormulario();
    this.cargarDataAlFormulario();
    this.crearListeners();
    this.activatedRoute.params.subscribe( params =>{
      //console.log(params['id']);
      this.idTarea = params['id'];
    })
  }

  ngOnInit(): void {
    if (this.idTarea!=='0'){ 
      
    }
  }

  get habilidad() {
    return this.forma.get('habilidad') as FormArray;
  }

  get nombreNoValido() {
      return this.forma.get('nombre').invalid && this.forma.get('nombre').touched
  }

  get idNoValido() {
    return this.forma.get('id').invalid && this.forma.get('id').touched
  }

  get idPersonaNoValido() {
    return this.forma.get('persona.idPersona').invalid && this.forma.get('persona.idPersona').touched
  }

  get nombrePersonaNoValido() {
    return this.forma.get('persona.nombrePersona').invalid && this.forma.get('persona.nombrePersona').touched
  }

  get edadPersonaNoValido() {
    return this.forma.get('persona.nombrePersona').invalid && this.forma.get('persona.nombrePersona').touched
  }



  crearFormulario() {

    this.forma = this.fb.group({
      nombre  : ['Julian',[ Validators.required, Validators.minLength(5)]  ],
      id  : ['00',[ Validators.required, Validators.minLength(2)]  ],
      persona: this.fb.group({
        idPersona: ['', Validators.required ],
        nombrePersona  : ['', Validators.required ],
        edadPersona  : ['', Validators.required ],
      }),
      habilidad: this.fb.array([])
    });

  }

  crearListeners() {
    // this.forma.valueChanges.subscribe( valor => {
    //   console.log(valor);
    // });

    //this.forma.statusChanges.subscribe( status => console.log({ status }));
    this.forma.get('nombre').valueChanges.subscribe( console.log );
  }

  cargarDataAlFormulario() {

    // this.forma.setValue({
    this.forma.reset({
      nombre: 'Julian',
      id: '00',
      persona: {
        idPersona: '00',
        nombrePersona: 'Pepito',
        edadPersona:'40'
      },
    });

  }

  agregarHabilidad() {
    this.habilidad.push(  this.fb.control('')  );
  }

  borrarHabilidad(i: number) {
    this.habilidad.removeAt(i);
  }

  guardar() {
    console.log( 'aqui nombre ',this.forma.get('nombre').value );
    console.log( 'aqui persona ',this.forma.get('persona').value );
    console.log('aqui habilidad', this.forma.get('habilidad').value);
    const habi = this.forma.get('habilidad').value as FormArray
    console.log('aqui habilidadrr', habi[0]);

    if ( this.forma.invalid ) {

     return Object.values( this.forma.controls ).forEach( control => {
        //control.markAsTouched();
        if ( control instanceof FormGroup ) {
          Object.values( control.controls ).forEach( control => control.markAsTouched() );
        } else {
          control.markAsTouched();
        }
      });

    }

    const persona = {
        idPersona:this.forma.get('persona.idPersona').value,
        nombrePersona:this.forma.get('persona.nombrePersona').value,
        edad: this.forma.get('persona.edadPersona').value,
        habilidad:habi[0]
      };

      const tarea = {
        idTarea:this.forma.get('id').value,
        nombreTarea:this.forma.get('nombre').value,
        personas:[this.forma.get('persona.idPersona').value]  
      };
     
    console.log('persona aqui', persona );  
    console.log('tarea aqui', tarea );  
    this._service.postPersona(persona).subscribe((pe:any)=>{
      this._service.postTarea(tarea).subscribe((t:any)=>{
        console.log('tarea creada', t);  
      })
      console.log('persona creada',pe);
    });
    this.router.navigate(['/home'])
    // Posteo de información
    this.forma.reset({
      nombre: 'Sin nombre'
    });

  }

}
