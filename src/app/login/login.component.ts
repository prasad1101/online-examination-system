import { Component, OnInit } from '@angular/core';
import { QuizService } from '../services/quiz.service';
import { Router , NavigationEnd} from '@angular/router';
import { HelperService } from '../services/helper.service';
import { Option, Question, Quiz, QuizConfig } from '../models/index';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [QuizService]
})
export class LoginComponent implements OnInit {
  quizes: any[];
  quiz: Quiz = new Quiz(null);
  mode = 'quiz';
  quizName: string;
  subjects:any[];
  subject:string;
  loginReq = {
    role : "",
    username : "",
    pwd : "",
    
  }

  constructor(private oesService:QuizService, private router:Router) { 

   this.oesService.getSubject({}).subscribe((subs:any)=>{
    this.subjects = subs
   })


  }

  ngOnInit() {
  }




  attemptLogin()
  {
    this.oesService.postLogin(this.loginReq).subscribe((d:any)=>{
      alert(JSON.stringify(d))
      if(d.ok){
        if(this.loginReq.role == "student")
        {
          localStorage.setItem("loginToken", JSON.stringify(d))
          this.router.navigateByUrl("/quiz/" + this.subject)
        }
        else
        {
          this.router.navigateByUrl("/adminpanel")
        }
      }
    })
  }

clickRegister()
{
  this.router.navigateByUrl("/register")
}






}
