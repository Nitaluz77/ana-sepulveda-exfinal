import { enableProdMode, importProvidersFrom } from '@angular/core';
import { Routes } from '@angular/router';
import { defineCustomElements } from '@ionic/pwa-elements/loader';
import { AppComponent } from './app/app.component';
import { bootstrapApplication } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { ListaComponent } from './app/componentes/lista/lista.component';
import { FormularioComponent } from './app/componentes/formulario/formulario.component';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

const routes: Routes = [
  { path: '', component: ListaComponent },
  { path: 'create', component: FormularioComponent }
];

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(
      RouterModule.forRoot(routes),
      IonicModule.forRoot(),
      ReactiveFormsModule
    )
  ]
})
  .catch(err => console.log(err));

defineCustomElements(window);
