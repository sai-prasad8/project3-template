import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgIf, NgFor } from '@angular/common';

@Component({
  selector: 'app-dummy-form',
  standalone: true,
  imports: [FormsModule, NgIf, NgFor],
  templateUrl: './dummy-form.component.html',
  styleUrls: ['../config/config-common.css']
})
export class DummyFormComponent {
  helpField: string | null = null;

  showHelp(field: string) {
    this.helpField = this.helpField === field ? null : field;
  }
  formData: any = {
    field1: 'word1',
    field2: '',
    field3: '',
    field4: '',
    field5: '',
    field6: '',
    field7: 'word7',
    field8: 'utf-8',
    field9FilePattern: '',
    field10FileLocation: '',
    field11File1Location: '',
    field12MetaFilepath: '',
    inputfilecolumnDelimiter: ',',
    header: 'false',
    field13: '',
    field14: '',
    field15: 'date',
    field16: '',
    field17: '',
    validatemetadata: 'true',
    faillfFi1eEmpty: 'true',
    failifnofiles: 'false',
    target: 'lemon',
    field18: 'fa1se',
    field19: '',
    field20: '',
    field21: 'true',
    field22: '',
    field23: '',
    field24: '',
    field25dir: '',
    field26: '',
    field27: '',
    field28: 'false',
    field29: '',
    field30: '',
    field31: 'true',
    field32: '',
    field33: '',
    field34: '256',
    field35: 'true',
    field36: 'false',
    getSuccessMail: 'false',
    ingestionSuccessEmail: '',
    ingestionFailureEmail: '',
    fromAddr: 'noreply@guava.com',
    field34Addr: 'addressoffolder.ini',
    field35Addr: '',
    field36MappingKeys: [
      { key: 'param1', value: 'value1' },
      { key: 'param2', value: 'value2' },
      { key: 'param3', value: 'value3' },
      { key: 'param4', value: 'value4' },
      { key: 'param5', value: '' }
    ],
    field37: '',
    field38Map: [],
    field39: 'true',
    field40: 'true',
    field41: 'true',
    field42MappingKeys: [
      { key: 'param1', value: 'value1' },
      { key: 'param2', value: 'value2' },
      { key: 'param3', value: 'value3' },
      { key: 'param4', value: 'value4' }
    ]
  };

  output: string | null = null;
  editMode = false;

  addMappingKey(field: 'field36MappingKeys' | 'field42MappingKeys') {
    this.formData[field].push({ key: '', value: '' });
  }
  removeMappingKey(field: 'field36MappingKeys' | 'field42MappingKeys', i: number) {
    if (this.formData[field].length > 1) this.formData[field].splice(i, 1);
  }
  addField38Map() {
    this.formData.field38Map.push({ key: '', value: '' });
  }
  removeField38Map(i: number) {
    if (this.formData.field38Map.length > 0) this.formData.field38Map.splice(i, 1);
  }

  isField10Or11Required() {
    return !this.formData.field10FileLocation && !this.formData.field11File1Location;
  }
  isField12Required() {
    return this.formData.header === 'false' && !this.formData.field12MetaFilepath;
  }
  isField19_20_21_22Required() {
    return this.formData.field18 === 'true';
  }
  isField22Required() {
    return this.formData.field21 === 'false';
  }
  isLemon() {
    return this.formData.target === 'lemon';
  }
  isApple() {
    return this.formData.target === 'apple';
  }
  isSuccessMailRequired() {
    return this.formData.getSuccessMail === 'true';
  }

  generateDummy() {
    // Validate unique field2 (simulate uniqueness)
    // Add more validation as needed
    this.output = JSON.stringify(this.formData, null, 2);
    this.editMode = false;
    setTimeout(() => {
      const dialog: any = document.getElementById('dummyModal');
      if (dialog) dialog.showModal();
    });
  }
  closeModal() {
    const dialog: any = document.getElementById('dummyModal');
    if (dialog) dialog.close();
  }
  downloadDummy() {
    if (!this.output || this.editMode) return;
    const blob = new Blob([this.output], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'dummy.json';
    a.click();
    window.URL.revokeObjectURL(url);
  }
}