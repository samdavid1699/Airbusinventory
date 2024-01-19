import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Product } from '../Product';
import { ProductService } from '../services/product.service';
import { SharedServiceService } from '../services/shared-service.service';
import { SuccessfulDialogComponent } from '../successful-dialog/successful-dialog.component';
import { UnSuccessfulDialogComponent } from '../un-successful-dialog/un-successful-dialog.component';

@Component({
  selector: 'app-cart-product',
  templateUrl: './cart-product.component.html',
  styleUrls: ['./cart-product.component.css']
})
export class CartProductComponent implements OnInit {

  product:Product  = new Product();

  successMessage:string ="";
  errMessage: string ="";

  constructor(private productService: ProductService, private dialog:MatDialog, private sharedServices:SharedServiceService) {
  }

  ngOnInit(): void {

    this.product=this.sharedServices.getProduct();
  }


  cartProductForm=new FormGroup({
    productname:new FormControl('',[Validators.required]),
    units: new FormControl('',[Validators.required]),
    category: new FormControl('',[Validators.required])

  })

  get productname(){
    return this.cartProductForm.get('productname');
  }

  get units(){
    return this.cartProductForm.get('units');
  }

  get category(){
    return this.cartProductForm.get('category');
  }



  cartProduct(){

    this.product.productName=this.productname?.value;
    this.product.units=this.units?.value;
    this.product.productCategory=this.category?.value;




    if(this.product.productId=="")
    {
      this.errMessage="Product could not be Added to the catalog : Product Id is required";
    }
    else if(this.product.productName=="")
    {
      this.errMessage="Product could not be Added to the catalog : Product Name is required";
    }
    else if(this.product.productCategory=="")
    {
      this.errMessage="Product could not be Added to the catalog : Product Category is required";
    }
    else if(this.product.units==0 || this.product.units==null)
    {
      this.errMessage="Product could not be Added to the catalog : Product Units can not be 0";
    }
    else{
      this.productService.cartProduct(this.product, this.product.productId).subscribe(data => {

        if(data)
        {
          this.openSuccessfulDialog();
        }
        else{
          this.openunSuccessfulDialog();
        }

      });

    }

  }

  openSuccessfulDialog() {
    this.sharedServices.setdialogtitle("Successfull");
    this.sharedServices.setdialogcontent("Product added Successfully !!");
    this.dialog.open(SuccessfulDialogComponent);
  }

  openunSuccessfulDialog() {
    this.sharedServices.setdialogtitle("Unsuccessfull");
    this.sharedServices.setdialogcontent("Product could not be added !!");
    this.dialog.open(UnSuccessfulDialogComponent);
  }

}
