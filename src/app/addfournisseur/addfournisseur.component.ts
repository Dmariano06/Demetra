import { Component, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { FournisseurService } from '../fournisseur.service';
import { ParametreService } from '../parametre.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-addfournisseur',
  templateUrl: './addfournisseur.component.html',
  styleUrl: './addfournisseur.component.scss'
})
export class AddfournisseurComponent {
  parametre : any={};
  listUser: any = [];
  valid: boolean = false;
  get f() { return this.crudApi.dataForm.controls }
  constructor(public crudApi: FournisseurService ,public fb: FormBuilder,
    private router : Router,private paraService : ParametreService,
    @Inject(MAT_DIALOG_DATA)  public data:any,
    private userService: UserService,
    public dialogRef:MatDialogRef<AddfournisseurComponent>) { }

  ngOnInit() {
  
    if (this.crudApi.choixmenu == "A")
    {this.infoForm()
    this.paraService.getData(1).subscribe(
      response =>{
        this.parametre = response;
        this.f['code'].setValue(this.parametre.numf);
        }
     );  
      }
   }
  infoForm() {
    this.crudApi.dataForm = this.fb.group({
        id: null,
        code: ['', [Validators.required]],
        libelle: ['', [Validators.required]],
        adresse: ['', [Validators.required, Validators.minLength(5)]],
        tel: ['', [Validators.required, Validators.minLength(8)]],
        email: ['', [Validators.required, Validators.minLength(10)]],
        fax: ['', [Validators.required, Validators.minLength(8)]],
        pwd: ['', [Validators.required, Validators.minLength(8)]],
       
    
        });
    }
   
  

  ResetForm() {
      this.crudApi.dataForm.reset();
  }
  onSubmit() {
    if (this.crudApi.choixmenu == "A")
    {
      this.addData();
    }
    else
    {
      
     this.updateData()
    }
   
}
  
   

addData() {
  this.crudApi.createData(this.crudApi.dataForm.value).
  subscribe( data => {
   
    this.dialogRef.close();
   
    
  });
  this.crudApi.getAll().subscribe(
    response =>{this.crudApi.list = response;}
   );
  this.router.navigate(['/fours']);
 // this.toastr.success( 'Validation Faite avec Success'); 
}
  updateData()
  {
 
    this.crudApi.updatedata(this.crudApi.dataForm.value.code,this.crudApi.dataForm.value).
    subscribe( data => {
      this.dialogRef.close();
   });
    this.crudApi.getAll().subscribe(
      response =>{this.crudApi.list = response;}
     );
    this.router.navigate(['/fours']);
  //  this.toastr.success( 'Modification Faite avec Success');
  }

  verif() {
    this.userService.verifEmail(this.crudApi.dataForm.value.email).subscribe(
      response => {
        this.listUser = response;
        if (this.listUser.length == 0) {
          this.valid = true;
        }
        else {
          this.valid = false;
     //     this.toastr.success('Vérifier Votre Email ..Email Déja Saisie....');
        }

      }  
   );

}    
}
