import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';

export interface Publicacion {
  titulo: string;
  contenido: string;
  fecha: Date;
  image: String;
}

@Injectable({
  providedIn: 'root',
})
export class PublicacionService {
  private publicaciones: Publicacion[] = [];

  constructor() {
    this.loadPublicaciones().catch((error) =>
      console.error('Error al cargar las publicaciones:', error)
    );
  }

  async loadPublicaciones() {
    try {
      const { value } = await Preferences.get({ key: 'publicaciones' });
      if (value) {
        this.publicaciones = JSON.parse(value);
      }
    } catch (error) {
      console.error('Error al cargar publicaciones de Preferences:', error);
    }
  }

  async savePublicacion(publicacion: Publicacion) {
    try {
      this.publicaciones.push(publicacion);
      await Preferences.set({
        key: 'publicaciones',
        value: JSON.stringify(this.publicaciones),
      });
    } catch (error) {
      console.error('Error al guardar la publicación:', error);
    }
  }

  getPublicaciones() {
    return this.publicaciones;
  }

  async getPublicacionesFromStorage() {
    try {
      const { value } = await Preferences.get({ key: 'publicaciones' });
      return value ? JSON.parse(value) : [];
    } catch (error) {
      console.error('Error al obtener publicaciones del almacenamiento:', error);
      return [];
    }
  }

  async deletePublicacion(index: number) {
    try {
      this.publicaciones.splice(index, 1);
      await Preferences.set({
        key: 'publicaciones', // Clave corregida
        value: JSON.stringify(this.publicaciones),
      });
    } catch (error) {
      console.error('Error al eliminar la publicación:', error);
    }
  }
}
