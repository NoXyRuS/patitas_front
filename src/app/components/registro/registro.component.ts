import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Usuarios } from 'src/app/models/usuarios';
import { UsuarioService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {

  myForm!: FormGroup;
  color = "accent";
  
  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private router: Router,
    private snackBar: MatSnackBar
  ){}

  ngOnInit(): void {
    this.myForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      contrasena: ['', [Validators.required, Validators.minLength(8)]]
    });
  }



  saveUsuario(): void {
    if (this.myForm.valid) {
      const formData = this.myForm.value;
      this.usuarioService.addUsuario(formData).subscribe(
        response => {
          // Manejar la respuesta del servidor si es necesario
          console.log('Usuario registrado:', response);
          // Aquí puedes redirigir al usuario a otra página o mostrar un mensaje de éxito
        },
        error => {
          // Manejar errores de la solicitud HTTP
          console.error('Error al registrar usuario:', error);
          // Aquí puedes mostrar un mensaje de error al usuario
        }
      );
    } else {
      // El formulario no es válido, puedes mostrar un mensaje al usuario o realizar alguna acción
      console.error('Formulario no válido');
    }
  }
  

  containsUpperCase(value: string): boolean {
    return /[A-Z]/.test(value);
  }

  containsLowerCase(value: string): boolean {
    return /[a-z]/.test(value);
  }

  containsSpecialCharacter(value: string): boolean {
    return /[@#$%^&+=!]/.test(value);
  }
}
