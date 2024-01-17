import { Component, Inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Fournisseur } from '../fournisseur.model';
import { FournisseurService } from '../fournisseur.service';
import { AddfournisseurComponent } from '../addfournisseur/addfournisseur.component';

@Component({
  selector: 'app-fournisseur',
  templateUrl: './fournisseur.component.html',
  styleUrl: './fournisseur.component.scss'
})
export class FournisseurComponent {
  p :number = 1;
  list!: Fournisseur[];
  constructor(public crudApi: FournisseurService,
    private router : Router,public fb: FormBuilder,
    private matDialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef:MatDialogRef<AddfournisseurComponent>,) { }
 
  ngOnInit() {
    this.getData();
  }
  
  getData() {
    this.crudApi.getAll().subscribe(
      response =>{this.crudApi.list = response;}
     );
   
  }
  
  addFour()
  {
    this.crudApi.choixmenu = "A";
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width="60%";
    //dialogConfig.data="gdddd";
    this.matDialog.open(AddfournisseurComponent, dialogConfig);
  }
  removeData(id: number) {
    if (window.confirm('Are sure you want to delete this Client ?')) {
    this.crudApi.deleteData(id)
      .subscribe(
        data => {
          console.log(data);
        //  this.toastr.success(' data successfully deleted!'); 
          this.getData();
        },
        error => console.log(error));
  }
  }
  selectData(item : Fournisseur) {
    this.crudApi.choixmenu = "M";
    this.crudApi.dataForm = this.fb.group(Object.assign({},item));
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width="60%";
    
    this.matDialog.open(AddfournisseurComponent, dialogConfig);
  }


}
