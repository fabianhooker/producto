import { Component,inject } from '@angular/core';
import { ProductoService } from '../../../data-access/producto.service';
import { Producto } from '../../interface/producto.interface';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DialogProductoComponent } from '../../../dialog-producto/dialog-producto.component';


@Component({
  selector: 'app-producto',
  standalone: true,
  imports: [CommonModule, MatIconModule,MatTableModule,MatButtonModule,MatDialogModule,DialogProductoComponent],
  templateUrl: './producto.component.html',
  styleUrl: './producto.component.css',
  providers:[ProductoService]
})
export class ProductoComponent {
    private productoService = inject(ProductoService);

     productos: Producto[] = [];
     columnas: string[] = ['id', 'nombre', 'precio', 'stock', 'fechaRegistro', 'acciones'];
     private dialog = inject(MatDialog);
    constructor(){
      this.cargarProductos();
    }
    cargarProductos() {
      this.productoService.getProductos().subscribe((producto) => {
        this.productos = producto;
      });
    }
    agregarProducto() {
      const dialogRef = this.dialog.open(DialogProductoComponent, {
        width: '400px',
        data: { esEditar: false, producto: {} }
      });

      dialogRef.afterClosed().subscribe((result: Producto) => {
        if (result) {
          // Añade la fecha si no la tiene
          result.fechaRegistro = new Date().toISOString();

          this.productoService.agregarProducto(result).subscribe(() => {
            this.cargarProductos(); // Recarga lista desde la API
          });
        }
      });
    }

    editarProducto(producto: Producto) {
      const dialogRef = this.dialog.open(DialogProductoComponent, {
        width: '400px',
        data: { esEditar: true, producto }
      });

      dialogRef.afterClosed().subscribe((result: Producto) => {
        if (result) {
          this.productoService.actualizarProducto(result).subscribe(() => {
            this.cargarProductos(); // Refresca después de editar
          });
        }
      });
    }

    eliminarProducto(producto: Producto) {
      if (confirm(`¿Eliminar "${producto.nombre}"?`)) {
        this.productoService.eliminarProducto(producto.id).subscribe(() => {
          this.cargarProductos(); // Refresca lista tras eliminación
        });
      }
    }
}
