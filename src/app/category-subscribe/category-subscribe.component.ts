import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { CategoriesService } from '../services/categories/categories.service';
import { SnackBarService } from '../services/snackbar/snack-bar.service';
import { ClientService } from '../services/client/client.service';

@Component({
  selector: 'app-category-subscribe',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './category-subscribe.component.html',
  styleUrl: './category-subscribe.component.css'
})
export class CategorySubscribeComponent {


  categories: Array<any> = [];
  subscribes: Array<any> = [];

  constructor(private categoryService: CategoriesService, private snackBarService:SnackBarService, private clientService:  ClientService){
    this.categoryService.getAllCategoryNames().subscribe({
      next:(data:any)=>{
          this.categories = data;
          data.forEach((el:any)=>{
              this.clientService.isSubscribed(el.id).subscribe({
                next:(data)=>{
                  this.subscribes.push({
                    "id": el.id,
                    "sub": data
                  });
                },
                error: (err)=>{
                  
                }
              });
          });
          console.log(this.subscribes);
      },
      error: (err)=>{
        this.snackBarService.openSnackBar("Error during communication with server!","Close",false);
      }
    })
  }
  isSubscribed(categoryId: any): boolean{
      var status: boolean = false;
      this.subscribes.forEach(el=>{
        if(el.id == categoryId){
           if(el.sub){
            status = true
           };
        }
      });
      return status;
  }
  onSubscribe(categoryId: any) {
    this.clientService.subscribeForCategory(categoryId).subscribe({
    next:()=>{
      this.snackBarService.openSnackBar("Subscription is successful!","Close",true);
      this.subscribes.forEach(el=>{
        if(el.id == categoryId){
          el.sub = !el.sub;
        }
      });
    },
    error: (err)=>{
      this.snackBarService.openSnackBar("Subscription is unsuccessful!","Close",false);
    }
    })
  }
  onUnsubscribe(categoryId: any) {
    this.clientService.unsubscribeForCategory(categoryId).subscribe({
    next:()=>{
      this.snackBarService.openSnackBar("Unsubscription is successful!","Close",true);
      this.subscribes.forEach(el=>{
        if(el.id == categoryId){
          el.sub = !el.sub;
        }
      });
    },
    error: (err)=>{
      this.snackBarService.openSnackBar("Subscription is unsuccessful!","Close",false);
    }
    })
  }
}
