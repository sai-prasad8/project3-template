import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent {
  @Output() formatSelected = new EventEmitter<string>();

  selectFormat(format: string) {
    this.formatSelected.emit(format);
  }
}
