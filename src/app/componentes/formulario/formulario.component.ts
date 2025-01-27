import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-formulario',
  standalone: true,
  imports: [CommonModule, IonicModule, ReactiveFormsModule],
  templateUrl: './formulario.html',
})
export class FormularioComponent {
  publicationForm: FormGroup;
  image: string = ''; // Inicialización de la imagen como una cadena vacía

  constructor(private fb: FormBuilder, private router: Router) {
    this.publicationForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(5)]],
      description: ['', [Validators.required, Validators.minLength(20)]],
      image: [''],
    });
  }

  onSubmit() {
    if (this.publicationForm.valid) {
      // Simular la lógica de guardar la publicación
      const publicacion = this.publicationForm.value;
      console.log('Publicación enviada:', publicacion);

      // Redirigir al usuario a otra página
      this.router.navigate(['/']);
    } else {
      console.log('Formulario inválido');
    }
  }

  async onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      const reader = new FileReader();

      reader.onload = () => {
        this.image = reader.result as string;
        this.publicationForm.patchValue({ image: this.image }); // Actualiza el campo de imagen
      };

      reader.readAsDataURL(file);
    }
  }
}
