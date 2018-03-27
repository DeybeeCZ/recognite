import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/pages/home/home.component';
import { DetectionComponent } from './components/pages/detection/detection.component';
import { CoachComponent } from './components/pages/coach/coach.component';
import { NoFoundComponent } from './components/pages/no-found/no-found.component';

const routes: Routes = [
  { path: '',
children:[
    {path:'',redirectTo:'identificacion',pathMatch:'full'},
    { path: 'identificacion', component:HomeComponent },
    { path: 'entrenamiento', component:CoachComponent }
] },
  { path: '**', component:NoFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
