import { Component, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ArticleService } from '../article.service';
import { CategorieService } from '../categorie.service';
import { Categorie } from '../cateogire.model';
import { ScategorieService } from '../scategorie.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-addarticle',
  templateUrl: './addarticle.component.html',
  styleUrl: './addarticle.component.scss'
})
export class AddarticleComponent {
  num: any;
  code!: string;
  CategorieList: Categorie[] = [];
  ScategorieList: any[] = [];
  scategorie: any = {};
  userFile!: string;
  public imagePath: any;
  imgURL: any;
  public message!: string;
  codef!: string;
  name!: string;
  constructor(public crudApi: ArticleService, public fb: FormBuilder,
    public scategorieService: ScategorieService,
    public categorieService: CategorieService,
    public userService: UserService,
    private router: Router, @Inject(MAT_DIALOG_DATA) public data:any,
    public dialogRef: MatDialogRef<AddarticleComponent>,

  ) { }
  get f() { return this.crudApi.dataForm.controls; }
  ngOnInit() {
    if (this.crudApi.choixmenu == "A") { this.infoForm() };
    this.categorieService.getAll().subscribe(
      response => { this.CategorieList = response; }
    );
    
    this.codef = localStorage.getItem('codef') ?? ''; // Utilisation d'une chaîne vide comme valeur par défaut
    this.f['codef'].setValue(this.codef);
  }

  infoForm() {
    this.crudApi.dataForm = this.fb.group({
      id: null,
      code: ['', [Validators.required]],
      libelle: ['', [Validators.required]],
      pa: [0, [Validators.required]],
      pv: [0, [Validators.required]],
      tva: [0, [Validators.required]],
      stock: [0, [Validators.required]],
      ccateg: ['', [Validators.required]],
      cscateg: ['', [Validators.required]],
      codef : [''],
    });
  }

  ResetForm() {
    this.crudApi.dataForm.reset();
  }
  onSubmit() {
    if (this.crudApi.choixmenu == "A") {
      this.addData();
    }
    else {
      this.updateData()
    }
  }

  onSelectCateg(code: string) {
    this.scategorieService.listScateg(code).subscribe(
      (response: any[]) => {
        this.ScategorieList = response;
      },
      (error: any) => {
        console.error("Error fetching subcategories:", error);
        // Ajoutez ici la logique de gestion de l'erreur, par exemple, afficher un message à l'utilisateur.
      }
    );
  }
  
  onSelectScateg(code: string) {
    this.crudApi.getNumero(code).subscribe(
      (response: any) => {
        this.num = response;
        if (this.num > 0) {
          this.code = (1000000000 + this.num + 1).toString().substring(1);
        } else {
          this.code = code + '0001';
        }
        this.f['code'].setValue(this.code);
      },
      (error: any) => {
        console.error("Error fetching code:", error);
        // Ajoutez ici la logique de gestion de l'erreur.
      }
    );
  }
  
  addData() {
    const formData = new FormData();
    const article = this.crudApi.dataForm.value;
    formData.append('article', JSON.stringify(article));
    formData.append('file', this.userFile);
  
    this.crudApi.createData(formData).subscribe(
      (data: any) => {
        this.dialogRef.close();
        if (this.userService.four) {
          this.crudApi.getListArtf(parseInt(this.codef)).subscribe(
            (response: any) => {
              this.crudApi.list = response;
            },
            (error: any) => {
              console.error("Error fetching article list:", error);
              // Ajoutez ici la logique de gestion de l'erreur.
            }
          );
        } else {
          this.crudApi.getAll().subscribe(
            (response: any) => {
              this.crudApi.list = response;
            },
            (error: any) => {
              console.error("Error fetching article list:", error);
              // Ajoutez ici la logique de gestion de l'erreur.
            }
          );
        }
        this.router.navigate(['/articles']);
      },
      (error: any) => {
        console.error("Error creating article:", error);
        // Ajoutez ici la logique de gestion de l'erreur.
      }
    );
  }
  
  updateData() {
    this.crudApi.updatedata(this.crudApi.dataForm.value.id, this.crudApi.dataForm.value).subscribe(
      (data: any) => {
        this.dialogRef.close();
        this.crudApi.getAll().subscribe(
          (response: any) => {
            this.crudApi.list = response;
          },
          (error: any) => {
            console.error("Error fetching article list:", error);
            // Ajoutez ici la logique de gestion de l'erreur.
          }
        );
        this.router.navigate(['/articles']);
      },
      (error: any) => {
        console.error("Error updating article:", error);
        // Ajoutez ici la logique de gestion de l'erreur.
      }
    );
  }
  

  onSelectFile(event:any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.userFile = file;
      // this.f['profile'].setValue(file);

      var mimeType = event.target.files[0].type;
      if (mimeType.match(/image\/*/) == null) {
    //    this.toastr.success('Only images are supported.');

        return;
      }
      var reader = new FileReader();
      this.imagePath = file;
      reader.readAsDataURL(file);
      reader.onload = (_event) => {
        this.imgURL = reader.result;
      }
    }
  }
}
