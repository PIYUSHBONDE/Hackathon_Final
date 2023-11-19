import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GetData } from './models/GetData';
import { Observable } from 'rxjs';
import { GetPrediction } from './models/GetPrediction';
import { GetSavedPrediction } from './models/GetSavedPredictions';
import { SignInData } from './models/SignInData';
import { SignUpData } from './models/SignUpData';
import { GetInvestment } from './models/GetInvestment';
import { tap, catchError } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class FlaskapiService {
  constructor(private httpClient: HttpClient) {}

  public server: string = 'http://localhost:5000/';

  public getCurrentPrediction(email: any) {
    return this.httpClient.get<GetPrediction>(
      this.server + `currentPrediction/${email}`
    );
  }
  public getSavedPredictions(email: any) {
    return this.httpClient.get<GetSavedPrediction>(
      this.server + `getSavedPredictions/${email}`
    );
  }
  public postData(data: GetData, file: any, email: any) {
    const { title, predictColumn, periodicity, numericalValue } = data;
    const formData: FormData = new FormData();

    formData.append('title', title);
    formData.append('file', file);
    formData.append('email', email);
    formData.append('predictColumn', predictColumn);
    formData.append('periodicity', periodicity);
    formData.append('numericalValue', numericalValue);
    console.log(JSON.stringify(formData));
    return this.httpClient.post<GetData>(
      this.server + `getPredictions/${email}`,
      formData
    );
  }
  public savePrediction(data: any) {
    console.log(data);
    const {
      title,
      email,
      predicted_date,
      predicted_column,
      predictedColumnName,
      columnName,
      mape,
      mae,
      rmse,
      mse,
      periodicity,
      numericalValue,
    } = data;
    const formData: FormData = new FormData();

    formData.append('title', title);
    formData.append('email', email);
    formData.append('predicted_date', JSON.stringify(predicted_date));
    formData.append('predicted_column', JSON.stringify(predicted_column));
    formData.append('predictedColumnName', predictedColumnName);
    formData.append('columnName', columnName);
    formData.append('mape', mape);
    formData.append('mae', mae);
    formData.append('rmse', rmse);
    formData.append('mse', mse);
    formData.append('periodicity', periodicity);
    formData.append('numericalValue', numericalValue);
    return this.httpClient.post<GetSavedPrediction>(
      this.server + 'savePrediction',
      formData
    );
  }
  public deletePrediction(dateAndTime: any, email: any) {
    return this.httpClient.delete<any>(
      this.server + `deletePrediction/${dateAndTime}/${email}`
    );
  }
  public signIn(signInFormData: SignInData) {
    const formData: FormData = new FormData();
    const { email, password } = signInFormData;
    formData.append('email', email);
    formData.append('password', password);
    return this.httpClient.post<SignInData>(this.server + 'sign-in', formData);
  }
  public signUp(signUpFormData: SignUpData) {
    const { fullName, email, phoneNumber, password } = signUpFormData;
    const formData: FormData = new FormData();
    formData.append('fullName', fullName);
    formData.append('email', email);
    formData.append('phoneNumber', phoneNumber);
    formData.append('password', password);
    return this.httpClient.post<SignUpData>(this.server + 'sign-up', formData);
  }
  public signOut() {
    return this.httpClient.get<any>(this.server + 'logout');
  }

  public predict(data: any): Observable<GetInvestment> {
    // Assuming you have an endpoint for prediction in your Flask API
    const predictEndpoint = 'http://localhost:5000/predict';

    return this.httpClient.post<GetInvestment>(predictEndpoint, data);
  }

  public predictFraud(data: any): Observable<any> {
    // Assuming you have an endpoint for fraud prediction in your Flask API
    const predictFraudEndpoint = 'http://localhost:5000/predict-fraud';

    return this.httpClient.post<any>(predictFraudEndpoint, data);
  }

  public predictJob(data: any): Observable<any> {
    const predictJobEndpoint = 'http://localhost:5000/predict-job';
  
    const formData: FormData = new FormData();
    formData.append('resume_file', data.resumeFile);
  
    return this.httpClient.post<any>(predictJobEndpoint, formData)
      .pipe(
        tap(() => console.log('HTTP request successful')),
        catchError(error => {
          console.error('HTTP request error:', error);
  
          // Log the detailed error message
          if (error instanceof HttpErrorResponse) {
            console.error('Error status:', error.status);
            console.error('Error message:', error.message);
          }
  
          throw error;
        })
      );
  }
  
  
}


