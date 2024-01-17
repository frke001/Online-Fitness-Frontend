import { Routes } from '@angular/router';
import { PageTemplateComponent } from './page-template/page-template.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { FitnessProgramsComponent } from './fitness-programs/fitness-programs.component';
import { ActivityDiaryComponent } from './activity-diary/activity-diary.component';
import { HomeComponent } from './home/home.component';
import { ActivateComponent } from './activate/activate.component';
import { authGuard } from './guards/auth.guard';
import { ProfileComponent } from './profile/profile.component';
import { ExercisesComponent } from './exercises/exercises/exercises.component';
import { MyFitnessProgramsComponent } from './my-fitness-programs/my-fitness-programs.component';
import { AddProgramComponent } from './my-fitness-programs/add-program/add-program.component';
import { loginGuard } from './guards/login/login.guard';
import { FitnessProgramComponent } from './fitnessProgram/fitness-program/fitness-program.component';
import { ParticipateComponent } from './participate/participate.component';
import { MessagesComponent } from './messages/messages.component';

export const routes: Routes = [

    {
        path: '',
        title: 'Home',
        component: PageTemplateComponent,
        children: [
            {
                path: 'home',
                title: 'Home',
                component: HomeComponent
            },
            {
                path: 'exercises',
                title: 'Daili Exercises',
                component: ExercisesComponent,
                canActivate: [authGuard]
            },
            {
                path: 'my-fitness-programs',
                title: 'My Fitness Programs',
                component: MyFitnessProgramsComponent,
                canActivate: [authGuard]
            },
            {
                path: 'add-program',
                title: 'New Fitness Program',
                component: AddProgramComponent,
                canActivate: [authGuard]
            },
            {
                path: 'fitness-programs',
                title: 'Fitness Programs',
                component: FitnessProgramsComponent,
            },
            {
                path: 'fitness-programs/:id',
                title: 'Fitness Program',
                component: FitnessProgramComponent,
            },
            {
                path: 'diary',
                title: 'Diary',
                component: ActivityDiaryComponent,
                canActivate: [authGuard]
            },
            {
                path: 'profile',
                title: 'Profile',
                component: ProfileComponent,
                canActivate: [authGuard]
            },
            {
                path: 'participate/:id',
                title: 'Program participation',
                component: ParticipateComponent,
                canActivate: [authGuard]
            },
            {
                path: 'messages',
                title: 'Messages',
                component: MessagesComponent,
                canActivate: [authGuard]
            },
            {
                path: '',
                redirectTo: 'home',
                pathMatch: 'full'
            },

        ]
    },
    {
        path: 'login',
        title: 'Login',
        component: LoginComponent,
        canActivate: [loginGuard]
    },
    {
        path: 'register',
        title: 'Register',
        component: RegisterComponent
    },
    {
        path: 'activate',
        title: 'Activate Account',
        component: ActivateComponent
    },
];
