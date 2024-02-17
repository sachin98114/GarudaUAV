import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/interface';
import { ServiceService } from 'src/app/service.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  alldata:any;
  searchResult:any;
  constructor(private service:ServiceService,private router:Router){}
  ngOnInit() {
    this.getcall()
  }
  getcall() {
    this.service.get().subscribe((val) => {
      this.alldata = val
    })
  }
  delete(id: number) {
    this.service.delete(id).subscribe((val) => {
      console.log(val)
      this.getcall()
    })
  }
  
  searchProduct(query:KeyboardEvent){
    if(query){
      const element = query.target as HTMLInputElement;
      this.service.searchProduct(element.value).subscribe((result:any)=>{
        this.alldata=result;
      })
    }
  }
}
