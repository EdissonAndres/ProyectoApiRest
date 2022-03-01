import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ServerService } from '../server.service';
import { DialogComponent } from '../dialog/dialog.component';
import { FormControl, Validators } from '@angular/forms';

export interface DialogData {
  idProducto: string;
  cantidad: number;
}

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.scss']
})
export class CarritoComponent implements OnInit {

  cedulaFormControl = new FormControl('', [Validators.required]);

  dialogComponent!: DialogComponent;

  productos: any = [];
  productosCompra: Array<any> = [];
  respuesta: any = [];

  cantidad!: number;


  constructor(
    private serverService: ServerService,
    public dialog: MatDialog
  ) {
  }

  ngOnInit(): void {
    this.serverService.getAllProductos()
    .subscribe(productos => {
      this.productos = productos;
      console.log(this.productos);
    });
  }

  agregarProducto(id: string): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
      data: {idProducto: id, cantidad: this.cantidad}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.cantidad = result;
      if (this.cantidad !== undefined){
        this.productosCompra.push(
          {
            idProducto: id,
            cant: Number(this.cantidad)
          });
      }
      console.log(this.productosCompra);
    });
  }

  realizarCompra(): void{
    if (this.cedulaFormControl.valid) {
      if (this.productosCompra.length > 0) {
        console.log(this.cedulaFormControl.value);
        const compra = {
          idCliente: this.cedulaFormControl.value,
          productos: this.productosCompra
        };
        this.serverService.postCompra(compra)
        .subscribe(respuesta => {
          this.respuesta = respuesta;
          console.log(respuesta);
          if (this.respuesta.error !== undefined){
            alert(this.respuesta.error);
          }
          if (this.respuesta.compras !== undefined){
            alert('Compra Exitosa');
            alert('FACTURA\nID Compra: ' + this.respuesta.compras.idCompra
            + '\nCliente: ' + this.respuesta.compras.idCliente
            + '\nFecha: ' + this.respuesta.compras.fecha
            + '\nValor Total: ' + this.respuesta.compras.valorCompra);
          }
        });

      }
      else {
        alert('Por favor agregue al menos un producto a la compra');
      }
    }
    else {
      alert('Por favor digite su cedula para realizar su compra');
    }

  }

  limpiarCompra(): void {
    this.productosCompra = [];
  }

}

