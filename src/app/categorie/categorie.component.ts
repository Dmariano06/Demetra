import { Component, Inject } from '@angular/core';
import { CategorieService } from '../categorie.service';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Categorie } from '../cateogire.model';
import { AddcategorieComponent } from '../addcategorie/addcategorie.component';

@Component({
  selector: 'app-categorie',
  templateUrl: './categorie.component.html',
  styleUrl: './categorie.component.scss'
})
export class CategorieComponent {

  categorie!: Categorie;
  constructor(public crudApi: CategorieService,
    private router: Router, public fb: FormBuilder,
    private matDialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef:MatDialogRef<AddcategorieComponent>,) { }

  ngOnInit() {
    
    this.getData();
  }

  getData() {
    this.crudApi.getAll().subscribe(
      response => { this.crudApi.list = response; 
    }
    );
  }

  removeData(code: string) {
    if (window.confirm('Are sure you want to delete this Catégorie ?')) {
      this.crudApi.deleteData(code)
        .subscribe(
          data => {
            console.log(data);
       //     this.toastr.warning(' data successfully deleted!');
            this.getData();
          },
          error => console.log(error));
    }
  }
  selectData(item : Categorie) {
    this.crudApi.choixmenu = "M";
    this.crudApi.formData = this.fb.group(Object.assign({},item));
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width="50%";
    
    this.matDialog.open(AddcategorieComponent, dialogConfig);
  }
  addCategorie()
  {
    this.crudApi.choixmenu = "A";
      const dialogConfig = new MatDialogConfig();
      dialogConfig.autoFocus = true;
      dialogConfig.disableClose = true;
      dialogConfig.width="50%";
      this.matDialog.open(AddcategorieComponent, dialogConfig);
    }
  
    
}