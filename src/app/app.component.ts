import { Component } from '@angular/core';
import { QuizComponent } from './quiz/quiz.component'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  timeRemaining: string
  constructor() {
    let startTime: Date = new Date()
    setInterval(() => {
      var timeDiff = Math.abs(new Date().getTime() - startTime.getTime());
     
      var diffHrs = Math.floor((timeDiff % 86400000) / 3600000); // hours
      var diffMins = Math.round(((timeDiff % 86400000) % 3600000) / 60000); // minutes
      var diffSec = Math.round(((timeDiff % 86400000) % 3600000) / 1000); // minutes
      this.timeRemaining = ( diffHrs + ":" + diffMins + ":" + diffSec );
      //console.log(this.timeRemaining)
    }, 1000)

  }
}
