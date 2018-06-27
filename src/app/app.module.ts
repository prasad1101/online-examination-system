import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { QuizComponent } from './quiz/quiz.component';

import { RouterModule } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ResultComponent } from './result/result.component';
import { QuizService } from './services/quiz.service';
import { AdminpanelComponent } from './adminpanel/adminpanel.component';

import { AddquestionComponent } from './addquestion/addquestion.component';

import { SampleTestComponent } from './sample-test/sample-test.component';
import { FinalResultComponent } from './final-result/final-result.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { AboutPvgComponent } from './about-pvg/about-pvg.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { ContactUsComponent } from './contact-us/contact-us.component';

@NgModule({
  declarations: [
    AppComponent,
    QuizComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    RegisterComponent,
    ResultComponent,
    AdminpanelComponent,
    AddquestionComponent,
    SampleTestComponent,
    FinalResultComponent,
    AboutUsComponent,
    AboutPvgComponent,
    LandingPageComponent,
    ContactUsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: '', component: LandingPageComponent },
      
      { path: 'quiz/:courseId', component: QuizComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'result', component: ResultComponent },
      { path: 'about-us', component: AboutUsComponent },
      { path: 'about-pvg', component: AboutPvgComponent },
      { path: 'adminpanel', component: AdminpanelComponent },
      { path: 'addquestion', component: AddquestionComponent },
      { path: 'landing-page', component: LandingPageComponent },
      { path: 'final-result/:courseId', component: FinalResultComponent },
      { path: 'login', component: LoginComponent },
      { path: 'contact-us', component: ContactUsComponent },
      {
        path: "about", children: [
          { path: "about-us", component: AboutUsComponent },
          { path: "about-pvg", component: AboutPvgComponent }
        ]
      },
      { path: '**', redirectTo: '/' }

    ])
  ],
  providers: [QuizService],
  bootstrap: [AppComponent]
})
export class AppModule { }

