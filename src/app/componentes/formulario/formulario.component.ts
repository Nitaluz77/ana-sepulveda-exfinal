import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Publicacion } from 'src/app/publicacion.service';

@Component({
  selector: 'app-formulario',
  standalone: true,
  imports: [CommonModule, IonicModule, ReactiveFormsModule],
  templateUrl: './formulario/formulario.html',
})

@Injectable({
  providedIn: 'root'
})

export class FormularioComponent {
  formulario: FormGroup;
  image: string = '';
  publicacionService: any;

  constructor(private fb: FormBuilder, private router: Router) {
    this.formulario = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(5)]],
      description: ['', [Validators.required, Validators.minLength(20)]],
      image: [''],
    });
  }

  onSubmit() {
    if (this.formulario.valid) {
      const newPublicacion: Publicacion = {
        ...this.formulario.value,
        date: new Date(), 
        image: this.image || ''
      };
      this.publicacionService.savePublicacion(newPublicacion);
      this.router.navigate(['/']);
    }
  }

  async onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      const reader = new FileReader();

      reader.onload = () => {
        this.image = reader.result as string;
        this.formulario.patchValue({ image: this.image });
      };

      reader.readAsDataURL(file);
    }
  }
}
