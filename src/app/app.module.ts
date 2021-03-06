import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AppErrorHandler } from './common/app-error-handler';

import { StudentService } from './services/student.service';
import { InstructorService } from './services/instructor.service';
import { CourseService } from './services/course.service';
import { UserService } from './services/user.service';
import { DataService } from './services/data.service';

import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JwtModule } from '@auth0/angular-jwt';

import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { CoursesComponent } from './courses/courses.component';
import { StudentsComponent } from './students/students.component';
import { InstructorsComponent } from './instructors/instructors.component';
import { UsersComponent } from './users/users.component';
import { StudentProfileComponent } from './student-profile/student-profile.component';
import { InstructorProfileComponent } from './instructor-profile/instructor-profile.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { CourseProfileComponent } from './course-profile/course-profile.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { LoginComponent } from './login/login.component';
import { SummaryPipe } from './pipes/summary.pipe';
import { FooterComponent } from './footer/footer.component';
import { AuthGuard } from './services/auth.guard';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    CoursesComponent,
    StudentsComponent,
    InstructorsComponent,
    UsersComponent,
    StudentProfileComponent,
    InstructorProfileComponent,
    UserProfileComponent,
    CourseProfileComponent,
    NotFoundComponent,
    LoginComponent,
    SummaryPipe,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'students/:id',
        component: StudentProfileComponent,
        canActivate: [AuthGuard]
      },
      { path: 'students',
        component: StudentsComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'instructors/:id',
        component: InstructorProfileComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'instructors',
        component: InstructorsComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'courses/:id',
        component: CourseProfileComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'courses',
        component: CoursesComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'users/:id',
        component: UserProfileComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'users',
        component: UsersComponent,
        canActivate: [AuthGuard]
      },
      { path: '',
        component: HomeComponent,
        pathMatch: 'full'
        // redirectTo: 'home'
      },
      {
        path: '**',
        component: NotFoundComponent
      }
    ])
  ],
  providers: [
    StudentService,
    InstructorService,
    CourseService,
    UserService,
    DataService,
    AuthGuard,
    { provide: ErrorHandler, useClass: AppErrorHandler} // instead of default error handler use custom error handler
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
