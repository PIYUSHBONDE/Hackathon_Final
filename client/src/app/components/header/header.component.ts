import {
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';

import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  name: any;
  showName: any;
  @ViewChild('samplesLink') siblingSamplesLink: ElementRef;
  @ViewChild('headerDiv') siblingheaderDiv: ElementRef;

  @Output() siblingSamples = new EventEmitter();
  @Output() siblingHeader = new EventEmitter();

  constructor(private router: Router) {}

  ngOnInit(): void {
    if (localStorage.getItem('name')) {
      this.name = localStorage.getItem('name');
      this.showName = true;
    } else {
      this.showName = false;
    }
  }

  ngAfterViewInit(): void {
    this.siblingSamples.emit(this.siblingSamplesLink);
    this.siblingHeader.emit(this.siblingheaderDiv);
  }

  navigateToPredictInvestment() {
    this.router.navigate(['/predict-investment']);
  }

  // Add a method to navigate to the '/predict-fraud' route
  navigateToPredictFraud() {
    this.router.navigate(['/predict-fraud']);
  }
}
