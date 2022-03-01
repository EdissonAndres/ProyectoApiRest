import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Cliente } from './modelos/cliente.model';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ServerService {

  constructor(
    private http: HttpClient
  ) { }


  // tslint:disable-next-line: typedef
  getAllClientes() {
    return this.http.get<Cliente[]>(`${environment.url_api}/clientes`);
  }

  // tslint:disable-next-line: typedef
  getCliente(id: string) {
    return this.http.get<Cliente>(`${environment.url_api}/clientes/${id}`);
  }

  // tslint:disable-next-line: typedef
  postCliente(cliente: Cliente) {
    return this.http.post(`${environment.url_api}/clientes`, cliente);
  }

  // tslint:disable-next-line: typedef
  putCliente(id: string, changes: Partial<Cliente>) {
    return this.http.put(`${environment.url_api}/clientes/${id}`, changes);
  }

  // tslint:disable-next-line: typedef
  deleteCliente(id: string) {
    return this.http.delete(`${environment.url_api}/clientes/${id}`);
  }

  // tslint:disable-next-line: typedef
  getAllProductos() {
    return this.http.get<any[]>(`${environment.url_api}/productos`);
  }

  // tslint:disable-next-line: typedef
  getAllCompras() {
    return this.http.get<any[]>(`${environment.url_api}/compras`);
  }

  // tslint:disable-next-line: typedef
  postCompra(compra: any) {
    return this.http.post<any>(`${environment.url_api}/compras`, compra);
  }
}
