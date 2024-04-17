import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { Usuarios } from '../models/usuarios';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  basePath: string = environment.basePath;

  constructor(private http: HttpClient) {
    
  }

  addUsuario(usuarios: Usuarios) {
    const headers = new HttpHeaders({
        'Content-Type': 'application/json',
      });
  
    return this.http.post<Usuarios>(this.basePath + '/usuario', usuarios);

}
login(id:number, email: string, contrasena: string) {
  const loginData: Usuarios = {
    id: id,
    email: email,
    contrasena: contrasena
  };

  return this.http.post(`${this.basePath}/login`, loginData);
}

}
