import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpEvent, HttpErrorResponse, HttpEventType } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})

export class HomePageComponent implements OnInit {
  ProductList:any=[];
  i=0;
  constructor(private http:HttpClient,private router: Router,private route1: ActivatedRoute) {
    this.GetProductList();
    console.log((this.i+1)%3);
   }

  ngOnInit() {
  }

  GetProductList()
  {
 
      // console.log("https://wiu.edu/CITR/ExamSchedule/getSaveExamTime.sphp?read=true&ExamDate=ALL&campus="+this.CampusName);
      this.http.get("http://playbox99.com/ProductApp/GetProductDetails.php")
      .subscribe((data) => {
       //this.Oldseats=data;
     //  console.log(data);
       this.ProductList=data;
     // console.log(this.ProductList[5].length)
       console.log(this.ProductList);
      // this.openSnackBar("SuccessFully Updated","Ok");
      }, (error) => {
  
          console.log(error);
  
        });
    }

    ProductDetails(id)
    {
      this.router.navigate( ['ProductDetails'], { queryParams: {
       id:id
      
      }});
    }

    CheckData(id)
    {
    
    //  console.log((this.ProductList[id].title).length);
      try{
      if(((this.ProductList[id].title).length)>0)
      {
        return 1;
      }
      else
      {
          return 0;
      }
    }
    catch(Exception )
    {
      return 0;
    }
     
    }
  
}
