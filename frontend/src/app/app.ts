import { Component } from '@angular/core';
import { DashboardComponent } from './dashboard.component';
import { JsonGeneratorComponent } from './json/json-generator.component';
import { XmlGeneratorComponent } from './xml/xml-generator.component';
import { OtherGeneratorComponent } from './other/other-generator.component';
import { ConfigGeneratorComponent } from './config/config-generator.component';
import { Config2GeneratorComponent } from './config2/config2-generator.component';
import { RetinaConfigGeneratorComponent } from './retina-config-generator.component';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [DashboardComponent, JsonGeneratorComponent, XmlGeneratorComponent, OtherGeneratorComponent, ConfigGeneratorComponent, Config2GeneratorComponent, RetinaConfigGeneratorComponent, NgIf],
  template: `
    <app-dashboard *ngIf="selected === ''" (formatSelected)="onFormatSelected($event)"></app-dashboard>
    <app-json-generator *ngIf="selected === 'json'"></app-json-generator>
    <app-xml-generator *ngIf="selected === 'xml'"></app-xml-generator>
    <app-other-generator *ngIf="selected === 'other'"></app-other-generator>
    <app-config-generator *ngIf="selected === 'config'"></app-config-generator>
    <app-config2-generator *ngIf="selected === 'config2'"></app-config2-generator>
    <app-retina-config-generator *ngIf="selected === 'retina-config'"></app-retina-config-generator>
    <button *ngIf="selected !== ''" (click)="selected = ''" style="margin:2em auto;display:block;">Back to Dashboard</button>
  `
})
export class App {
  selected = '';
  onFormatSelected(format: string) {
    this.selected = format;
  }
}
