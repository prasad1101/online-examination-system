import { Component, OnInit } from '@angular/core';
import { QuizService } from '../services/quiz.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  loginReq = {
    username : "",
    pwd : "",
    role : ""
  }
  isShowMsg = "Hello there"
  constructor(private oesService:QuizService, private router:Router) { }

  ngOnInit() {
  }

  adduser()
  {
    this.oesService.postRegister(this.loginReq).subscribe((d:any)=>{
      //alert(JSON.stringify(d))
      if(d.ok){
        this.isShowMsg = "Register succcessful"
        
        setTimeout(()=>{
                    this.router.navigateByUrl("/login")
        }, 5000)
        
      }
    })
  }
  removeToast(){
    this.isShowMsg = null
  }

}