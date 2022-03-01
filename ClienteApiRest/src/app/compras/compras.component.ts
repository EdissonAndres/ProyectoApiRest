import { Component, OnInit } from '@angular/core';
import { ServerService } from '../server.service';

@Component({
  selector: 'app-compras',
  templateUrl: './compras.component.html',
  styleUrls: ['./compras.component.scss']
})
export class ComprasComponent implements OnInit {

  compras: any = [];

  constructor(
    private serverService: ServerService
  ) { }

  ngOnInit(): void {
    this.serverService.getAllCompras()
    .subscribe(compras => {
      this.compras = compras;
      console.log(this.compras);
    });
  }

}
