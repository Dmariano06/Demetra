import { Component, Inject } from '@angular/core';
import { FormBuilder, Validators,FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CategorieService } from '../categorie.service';
import { Categorie } from '../cateogire.model';
import { ScategorieService } from '../scategorie.service';
import { MatDialog } from '@angular/material/dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";




@Component({
  selector: 'app-scategorie',
  templateUrl: './scategorie.component.html',
  styleUrl: './scategorie.component.scss'
})
export class ScategorieComponent {
    formData: FormGroup = this.fb.group({
    // Define your form controls here
    id: [null],
    code: ['', Validators.required],
    ccateg: ['', Validators.required],
    libelle: ['', Validators.required],
    rang: [1],
  });
  

  CategorieList: Categorie[] | undefined;
  num : any;
  code!: string;
  constructor(public crudApi: ScategorieService ,public fb: FormBuilder,

    public categorieService: CategorieService,
    public dialog: MatDialog,
    private router : Router,@Inject(MAT_DIALOG_DATA)  public data:any,
    public dialogRef:MatDialogRef<ScategorieComponent>,

    ) { }
    get f() { return this.crudApi.formData!.controls }
  ngOnInit() {

    if (this.crudApi.choixmenu == "A")
    {
      this.infoForm() 
    }
    this.categorieService.getAll().subscribe(
      response =>{this.CategorieList = response;}
     );
   }

   
    
  


  infoForm() {
    this.crudApi.formData = this.fb.group({
        id: null,
        code: ['', [Validators.required]],
        ccateg: ['', [Validators.required]],
        libelle: ['', [Validators.required]],
        rang: [1],
      });
    }



  ResetForm() {
      this.crudApi.formData!.reset();
  }
  onSubmit() {

    if (this.crudApi.choixmenu == "A")
    {
      this.addData();
      window.location.reload();
    }
    else
    {

     this.updateData();
     window.location.reload();
    }

}



addData() {
  this.crudApi.createData(this.crudApi.formData!.value).
  subscribe( data => {
    this.crudApi.getAll().subscribe(
      response =>{this.crudApi.list = response;}
     );
    this.router.navigate(['/scategories']);
  });
}
  updateData()
  {
    this.crudApi.updatedata(this.crudApi.formData?.value.code,this.crudApi.formData!.value).
    subscribe( data => {
      this.dialogRef.close();

      this.crudApi.getAll().subscribe(
        response =>{this.crudApi.list = response;}
       );
      this.router.navigate(['/scategories']);
    });
  }
  closeDialog() {
    this.dialogRef.close();
  }

  OnSelectCateg(ctrl:any) {
    if (ctrl.selectedIndex == 0) {

      this.f['ccateg'].setValue('');
    }
    else {
      this.code = this.CategorieList![ctrl.selectedIndex - 1].code;
      this.crudApi.getNumero(this.code).subscribe(
        response => {
        
          this.num = response;
          if (this.num > 0)
          {
            this.code = (100000 + this.num +1).toString().substring(1);
          }
          else
          {
            this.code = (this.code+'01');
          }
        
          this.f['code'].setValue(this.code);
        }
      );
    
    }
  }
  }


