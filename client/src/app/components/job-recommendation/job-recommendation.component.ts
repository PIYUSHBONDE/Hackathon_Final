import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FlaskapiService } from 'src/app/flaskapi.service'; // Update the path
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-job-recommendation',
  templateUrl: './job-recommendation.component.html',
  styleUrls: ['./job-recommendation.component.css']
})
export class JobRecommendationComponent {
  jobForm: FormGroup;
  userKeywords: string;
  topJobs: any[];

  constructor(private formBuilder: FormBuilder, private flaskApiService: FlaskapiService) {
    this.jobForm = this.formBuilder.group({
      resumeFile: ['']
    });
  }

  onSubmit() {
    const resumeFileControl = this.jobForm.get('resumeFile');

    if (resumeFileControl && resumeFileControl.value) {
      const formData = new FormData();
      formData.append('resume_file', resumeFileControl.value);

      // Log the formData to check its contents
      console.log('FormData:', formData);

      // Log the existence of the file key
console.log('File key exists:', formData.has('resume_file'));

      // Log the type of the file
      // console.log('File type:', formData.get('resume_file').type);

      this.flaskApiService.predictJob(formData).subscribe(
        (response) => {
          this.userKeywords = response.user_keywords;
          this.topJobs = response.top_jobs;
        },
        (error) => {
          console.error(error);
        }
      );
    } else {
      console.error('No file selected.');
    }
  }
}
