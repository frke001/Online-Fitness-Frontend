import { Routes } from '@angular/router';
import { PageTemplateComponent } from './page-template/page-template.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { FitnessProgramsComponent } from './fitness-programs/fitness-programs.component';
import { ActivityDiaryComponent } from './activity-diary/activity-diary.component';
import { HomeComponent } from './home/home.component';
import { ActivateComponent } from './activate/activate.component';

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
                path: 'fitness',
                title: 'Fitness Programs',
                component: FitnessProgramsComponent
            },
            {
                path: 'diary',
                title: 'Diary',
                component: ActivityDiaryComponent
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
