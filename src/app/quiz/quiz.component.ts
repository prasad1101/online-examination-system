import { Component, OnInit } from '@angular/core';

import { QuizService } from '../services/quiz.service';
import { HelperService } from '../services/helper.service';
import { Option, Question, Quiz, QuizConfig } from '../models/index';

import { Router, NavigationEnd } from '@angular/router';
import * as CountdownTimer from 'angular-countdown'
@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css'],
  providers: [QuizService]
})
export class QuizComponent implements OnInit {
  quiz: Quiz = new Quiz(null);
  result = {
    correct: 0,
    wrong: 0
  }
  private quizDetails;
  constructor(private quizService: QuizService, private route: Router) {
    let subject = ""
    let eves = this.route.events.subscribe((e) => {
      if (e instanceof NavigationEnd) {
        subject = e.urlAfterRedirects.replace("/quiz/", "")
        console.log(subject)
        eves.unsubscribe()
        if (subject == "/" || subject == "") {
          this.route.navigateByUrl("/login")
          return;
        } else {

          this.loadQuiz(subject)

          this.quizDetails = localStorage.getItem("loginToken")
          if (this.quizDetails) {
            this.quizDetails = JSON.parse(this.quizDetails)
            this.quizDetails["isSubmitted"] = false
            this.quizDetails["subject"] = subject
          } else {
            this.route.navigateByUrl("/login")
          }
        }
      }

    });
  }
  timer = {}

  ngOnInit() {

  }

  ansCache = {}
  selectAns(qId, ansIndex, isCorrectAns) {
    this.ansCache[qId] = { ansIndex: ansIndex, isCorrect: isCorrectAns }
    console.log(this.ansCache)
  }

  clearQuestion(qId) {
    delete this.ansCache[qId]
  }

  isQuizSubmitted() {
    this.getScore()
    return this.isSubmitted;
  }
  isSubmitted = false
  curQue = {}
  qId = 0
  nextText = "Next"
  loadQuestion(qId) {
    this.qId = qId || 0


    if (!this.quiz.questions) {
      alert("There are no questions available yet")
      return;
    }
    this.curQue = this.quiz.questions[this.qId]
    if (!this.curQue) {
      this.curQue = {}
    }
    if (qId == this.quiz.questions.length - 1) {
      this.nextText = "Submit"
    } else {
      this.nextText = "Next"
    }

    if (Object.keys(this.ansCache).length == this.quiz.questions.length) {
      this.isSubmitted = true
    } else {
      this.isSubmitted = false
    }
    //this.isSubmitted = Object.keys(this.ansCache).length == this.quiz.questions.length ? true : false

  }

  isAns(qId, ansIndex) {
    if (!this.ansCache[qId]) {
      return false
    }
    if (ansIndex == -1) {
      return (this.ansCache[qId].ansIndex > -1 ? true : false)
    }
    return (this.ansCache[qId].ansIndex == ansIndex ? true : false)
  }
  isCorrectAns(qId) {
    return (this.ansCache[qId] ? this.ansCache[qId].isCorrect : false)
  }
  getScore() {
    this.result = {
      correct: 0,
      wrong: 0
    }
    Object.keys(this.ansCache).forEach((key) => {
      if (this.ansCache[key].isCorrect) {
        this.result.correct++
      } else {
        this.result.wrong++
      }

    })

    if (this.quizDetails && !this.quizDetails["isSubmitted"] && this.isSubmitted) {

      this.quizDetails["isSubmitted"] = true

      this.quizDetails["answers"] = this.ansCache
      this.quizDetails["summary"] = this.result
      this.quizService.submitResult(this.quizDetails).subscribe((d) => {
        if (d["ok"]) {
          localStorage.removeItem("loginToken")

        }
        alert("Thanks for taking test with OES, you can exit now")
      })
    }
  }
  loadQuiz(quizName: string) {

    this.quizService.getQuestion({ subject: quizName }).subscribe((d: any) => {
      this.quiz.questions = d.questions
      console.log(d);
      this.loadQuestion(0)
      this.startTimer(d.duration)
    })
  }
  counter;
  startTimer(duration: number) {
    let timer: number = duration;
    let minutes;
    let seconds;
    let _that = this
    setInterval(function () {
      minutes = parseInt("" + (timer / 60), 10)
      seconds = parseInt("" + (timer % 60), 10);

      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;

      _that.counter = "Remaining Time : " + minutes + ":" + seconds;

      if (--timer < 0) {
        _that.isSubmitted = true
        timer = duration;
      }

    }, 1000);
  }


}
