import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';

interface ConfigFormData {
  appId: number; // fixed
  appName: string; // user input, mandatory
  version: string; // default '1.0.0', editable
  debug: boolean; // default false, editable
  maxUsers: number; // user input, mandatory
  timeout: number; // default 30, editable
  apiUrl: string; // user input, mandatory
  logLevel: string; // default 'info', editable
  region: string; // user input
  enableCache: boolean; // default true, editable
  createdBy: string; // fixed
  createdAt: string; // fixed
  description: string; // user input
  retryAttempts: number; // default 3, editable
  features: string; // user input, comma separated
  uploadFile?: File | null; // new param for file upload
  selectedDate?: string; // new param for date
  jsondata: any; // required, should be an object
  // --- dynamic fields ---
  age?: number | null;
  bday?: string;
  haveLicense?: boolean;
  schoolName?: string;
}

@Component({
  selector: 'app-config-generator',
  standalone: true,
  imports: [FormsModule, NgIf],
  templateUrl: './config-generator.component.html',
  styleUrls: ['./config-common.css']
})
export class ConfigGeneratorComponent {
  formData: ConfigFormData = {
    appId: 5001, // fixed
    appName: '',
    version: '1.0.0',
    debug: false,
    maxUsers: 100,
    timeout: 30,
    apiUrl: '',
    logLevel: 'info',
    region: '',
    enableCache: true,
    createdBy: 'admin', // fixed
    createdAt: '2025-06-16T00:00:00Z', // fixed
    description: '',
    retryAttempts: 3,
    features: '',
    uploadFile: null,
    selectedDate: '',
    jsondata: {},
    // dynamic fields
    age: null,
    bday: '',
    haveLicense: false,
    schoolName: '',
  };
  configOutput: string | null = null;
  editMode = false;
  helpField: string | null = null;
  showBday = false;
  showHaveLicense = false;
  showSchoolName = false;
  private ageTimeout: any;
  // --- jsondata popup state ---
  showJsonSubform = false;
  jsonSubform: { [key: string]: any } = {
    key1: '',
    key2: '',
    key3: ''
  };

  openJsonSubform() {
    this.showJsonSubform = true;
    setTimeout(() => {
      const dialog: any = document.getElementById('jsonSubformDialog');
      if (dialog) dialog.showModal();
    });
  }
  closeJsonSubform() {
    this.showJsonSubform = false;
    const dialog: any = document.getElementById('jsonSubformDialog');
    if (dialog) dialog.close();
  }
  saveJsonSubform() {
    this.formData.jsondata = { ...this.jsonSubform };
    this.closeJsonSubform();
  }

  generateConfig() {
    this.configOutput = JSON.stringify(this.formData, null, 2);
    this.editMode = false;
    setTimeout(() => {
      const dialog: any = document.getElementById('configModal');
      if (dialog) dialog.showModal();
    });
  }

  closeModal() {
    const dialog: any = document.getElementById('configModal');
    if (dialog) dialog.close();
  }

  downloadConfig() {
    if (!this.configOutput || this.editMode) return;
    const blob = new Blob([this.configOutput], { type: 'application/config' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'app.config';
    a.click();
    window.URL.revokeObjectURL(url);
  }

  onFileSelected(event: any) {
    const file = event.target.files && event.target.files[0];
    this.formData.uploadFile = file || null;
  }

  showHelp(field: string) {
    this.helpField = this.helpField === field ? null : field;
  }

  onAgeInput() {
    if (this.ageTimeout) clearTimeout(this.ageTimeout);
    this.ageTimeout = setTimeout(() => {
      const age = this.formData.age || 0;
      this.showBday = age > 0;
      this.showHaveLicense = age > 18;
      this.showSchoolName = age > 0 && age < 18;
      // Reset fields if not shown
      if (!this.showHaveLicense) this.formData.haveLicense = false;
      if (!this.showSchoolName) this.formData.schoolName = '';
      if (!this.showBday) this.formData.bday = '';
    }, 1000);
  }

  jsonString(obj: any): string {
    try {
      return obj && Object.keys(obj).length ? JSON.stringify(obj) : '';
    } catch {
      return '';
    }
  }
}
