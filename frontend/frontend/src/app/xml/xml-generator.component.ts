import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-xml-generator',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './xml-generator.component.html',
  styleUrls: ['./xml-generator.component.css']
})
export class XmlGeneratorComponent {
  formData = { name: '', age: '', email: '' };
  xmlOutput: string | null = null;
  editMode = false;

  generateXML() {
    this.xmlOutput = `<user>\n  <name>${this.formData.name}</name>\n  <age>${this.formData.age}</age>\n  <email>${this.formData.email}</email>\n</user>`;
    this.editMode = false;
    setTimeout(() => {
      const dialog: any = document.getElementById('xmlModal');
      if (dialog) dialog.showModal();
    });
  }

  closeModal() {
    const dialog: any = document.getElementById('xmlModal');
    if (dialog) dialog.close();
  }

  downloadXML() {
    if (!this.xmlOutput || this.editMode) return;
    const blob = new Blob([this.xmlOutput], { type: 'application/xml' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'data.xml';
    a.click();
    window.URL.revokeObjectURL(url);
  }
}
