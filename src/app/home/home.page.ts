import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IonicModule, AlertController } from '@ionic/angular';
import { PublicacionService } from '../publicacion.service';
import { Publicacion } from '../publicacion.service';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, IonicModule, ReactiveFormsModule],
  templateUrl: './home.page.html',
  })

export class HomeComponent implements OnInit {
  publicaciones: Publicacion[] = [];

  constructor(
    private router: Router,
    private publicacionService: PublicacionService,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    this.loadPublications();
  }

  loadPublications() {
    this.publicaciones = this.publicacionService.getPublicaciones();
  }

  async confirmDelete(publicacion: Publicacion) {
    const alert = await this.alertController.create({
      header: 'Confirmar Eliminación',
      message: '¿Estás seguro de que deseas eliminar esta publicación?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Eliminar',
          handler: () => {
            this.deletePublication(publicacion);
          },
        },
      ],
    });

    await alert.present();
  }

  deletePublication(publicacion: Publicacion) {
    const index = this.publicaciones.indexOf(publicacion);
    if (index > -1) {
      this.publicaciones.splice(index, 1);
      this.publicacionService.deletePublicacion(index);
      this.loadPublications(); // Actualiza la lista para reflejar los cambios
    }
  }

  goToCreatePublication() {
    this.router.navigate(['/create']);
  }
}

