import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpEvent, HttpErrorResponse, HttpEventType, HttpHeaders } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  p_image;
  p_title;
  p_price;
  p_description;
  p_likes;
  p_id;
  flag=0;
  ip;
  like_button;
  constructor(private http:HttpClient,private router: Router,private route1: ActivatedRoute) {
    this.getIpaddress();
    
   }

  ngOnInit() {
    Swal.fire('Please wait')
    Swal.showLoading();
    this.route1.queryParams.subscribe(
      params => {
       // console.log('Got the JWT as: ', params['ctitle']);
        this.p_id=params['id'];
    

      }
    )
    this.GetProductList();
    console.log(localStorage.getItem("p_id:"+this.p_id));
    if(localStorage.getItem("p_id:"+this.p_id))
    {
      this.like_button="https://image.flaticon.com/icons/svg/148/148838.svg";
    }
    else{
      this.like_button="https://image.flaticon.com/icons/svg/149/149219.svg";
    }
  }
  GetProductList()
  {
      
    
      this.http.get("http://playbox99.com/ProductApp/GetProductDetails.php?id="+this.p_id)
      .subscribe((data) => {
        this.p_title=data[0].title;
        this.p_price=data[0].price;
        this.p_description=data[0].description;
        this.p_likes=data[0].likes;
        this.p_image=data[0].image;
        console.log(this.p_title)
        Swal.close();
      }, (error) => {
  
          console.log(error);
  
        });
    }

    getIpaddress()
    {
      this.http.get<{ip:string}>('https://jsonip.com')
      .subscribe( data => {
        console.log('th data', data.ip);
        this.ip=data.ip;
      })
    }
    LikeBtnPress()
    {

      if(localStorage.getItem("p_id:"+this.p_id))
      {
        this.p_likes--;
        localStorage.removeItem("p_id:"+this.p_id);
        this.like_button="https://image.flaticon.com/icons/svg/149/149219.svg";
        this.http.get("http://playbox99.com/ProductApp/saveUserLikes.php?ip="+this.ip+"&p_id="+this.p_id+"&isLike=0")
        .subscribe((data:any) => {
             console.log(data);
     });
    
      }
      else{
        this.p_likes++;
        localStorage.setItem("p_id:"+this.p_id,"p_id:"+this.p_id);
        this.like_button="https://image.flaticon.com/icons/svg/148/148838.svg";
        Swal.fire({
          position: 'center',
          type: 'success',
          title: 'Thank you for your like',
          showConfirmButton: false,
          timer: 1000
        })
     
  
      console.log("http://playbox99.com/ProductApp/saveUserLikes.php?ip="+this.ip+"&p_id="+this.p_id+"&isLike=1");
       this.http.get("http://playbox99.com/ProductApp/saveUserLikes.php?ip="+this.ip+"&p_id="+this.p_id+"&isLike=1")
          .subscribe((data:any) => {
               console.log(data);
       });
      
       
      }
      }
     

}
