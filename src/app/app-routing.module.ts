import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddcategorieComponent } from './addcategorie/addcategorie.component';
import { CategorieComponent } from './categorie/categorie.component';
import { AddclientComponent } from './addclient/addclient.component';
import { AddfournisseurComponent } from './addfournisseur/addfournisseur.component';
import { ClientComponent } from './client/client.component';
import { FournisseurComponent } from './fournisseur/fournisseur.component';
import { InterfaceComponent } from './interface/interface.component';
import { HomeComponent } from './home/home.component';
import { AddarticleComponent } from './addarticle/addarticle.component';
import { ArticleComponent } from './article/article.component';

const routes: Routes = [
  {path: "home", component: HomeComponent},
  {path: "article", component: AddarticleComponent},
  {path: "articles", component: ArticleComponent},
  {path: 'categories', component: CategorieComponent},
  {path: 'categorie', component: AddcategorieComponent},
  {path: 'interface', component: InterfaceComponent},
  {path: 'client', component: AddclientComponent},
  {path: 'clients', component: ClientComponent},
  {path: 'four', component: AddfournisseurComponent},
  {path: 'fours', component: FournisseurComponent},
  {path: '', redirectTo:"home", pathMatch: 'full'}
]
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

 }
