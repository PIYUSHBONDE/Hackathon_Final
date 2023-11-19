import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountComponent } from './components/account/account.component';
import { HomeComponent } from './components/home/home.component';
import { PredictDatasetComponent } from './components/predict-dataset/predict-dataset.component';
import { PredictionResultComponent } from './components/prediction-result/prediction-result.component';
import { SavedPredictionsComponent } from './components/saved-predictions/saved-predictions.component';
import { AuthGuard } from './authguard.service';
import { LoggedInAuthGuard } from './loggedInAuthGuard.service';
import { PredictionResultAuthGuard } from './predictionResultAuthGuard.service';
import { InvestmentComponent } from './components/investment/investment.component';
import { FraudComponent } from './components/fraud/fraud.component';
import { JobRecommendationComponent } from './components/job-recommendation/job-recommendation.component';
const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'predict-dataset',
    component: PredictDatasetComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'predict-investment',
    component: InvestmentComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'predict-fraud',
    component: FraudComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'saved-predictions',
    component: SavedPredictionsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'predict-job',
    component: JobRecommendationComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'prediction-result',
    component: PredictionResultComponent,
    canActivate: [PredictionResultAuthGuard],
  },
  
  {
    path: 'account',
    component: AccountComponent,
    canActivate: [LoggedInAuthGuard],
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
