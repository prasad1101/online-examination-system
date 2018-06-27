import { Component, OnInit } from '@angular/core';
import { QuizService } from '../services/quiz.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-adminpanel',
  templateUrl: './adminpanel.component.html',
  styleUrls: ['./adminpanel.component.css']
})
export class AdminpanelComponent implements OnInit {

  constructor(private service:QuizService, private router:Router) { }

  ngOnInit() {
  }

  gotoeditor(){

    this.router.navigateByUrl("/addquestion")
  }


}
