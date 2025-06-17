import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';

interface Config2FormData {
  serviceId: string; // user input, mandatory
  serviceName: string; // user input, mandatory
  enabled: boolean; // default true, editable
  endpoint: string; // user input, mandatory
  port: number; // default 8080, editable
  protocol: string; // default 'https', editable
  retries: number; // default 5, editable
  timeoutMs: number; // default 5000, editable
  owner: string; // user input
  region: string; // user input
  tags: string; // user input, comma separated
  lastUpdated: string; // fixed
  createdBy: string; // fixed
  notes: string; // user input
  configFile: File | null; // file upload
  activationDate: string; // date
}

@Component({
  selector: 'app-config2-generator',
  standalone: true,
  imports: [FormsModule, NgIf],
  templateUrl: './config2-generator.component.html',
  styleUrls: ['../config/config-common.css']
})
export class Config2GeneratorComponent {
  formData: Config2FormData = {
    serviceId: '',
    serviceName: '',
    enabled: true,
    endpoint: '',
    port: 8080,
    protocol: 'https',
    retries: 5,
    timeoutMs: 5000,
    owner: '',
    region: '',
    tags: '',
    lastUpdated: '2025-06-16T00:00:00Z',
    createdBy: 'system',
    notes: '',
    configFile: null,
    activationDate: '',
  };
  configOutput: string | null = null;
  editMode = false;
  helpField: string | null = null;

  generateConfig() {
    const { configFile, ...rest } = this.formData;
    this.configOutput = JSON.stringify(rest, null, 2);
    this.editMode = false;
    setTimeout(() => {
      const dialog: any = document.getElementById('config2Modal');
      if (dialog) dialog.showModal();
    });
  }

  closeModal() {
    const dialog: any = document.getElementById('config2Modal');
    if (dialog) dialog.close();
  }

  downloadConfig() {
    if (!this.configOutput || this.editMode) return;
    const blob = new Blob([this.configOutput], { type: 'application/config' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'service.config';
    a.click();
    window.URL.revokeObjectURL(url);
  }

  onFileSelected(event: any) {
    const file = event.target.files && event.target.files[0];
    this.formData.configFile = file || null;
  }

  showHelp(field: string) {
    this.helpField = this.helpField === field ? null : field;
  }
}
