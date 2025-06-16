import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';

interface JsonFormData {
  id: number; // fixed
  username: string; // user input, mandatory
  email: string; // user input, mandatory
  age: number; // user input, default 18
  isActive: boolean; // default true, editable
  role: string; // fixed
  country: string; // user input, default 'USA'
  phone: string; // user input
  createdAt: string; // fixed
  updatedAt: string; // fixed
  notes: string; // user input
  score: number; // user input, default 0
  verified: boolean; // user input, default false
  tags: string; // user input, comma separated
  preferences: string; // user input, json string
}

@Component({
  selector: 'app-json-generator',
  standalone: true,
  imports: [FormsModule, NgIf],
  templateUrl: './json-generator.component.html',
  styleUrls: ['./json-generator.component.css']
})
export class JsonGeneratorComponent {
  formData: JsonFormData = {
    id: 1001, // fixed
    username: '',
    email: '',
    age: 18,
    isActive: true,
    role: 'user', // fixed
    country: 'USA',
    phone: '',
    createdAt: '2025-06-16T00:00:00Z', // fixed
    updatedAt: '2025-06-16T00:00:00Z', // fixed
    notes: '',
    score: 0,
    verified: false,
    tags: '',
    preferences: '{}',
  };
  jsonOutput: string | null = null;
  editMode = false;

  generateJSON() {
    this.jsonOutput = JSON.stringify(this.formData, null, 2);
    this.editMode = false;
    setTimeout(() => {
      const dialog: any = document.getElementById('jsonModal');
      if (dialog) dialog.showModal();
    });
  }

  closeModal() {
    const dialog: any = document.getElementById('jsonModal');
    if (dialog) dialog.close();
  }

  downloadJSON() {
    if (!this.jsonOutput || this.editMode) return;
    const blob = new Blob([this.jsonOutput], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'data.json';
    a.click();
    window.URL.revokeObjectURL(url);
  }
}
