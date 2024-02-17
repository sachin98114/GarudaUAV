import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { User } from 'src/app/interface';
import { ServiceService } from 'src/app/service.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  myForm: FormGroup;
  submitted = false;
  postValue = {};
  updateindex:any;
  alldata:any;
  updatebtn:boolean=false;
  constructor(private route: Router, private service: ServiceService, private activatedRoute:ActivatedRoute) {
    this.myForm = new FormGroup({
      fname: new FormControl("", Validators.required),
      lname: new FormControl("", Validators.required),
      role: new FormControl("", Validators.required),
      department: new FormControl("", Validators.required),
      status: new FormControl("Active", Validators.required),
      email: new FormControl("", Validators.required),
      phone: new FormControl("", Validators.required),
      password: new FormControl("", Validators.required),
      cpassword: new FormControl("", Validators.required),
      address: new FormControl("", Validators.required),
    })
  }
  ngOnInit() {
   this.updateindex= this.activatedRoute.snapshot.paramMap.get('id');
   console.log(this.updateindex);
   this.service.get().subscribe((val) => {
    this.alldata=val;
    this.alldata.filter((value:User)=>{
      if(value.id==this.updateindex){
         this.updatebtn = true;
        this.myForm.patchValue(value)
       }
    })
  })
  }

  onSubmit() {
    this.submitted = true;
    if (this.myForm.valid) {
      this.postValue = this.myForm.value
      this.postcall();
      this.route.navigateByUrl("")
      console.log('Form submitted successfully!');
    } else {
      console.log('Form is invalid. Please check the fields.');
    }
  }
  postcall() {
    this.service.setval(this.postValue).subscribe((value: any) => {
      console.log("post", value)
    })
  }

  onCancel() {
    this.myForm.reset();
  }

  update() {
    this.service.patch(this.updateindex, this.myForm.value).subscribe((val) => {
      console.log(val)
      window.location.reload();
    })
    this.updatebtn = false;
  }
}

