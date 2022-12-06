import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from "@angular/material/dialog";
import {
  MAT_DIALOG_DATA
} from "@angular/material/dialog";
import { CategoryI, ProductI } from '../../interfaces/product';
import { ProductService } from '../../services/product.service';
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  category:CategoryI[]=[];

  form = this.fb.group({
    name: ['',[Validators.required]],
    description: ['',[Validators.required]],
    price: ['',[Validators.required]],
    categories: ['',[Validators.required]]
  });

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<FormComponent>,
    private productSvc: ProductService,
    @Inject(MAT_DIALOG_DATA) public data: ProductI

  ) { }

  ngOnInit(): void {
  this.productSvc.getCategories().subscribe(res=>this.category=res)
  this.initForm(this.data)
  }
  //cierra el mat-dialog
  close() {
    this.dialogRef.close(false);
    this.form.reset();
  }
  //valid input text
  isValidField(field: string): string {
    const validatedField = this.form.get(field);
    return (!validatedField?.valid && validatedField?.touched) ? 'is-invalid' : validatedField?.touched ? 'is-valid' : '';
  }

  initForm(data:ProductI){
    this.form.patchValue({
      name:data.name,
      description:data.description,
      price:data.price,
      categories:data.categories
    })
  }
}
