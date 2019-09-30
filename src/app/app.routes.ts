import { Routes, RouterModule } from '@angular/router';
import { IntroductionComponent } from './components/introduction/introduction.component';
import { CustomersComponent } from './components/customers/customers.component';
import { OfficesComponent } from './components/offices/offices.component';


const routes: Routes = [
  {
    path: '',
    component: IntroductionComponent
  },
   {
    path: 'customers',
    component: CustomersComponent
  },
  {
    path: 'offices',
    component: OfficesComponent
  }
];

export const AppRoutes = RouterModule.forRoot(routes);
