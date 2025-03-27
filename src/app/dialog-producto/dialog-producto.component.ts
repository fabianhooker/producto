import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Producto } from '../shared/interface/producto.interface';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-dialog-producto',
  standalone: true,
  imports: [CommonModule,
    FormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule],
  templateUrl: './dialog-producto.component.html',
  styleUrl: './dialog-producto.component.css'
})
export class DialogProductoComponent {
  producto: Producto;

  constructor(
    public dialogRef: MatDialogRef<DialogProductoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { esEditar: boolean; producto: Producto }
  ) {
    this.producto =  data.producto  || { nombre: '', precio: 0, stock: 0 };
  }

  cancelar(): void {
    this.dialogRef.close();
  }

  guardar(): void {
    this.dialogRef.close(this.producto);
  }
}



