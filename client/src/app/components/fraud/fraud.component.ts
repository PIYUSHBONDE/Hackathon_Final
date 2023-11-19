import { Component,ElementRef , OnInit } from '@angular/core';
import { FlaskapiService } from '../../flaskapi.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-fraud',
  templateUrl: './fraud.component.html',
  styleUrls: ['./fraud.component.css']
})
export class FraudComponent implements OnInit {

  fraudForm: FormGroup;
  predictionResult: any;  
  // explanation: string;
  explanation: SafeHtml; // Make sure SafeHtml is imported
  // Declare the properties for the navbar elements
  navbarContainer: ElementRef;
  aboutLink: ElementRef;
  savedPredictionsLink: ElementRef;
  predictDatasetLink: ElementRef;
  contactUsLink: ElementRef;
  navBrand: ElementRef;
  home: ElementRef;
  featureLink: ElementRef;
  samplesLink: ElementRef;
  moreInfoLink: ElementRef;


  constructor(private flaskApiService: FlaskapiService, private formBuilder: FormBuilder,  private sanitizer: DomSanitizer) { }
  
  ngAfterViewInit(): void {
    this.savedPredictionsLink.nativeElement.setAttribute(
      'style',
      'color: rgb(179, 179, 179) !important'
    );
    this.moreInfoLink.nativeElement.setAttribute(
      'style',
      'color: rgb(179, 179, 179) !important'
    );
    this.aboutLink.nativeElement.setAttribute(
      'style',
      'display: none !important'
    );
    // this.predictDatasetLink.nativeElement.setAttribute(
    //   'style',
    //   'color: white !important'
    // );

    this.contactUsLink.nativeElement.setAttribute(
      'style',
      'display: none !important'
    );
    this.featureLink.nativeElement.setAttribute(
      'style',
      'display: none !important'
    );
    this.samplesLink.nativeElement.setAttribute(
      'style',
      'display: none !important'
    );
    this.navbarContainer.nativeElement.classList.add('bg-dark');
    this.navBrand.nativeElement.setAttribute(
      'style',
      'color: white !important'
    );

    this.home.nativeElement.setAttribute(
      'style',
      'color: rgb(179, 179, 179) !important'
    );
  }

  ngOnInit(): void {
    this.fraudForm = this.formBuilder.group({
      message: ['', Validators.required],
    });
    // this.callFlaskAPI();
  }

  onSubmit() {
    if (this.fraudForm.valid) {
      const message = this.fraudForm.value.message;
      this.flaskApiService.predictFraud({ message }).subscribe(
        response => {
          this.predictionResult = response.prediction;
          this.explanation = response.explanation.join(', ');
          if (response.prediction === 1) {
            this.predictionResult += ' This message is flagged as potential fraud. Further investigation is recommended.';
          } else {
            this.predictionResult += ' This message is not flagged as fraud.';
          }
        },
        error => {
          console.error(error);
          // Handle errors if necessary
        }
      );
    }
  }

  // onSubmit() {
  //   if (this.fraudForm.valid) {
  //     const message = this.fraudForm.value.message;
  //     this.flaskApiService.predictFraud({ message }).subscribe(
  //       response => {
  //         console.log('API Response:', response);
  //         this.predictionResult = response.prediction;
  //         this.explanation = this.sanitizer.bypassSecurityTrustHtml(response.explanation);

  //         // Check if the prediction is fraud or not and include a message
  //         if (response.prediction === 1) {
  //           this.predictionResult += ' This message is flagged as potential fraud. Further investigation is recommended.';
  //         } else {
  //           this.predictionResult += ' This message is not flagged as fraud.';
  //         }
  //       },
  //       error => {
  //         console.error(error);
  //         // Handle errors if necessary
  //       }
  //     );
  //   }
  // }

}
