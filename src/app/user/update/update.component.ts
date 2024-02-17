import { Component, OnInit } from '@angular/core';
import { ServiceService } from 'src/app/service.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {
  alldata:any;
constructor(private service:ServiceService){
}
  ngOnInit() {
    this.service.get().subscribe((val)=>{
      this.alldata=val
    })
  }

}
