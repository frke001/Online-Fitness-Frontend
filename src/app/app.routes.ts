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
                path: 'fitness',
                title: 'Fitness Programs',
                component: FitnessProgramsComponent,
                canActivate: [authGuard]
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
                path: '',
                redirectTo: 'home',
                pathMatch: 'full'
            },
        ]
    },
    {
        path: 'login',
        title: 'Login',
        component: LoginComponent
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
