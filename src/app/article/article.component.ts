import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Article } from '../article.model';
import { ArticleService } from '../article.service';
import { UserService } from '../user.service';
import { AddarticleComponent } from '../addarticle/addarticle.component';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrl: './article.component.scss'
})
export class ArticleComponent {
  article!: Article;
  p: number = 1;

  codef: number = 0;
  control: FormControl = new FormControl('');
  constructor(public crudApi: ArticleService,
    private router: Router, public fb: FormBuilder,
    private matDialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public userService: UserService,
    public dialogRef: MatDialogRef<AddarticleComponent>,) { }

  ngOnInit() {

    if (this.userService.four) {
      this.codef = JSON.parse(localStorage.getItem('codef') || '{}');

      this.getlistArtf(this.codef);
    }
    else {
      this.getData();

    }


  }
  addArticle() {
    this.crudApi.choixmenu = "A";
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width = "70%";
    //dialogConfig.data="gdddd";
    this.matDialog.open(AddarticleComponent, dialogConfig);
  }




  getData() {
    
    this.crudApi.getAll().subscribe(
      response => {
        
        this.crudApi.list = response;
      }
    );

  }

  getlistArtf(code: number) {

    this.crudApi.getListArtf(code).subscribe(
      response => { this.crudApi.list = response; }
    );

  }
  exporToExcel() {
    this.crudApi.getExcelData().subscribe((responseMessage) => {
      let file = new Blob([responseMessage], { type: 'application/vnd.ms-excel' });
      var fileURL = URL.createObjectURL(file);
      window.open(fileURL);
    })
   
  }

  removeData(id: number) {
    if (window.confirm('Are sure you want to delete this Article ?')) {
      this.crudApi.deleteData(id)
        .subscribe(
          data => {
            console.log(data);
          //  this.toastr.warning(' data successfully deleted!');
            if (this.userService.four) {

              this.getlistArtf(this.codef);
            }
            else {
              this.getData();
            }
            this.getData();
          },
          error => console.log(error));
    }
  }
  selectData(item: Article) {
    this.crudApi.choixmenu = "M";
    this.crudApi.dataForm = this.fb.group(Object.assign({}, item));
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width = "70%";

    this.matDialog.open(AddarticleComponent, dialogConfig);
  }
}
