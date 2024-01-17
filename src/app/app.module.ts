import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { OffresComponent } from './offres/offres.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CategorieComponent } from './categorie/categorie.component';
import { ScategorieComponent } from './scategorie/scategorie.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule,MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AddcategorieComponent } from './addcategorie/addcategorie.component';
import { AddscategorieComponent } from './addscategorie/addscategorie.component';
import { AddclientComponent } from './addclient/addclient.component';
import { ClientComponent } from './client/client.component';
import { FournisseurComponent } from './fournisseur/fournisseur.component';
import { AddfournisseurComponent } from './addfournisseur/addfournisseur.component'

const MATERIAL_MODULES = [MatToolbarModule];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    OffresComponent,
    CategorieComponent,
    ScategorieComponent,
    AddcategorieComponent,
    AddscategorieComponent,
    AddclientComponent,
    ClientComponent,
    FournisseurComponent,
    AddfournisseurComponent
  ],
  imports: [
    BrowserModule,
    MatDialogModule,
    MatToolbarModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule,
    BrowserAnimationsModule
  ],
  exports : MATERIAL_MODULES,
  providers: [{ provide: MAT_DIALOG_DATA, useValue: {} },  { provide: MatDialogRef, useValue: {} }],
  bootstrap: [AppComponent]
})
export class AppModule { }
