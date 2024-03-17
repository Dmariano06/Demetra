import { Component, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ClientService } from '../client.service';
import { ParametreService } from '../parametre.service';
import { UserService } from '../user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-addclient',
  templateUrl: './addclient.component.html',
  styleUrl: './addclient.component.scss'
})
export class AddclientComponent {
  parametre: any = {};
  listUser: any = [];
  valid: boolean = false;
  get f() { return this.crudApi.dataForm.controls }
  constructor(public crudApi: ClientService, public fb: FormBuilder,
    private router: Router, private paraService: ParametreService,
    private userService: UserService,
    @Inject(MAT_DIALOG_DATA) public data:any,
    public dialogRef: MatDialogRef<AddclientComponent>) { }

  ngOnInit() {

    if (this.crudApi.choixmenu == "A") {
      this.infoForm()
      this.paraService.getData(1).subscribe(
        (        response: any) => {
          this.parametre = response;
          this.f['code'].setValue(this.parametre.numc);

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
      email: [' ', [Validators.required, Validators.minLength(10)]],
      fax: ['', [Validators.required, Validators.minLength(8)]],

      pwd: ['', [Validators.required, Validators.minLength(8)]],


    });
  }



  ResetForm() {
    this.crudApi.dataForm.reset();
  }
  onSubmit() {
    if (this.valid)
    {
      if (this.crudApi.choixmenu == "A") {
        this.addData();
      }
      else {
  
        this.updateData();
      }
    }
    else
    {
  //  this.toastr.success('Validation Impossible Vérifier Votre Email.....');
    }

   

  }



  addData() {
    this.crudApi.createData(this.crudApi.dataForm.value).
      subscribe(data => {
      //  this.toastr.success('Validation Faite avec Success');
        this.dialogRef.close();

        this.crudApi.getAll().subscribe(
          response => { this.crudApi.list = response; }
        );

        this.router.navigate(['/clients']);
      });
  }
  updateData() {

    this.crudApi.updatedata(this.crudApi.dataForm.value.code, this.crudApi.dataForm.value).
      subscribe(data => {
    //    this.toastr.success('Modification Faite avec Success');
        this.dialogRef.close();

        this.crudApi.getAll().subscribe(
          response => { this.crudApi.list = response; }
        );
        this.router.navigate(['/clients']);
      });
  }

  verif() {
    this.userService.verifEmail(this.crudApi.dataForm.value.email).subscribe(
      (response: any) => {
       this.listUser = response;
        if (this.listUser.length == 0) {
          this.valid = true;
        }
        else {
          this.valid = false;
          window.alert('Un compte avec cet adresse email existe déjà.');
      //    this.toastr.success('Vérifier Votre Email ..Email Déja Saisie....');
        }

      }  
   );

}    
}
