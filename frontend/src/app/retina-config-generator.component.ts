import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';

interface RetinaConfigForm {
  project_name: string;
  version: string;
  author: string;
  created_date: string;
  log_level: string;
  log_file: string;
  enable_logging: boolean;
  db_type: string;
  db_host: string;
  db_port: number;
  db_name: string;
  db_user: string;
  db_password: string;
  max_db_connections: number;
  enable_ui: boolean;
  ui_theme: string;
  ui_port: number;
  show_debug_toolbar: boolean;
  model_type: string;
  model_checkpoint: string;
  input_image_size: number;
  num_classes: number;
  use_gpu: boolean;
  gpu_device_id: number;
  image_format: string;
  resize_images: boolean;
  compression_ratio: number;
  normalize_pixels: boolean;
  training_enabled: boolean;
  train_batch_size: number;
  epochs: number;
  learning_rate: number;
  early_stopping: boolean;
  augmentation_enabled: boolean;
  enable_cloud_upload: boolean;
  cloud_provider: string;
  s3_bucket_name: string;
  aws_access_key: string;
  aws_secret_key: string;
  enable_email_alerts: boolean;
  email_host: string;
  email_port: number;
  email_use_tls: boolean;
  alert_email_from: string;
  alert_email_to: string;
  email_password: string;
  enable_scheduler: boolean;
  schedule_cron: string;
  timezone: string;
  environment: string;
  api_base_url: string;
  jwt_secret_key: string;
  allowed_hosts: string;
  build_id: number;
  last_updated: string;
  notes: string;
}

@Component({
  selector: 'app-retina-config-generator',
  standalone: true,
  imports: [FormsModule, NgIf],
  templateUrl: './retina-config-generator.component.html',
  styleUrls: ['./config/config-common.css']
})
export class RetinaConfigGeneratorComponent {
  formData: RetinaConfigForm = {
    project_name: '',
    version: '1.0.0',
    author: '',
    created_date: '',
    log_level: 'INFO',
    log_file: 'logs/app.log',
    enable_logging: true,
    db_type: '',
    db_host: '',
    db_port: 5432,
    db_name: '',
    db_user: '',
    db_password: '',
    max_db_connections: 10,
    enable_ui: true,
    ui_theme: 'dark',
    ui_port: 4200,
    show_debug_toolbar: false,
    model_type: '',
    model_checkpoint: '',
    input_image_size: 224,
    num_classes: 5,
    use_gpu: true,
    gpu_device_id: 0,
    image_format: 'jpg',
    resize_images: true,
    compression_ratio: 0.8,
    normalize_pixels: true,
    training_enabled: true,
    train_batch_size: 32,
    epochs: 50,
    learning_rate: 0.001,
    early_stopping: true,
    augmentation_enabled: true,
    enable_cloud_upload: false,
    cloud_provider: 'aws',
    s3_bucket_name: '',
    aws_access_key: '',
    aws_secret_key: '',
    enable_email_alerts: true,
    email_host: 'smtp.gmail.com',
    email_port: 587,
    email_use_tls: true,
    alert_email_from: '',
    alert_email_to: '',
    email_password: '',
    enable_scheduler: true,
    schedule_cron: '0 2 * * *',
    timezone: 'Asia/Kolkata',
    environment: 'production',
    api_base_url: '',
    jwt_secret_key: '',
    allowed_hosts: '',
    build_id: 10245,
    last_updated: '',
    notes: ''
  };
  configOutput: string | null = null;
  helpField: string | null = null;

  generateConfig() {
    this.configOutput = JSON.stringify(this.formData, null, 2);
  }

  showHelp(field: string) {
    this.helpField = this.helpField === field ? null : field;
  }
}
