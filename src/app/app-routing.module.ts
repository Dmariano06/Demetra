import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddcategorieComponent } from './addcategorie/addcategorie.component';
import { CategorieComponent } from './categorie/categorie.component';
import { AddclientComponent } from './addclient/addclient.component';
import { AddfournisseurComponent } from './addfournisseur/addfournisseur.component';
import { ClientComponent } from './client/client.component';
import { FournisseurComponent } from './fournisseur/fournisseur.component';

const routes: Routes = [
  {path: 'categories', component: CategorieComponent},
  {path: 'categorie', component: AddcategorieComponent},
  {path: 'client', component: AddclientComponent},
  {path: 'clients', component: ClientComponent},
  {path: 'four', component: AddfournisseurComponent},
  {path: 'fours', component: FournisseurComponent},
]
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

 }
