import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { PublicacionService } from 'src/app/publicacion.service';
import { Publicacion } from 'src/app/publicacion.service';

@Component({
  selector: 'app-lista',
  standalone: true,
  imports: [CommonModule, IonicModule],
  templateUrl: './lista.component.html',
})
export class ListaComponent implements OnInit {
  publications: Publicacion[] = [];

  constructor(
    private router: Router,
    private publicationService: PublicacionService,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    this.loadPublicaciones();
  }

  loadPublicaciones() {
    this.publications = this.publicationService.getPublicaciones();
  }

  async confirmDelete(publicationIndex: number) {
    const alert = await this.alertController.create({
      header: 'Confirmar eliminación',
      message: '¿Estás seguro de que deseas eliminar esta publicación?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Eliminar',
          handler: () => {
            this.publicationService.deletePublicacion(publicationIndex);
            this.loadPublicaciones(); // Recargar lista tras eliminar
          },
        },
      ],
    });

    await alert.present();
  }

  goToCreatePublicacion() {
    this.router.navigate(['/create']);
  }
}

