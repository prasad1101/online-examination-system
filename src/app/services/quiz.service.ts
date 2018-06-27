import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';

import 'rxjs/add/operator/map';
import { element } from '../../../node_modules1/protractor/built';

@Injectable()
export class QuizService {
  oesService = "http://localhost:3000"
  constructor(private http: HttpClient) { }

  get(url: string) {
    return this.http.get(url);
  }
  addQuestion(questionObject) {
    return this.http.post(`${this.oesService}/add-question`, questionObject)
  }

  getQuestion(questionObject) {
    let filter = ""
    let keys = Object.keys(questionObject || {})
    if (keys.length) {
      filter = "?"
    }
    keys.forEach(element => {
      filter += element + "=" + questionObject[element]
    });
    return this.http.get(`${this.oesService}/get-questions-list${filter}`)
  }

  postQuestion(questionObject){

    return this.http.post(`${this.oesService}/add-question`,questionObject)
  }


  getSubject(subjectObject) {
    let filter = this.getFilter(subjectObject)
    return this.http.get(`${this.oesService}/get-subject-list${filter}`)
  }
  submitResult(result) {
    return this.http.post(`${this.oesService}/submit-result`, result)
  }

  getFilter(subjectObject) {
    let filter = ""
    let keys = Object.keys(subjectObject || {})
    if (keys.length) {
      filter = "?"
    }
    keys.forEach(element => {
      filter += element + "=" + subjectObject[element]
    });
    return filter
  }

  
  public removeResult(filter) {
    return this.http.delete(`${this.oesService}/remove-result${this.getFilter(filter)}`)
  }

  getSubjectResult(subject) {
    let filter = this.getFilter(subject)
    return this.http.get(`${this.oesService}/get-subject-result${filter}`)
  }

  postLogin(loginData) {

    return this.http.post(`${this.oesService}/attempt-login`, loginData)
  }

  postRegister(registerData) {

    return this.http.post(`${this.oesService}/register`, registerData)
  }

}
