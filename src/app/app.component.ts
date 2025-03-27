import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProductoComponent } from './shared/iu/producto/producto.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,ProductoComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'producto';
}
