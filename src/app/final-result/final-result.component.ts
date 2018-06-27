import { Component, OnInit } from '@angular/core';
import { QuizService } from '../services/quiz.service';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-final-result',
  templateUrl: './final-result.component.html',
  styleUrls: ['./final-result.component.css']
})
export class FinalResultComponent implements OnInit {
  
  constructor(private quizService: QuizService, private route: Router) {
    
    
    this.route.events.subscribe((e) => {
      if (e instanceof NavigationEnd) {
        let subject = e.urlAfterRedirects.replace("/final-result/", "")
        console.log(subject)
        this.loadResult(subject)
      }
    });
  }
  removeResultData : any;
  rd : any;
  loadResult(subject) {
    this.quizService.getSubjectResult({ subject: subject }).subscribe((d) => {
      this.rd = d
      console.log(d)
    })
  }
  
  myFunction() {
    window.print();
}




  answer:any[]
  removeResult(one,i){
    console.log("remove data :",one._id)
    this.quizService.removeResult({_id : one._id}).subscribe((res)=>{
      console.log(" removed succesfully")
      // this.resultDetails.splice(i, 1);        
      this.removeResultData = null
      
    })
    
  }
data: any[]
  ngOnInit() {
 
  }

}