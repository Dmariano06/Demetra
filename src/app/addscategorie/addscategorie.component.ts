import { Component, Inject } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CategorieService } from '../categorie.service';
import { Categorie } from '../cateogire.model';
import { ScategorieService } from '../scategorie.service';
import { ScategorieComponent } from '../scategorie/scategorie.component';
import { Scategorie } from '../scategorie.model';

@Component({
  selector: 'app-addscategorie',
  templateUrl: './addscategorie.component.html',
  styleUrl: './addscategorie.component.scss'
})
export class AddscategorieComponent {

  public fileName = "SousCategories";
  scategorie!: Scategorie;
  p: number = 1;
  control: FormControl = new FormControl('');
  constructor(public crudApi: ScategorieService, 
    private router : Router,public fb: FormBuilder,
    private matDialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef:MatDialogRef<ScategorieComponent>,) { }
 
  ngOnInit() {
    
    this.getData();
  }
  addScategorie()
  {
 
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width="50%";
    //dialogConfig.data="gdddd";
    this.matDialog.open(ScategorieComponent, dialogConfig);
  }
 
  

  
  getData() {
    this.crudApi.getAll().subscribe(
      response =>{this.crudApi.list = response;}
     );
  }
  
  exporToExcel() {
    this.crudApi.getExcelData().subscribe((responseMessage) => {
      let file = new Blob([responseMessage], { type: 'application/vnd.ms-excel' });
      var fileURL = URL.createObjectURL(file);
      window.open(fileURL);
    })
   
  }
  
  removeData(code: string) {
    if (window.confirm('Are sure you want to delete this Scatégorie ?')) {
    this.crudApi.deleteData(code)
      .subscribe(
        data => {
          console.log(data);
       //   this.toastr.warning(' data successfully deleted!'); 
          this.getData();
          window.location.reload();
        },
        error => console.log(error));
  }
  }
  selectData(item : Scategorie) {
    this.crudApi.choixmenu = "M";
    this.crudApi.formData = this.fb.group(Object.assign({},item));
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width="50%";
    
    this.matDialog.open(ScategorieComponent, dialogConfig);
  }
 
  }