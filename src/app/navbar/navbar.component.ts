import { Component } from '@angular/core';
import { CategorieService } from '../categorie.service';
import { ScategorieComponent } from '../scategorie/scategorie.component';
import { ScategorieService } from '../scategorie.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  dropdowns = Array(5).fill({}); 
  dropdown1s = Array(5).fill({}); 
  isDropdownOpen: boolean[] = Array(5).fill(false);
  
  constructor(private categorieService: CategorieService, private sousCategorieService: ScategorieService) {}

  ngOnInit() {
    this.categorieService.getAll().subscribe(
      (categories) => {
        this.dropdowns = categories;
        this.isDropdownOpen = new Array(this.dropdowns.length).fill(false);
        console.log('Catégories correctement récupérées.');
      },
      (error) => {
        console.error('Erreur lors de la récupération des catégories', error);
      }
    );
    this.sousCategorieService.getAll().subscribe(
      (scategories) => {
        this.dropdown1s = scategories;
        this.isDropdownOpen = new Array(this.dropdown1s.length).fill(false);
        console.log('Catégories correctement récupérées.');
      },
      (error) => {
        console.error('Erreur lors de la récupération des catégories', error);
      }
    );
  }

  openDropdown(index: number) {
    this.isDropdownOpen[index] = true;
  }

  closeDropdown(index: number) {
    this.isDropdownOpen[index] = false;
  }
}
