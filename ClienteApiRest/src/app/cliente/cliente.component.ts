import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Cliente } from '../modelos/cliente.model';
import { ServerService} from './../server.service';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.scss']
})
export class ClienteComponent implements OnInit {

  formAgregar!: FormGroup;
  formBuscar!: FormGroup;
  formActualizar!: FormGroup;
  formEliminar!: FormGroup;

  cedulaFormControl = new FormControl('', [Validators.required]);
  nombresFormControl = new FormControl('', [Validators.required]);
  apellidosFormControl = new FormControl('', [Validators.required]);
  correoFormControl = new FormControl('', [Validators.required]);
  direccionFormControl = new FormControl('', [Validators.required]);
  telefonoFormControl = new FormControl('', [Validators.required]);

  cedulaBFormControl = new FormControl('', [Validators.required]);

  cedulaAFormControl = new FormControl('', [Validators.required]);
  nombresAFormControl = new FormControl('', []);
  apellidosAFormControl = new FormControl('', []);
  correoAFormControl = new FormControl('', []);
  direccionAFormControl = new FormControl('', []);
  telefonoAFormControl = new FormControl('', []);

  cedulaEFormControl = new FormControl('', [Validators.required]);


  clientes: any = [];
  cliente: any = [];

  datosCliente!: Cliente;
  clienteb: any = [];

  constructor(
    private formBuilder: FormBuilder,
    private serverService: ServerService
  ) {
    this.buildFormAgregar();
    this.buildFormBuscar();
    this.buildFormActualizar();
    this.buildFormEliminar();
   }

  ngOnInit(): void {
  }

  getClientes(): void{
    this.serverService.getAllClientes()
    .subscribe(clientes => {
      this.clientes = clientes;
      console.log(this.clientes);
    });
  }

  getCliente(): void{
    if (this.formBuscar.valid){
      this.serverService.getCliente(this.cedulaBFormControl.value)
      .subscribe(cliente => {
        this.clienteb = cliente;
        console.log(this.cliente);
        if (this.clienteb.error === 'no existe'){
          alert('La cedula ingresada no se encuentra registrada');
        }
      });
    }
    else {
      alert('Por favor digite la cedula a buscar');
    }
  }

  postCliente(): void{
    if (this.formAgregar.valid){
      this.datosCliente = this.formAgregar.value;
      this.serverService.postCliente(this.datosCliente)
      .subscribe(cliente => {
        this.cliente = cliente;
        console.log(cliente);
        if (this.cliente.error === 'ya existe'){
          alert('La cedula ingresada ya se encuentra registrada');
        }
        if (this.cliente.cliente !== undefined){
          alert('Registro Exitoso');
        }
      });
    }
    else {
      alert('Por favor complete todos los campos obligatorios (*)');
    }
  }

  putCliente(): void{
    if (this.formActualizar.valid){
      this.datosCliente = this.formActualizar.value;
      this.serverService.putCliente(this.datosCliente.cedula, this.datosCliente)
      .subscribe(cliente => {
        this.cliente = cliente;
        console.log(cliente);
        if (this.cliente.error === 'no existe'){
          alert('La cedula ingresada no se encuentra registrada');
        }
        if (this.cliente.cliente !== undefined){
          alert('Actualizacion Exitosa');
        }
      });
    }
    else {
      alert('Por favor complete todos los campos obligatorios (*)');
    }
  }

  deleteCliente(): void{
    if (this.formEliminar.valid){
      this.datosCliente = this.formEliminar.value;
      this.serverService.deleteCliente(this.datosCliente.cedula)
      .subscribe(cliente => {
        this.cliente = cliente;
        console.log(cliente);
        if (this.cliente.error === 'no existe'){
          alert('La cedula ingresada no se encuentra registrada');
        }
        if (this.cliente.result === 'eliminado'){
          alert('Eliminado Exitosamente');
        }
      });
    }
    else {
      alert('Por favor complete todos los campos obligatorios (*)');
    }
  }

  private buildFormAgregar(): void {
    this.formAgregar = this.formBuilder.group({
      cedula: this.cedulaFormControl,
      nombres: this.nombresFormControl,
      apellidos: this.apellidosFormControl,
      correo: this.correoFormControl,
      direccion: this.direccionFormControl,
      telefono: this.telefonoFormControl,
    });
  }

  private buildFormBuscar(): void {
    this.formBuscar = this.formBuilder.group({
      cedula: this.cedulaBFormControl,
    });
  }

  private buildFormActualizar(): void {
    this.formActualizar = this.formBuilder.group({
      cedula: this.cedulaAFormControl,
      nombres: this.nombresAFormControl,
      apellidos: this.apellidosAFormControl,
      correo: this.correoAFormControl,
      direccion: this.direccionAFormControl,
      telefono: this.telefonoAFormControl,
    });
  }

  private buildFormEliminar(): void {
    this.formEliminar = this.formBuilder.group({
      cedula: this.cedulaEFormControl,
    });
  }

}
