import { Component, OnInit } from '@angular/core';
import { QuizService } from '../services/quiz.service';
import { HelperService } from '../services/helper.service';
import { Option, Question, Quiz, QuizConfig } from '../models/index';

@Component({
  selector: 'app-addquestion',
  templateUrl: './addquestion.component.html',
  styleUrls: ['./addquestion.component.css'],
  providers: [QuizService]

})
export class AddquestionComponent implements OnInit {

  question: any
  answer: any

  constructor(private quizService: QuizService) {
    this.question = {}
    this.question = ({
      subject: this.question.subject,
      name: this.question.name,
      options: [
        { name: this.question.options, isAnswer: false },
        { name: this.question.options, isAnswer: false },
        { name: this.question.options, isAnswer: false },
        { name: this.question.options, isAnswer: false }
      ]
    })
  }
  addQuestion() {
    
    if (undefined != this.answer) {

      this.question.options[this.answer].isAnswer = true
      this.quizService.postQuestion(this.question).subscribe((d: any) => {
        alert(JSON.stringify(d))
        if (d.ok) {
          console.log("Question Added Successfully")
          console.log("question added successfully !!!")
        }
      })
    }



  }

  ngOnInit() {

  }

}
