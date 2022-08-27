import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },

  {
    path: 'myprofile',
    loadChildren: () => import('./myprofile/myprofile.module').then( m => m.MyprofilePageModule)
  },
  {
    path: 'profilepage',
    loadChildren: () => import('./profilepage/profilepage.module').then( m => m.ProfilepagePageModule)
  },
  {
    path: 'footer',
    loadChildren: () => import('./footer/footer.module').then( m => m.FooterPageModule)
  },
  {
    path: 'forgotpass',
    loadChildren: () => import('./forgotpass/forgotpass.module').then( m => m.ForgotpassPageModule)
  },
  {
    path: 'otpconfirm/:number/:otp',
    loadChildren: () => import('./otpconfirm/otpconfirm.module').then( m => m.OtpconfirmPageModule)
  },
  {
    path: 'appointment-setting',
    loadChildren: () => import('./appointment-setting/appointment-setting.module').then( m => m.AppointmentSettingPageModule)
  },
  {
    path: 'reports',
    loadChildren: () => import('./reports/reports.module').then( m => m.ReportsPageModule)
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.module').then( m => m.DashboardPageModule)
  },
  {
    path: 'opd',
    loadChildren: () => import('./opd/opd.module').then( m => m.OpdPageModule)
  },
  {
    path: 'addmaster',
    loadChildren: () => import('./addmaster/addmaster.module').then( m => m.AddmasterPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'addleave',
    loadChildren: () => import('./addleave/addleave.module').then( m => m.AddleavePageModule)
  },
  {
    path: 'timemaster',
    loadChildren: () => import('./timemaster/timemaster.module').then( m => m.TimemasterPageModule)
  },
  {
    path: 'doctordetails/:id',
    loadChildren: () => import('./doctordetails/doctordetails.module').then( m => m.DoctordetailsPageModule)
  },
  {
    path: 'selectuser',
    loadChildren: () => import('./components/selectuser/selectuser.module').then( m => m.SelectuserPageModule)
  },
  
  {
    path: 'doctorlist',
    loadChildren: () => import('./doctorlist/doctorlist.module').then( m => m.DoctorlistPageModule)
  },
  {
    path: 'confirmappointment',
    loadChildren: () => import('./confirmappointment/confirmappointment.module').then( m => m.ConfirmappointmentPageModule)
  },
  {
    path: 'managemember',
    loadChildren: () => import('./managemember/managemember.module').then( m => m.ManagememberPageModule)
  },
  {
    path: 'feedback',
    loadChildren: () => import('./feedback/feedback.module').then( m => m.FeedbackPageModule)
  },
  {
    path: 'confirmpassword',
    loadChildren: () => import('./confirmpassword/confirmpassword.module').then( m => m.ConfirmpasswordPageModule)
  },
  {
    path: 'allpatient',
    loadChildren: () => import('./allpatient/allpatient.module').then( m => m.AllpatientPageModule)
  },
  {
    path: 'resetpassword/:number',
    loadChildren: () => import('./resetpassword/resetpassword.module').then( m => m.ResetpasswordPageModule)
  },
  {
    path: 'patient-history/:id',
    loadChildren: () => import('./patient-history/patient-history.module').then( m => m.PatientHistoryPageModule)
  },
 
 
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
