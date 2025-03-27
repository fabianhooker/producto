
import { Injectable } from "@angular/core";
import { BaseHttpService } from "../shared/products/base-http.service";
import { Observable } from "rxjs";
import { Producto } from "../shared/interface/producto.interface";
@Injectable()
export class ProductoService extends BaseHttpService{

    getProductos():Observable<Producto[]>{
      return this.http.get<any[]>(this.apiurl + "/GetAll")
    }
    agregarProducto(producto: Producto): Observable<Producto> {
      return this.http.post<Producto>(this.apiurl + "/Create", producto);
    }

    actualizarProducto(producto: Producto): Observable<Producto> {
      return this.http.put<Producto>(this.apiurl + "/Update", producto);
    }

    eliminarProducto(id: number): Observable<void> {
      return this.http.delete<void>(`${this.apiurl}/Delete?id=${id}`);
    }
}
