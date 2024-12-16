import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpEventType, HttpHeaders } from '@angular/common/http';
import { Company } from '../../../Shared/models/company';
import { CompanyService } from '../../../Shared/service/company.service';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css'],
})
export class CompanyComponent implements OnInit {
  companies: Company[] = [];
  addForm: FormGroup;
  editForm: FormGroup;
  isModalOpen = false;
  isEditModalOpen = false;
  uploadProgress: number = 0;

  constructor(private companyService: CompanyService, private fb: FormBuilder) {
    // Initialize forms for adding and editing companies
    this.addForm = this.fb.group({
      companyName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      address: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      logoImage: [null],
      managerName: ['', Validators.required],
      profileImage: [null],
    });

    this.editForm = this.fb.group({
      companyId: ['', Validators.required],
      companyName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      address: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      logoImage: [null],
      managerName: ['', Validators.required],
      profileImage: [null],
    });
  }

  ngOnInit(): void {
    this.loadCompanies();
  }

  // Load all companies from the service
  loadCompanies() {
    this.companyService.getAllCompanies().subscribe(
      (companies) => {
        this.companies = companies;
      },
      (error) => {
        console.error('Error loading companies:', error);
      }
    );
  }

  // Open modal to add a company
  openModal() {
    this.isModalOpen = true;
  }

  // Close the add company modal
  closeModal() {
    this.isModalOpen = false;
  }

  // Open modal to edit a company
  openEditModal(company: Company) {
    this.isEditModalOpen = true;
    this.editForm.patchValue(company);
  }

  // Close the edit company modal
  closeEditModal() {
    this.isEditModalOpen = false;
  }

  // Handle form submission to add a new company
  onSubmit() {
    if (this.addForm.invalid) return;

    const formData = new FormData();
    Object.keys(this.addForm.value).forEach((key) => {
      formData.append(key, this.addForm.get(key)?.value);
    });

    this.companyService.addCompany(formData).subscribe(
      () => {
        this.loadCompanies();
        this.closeModal();
      },
      (error) => {
        console.error('Error adding company:', error);
      }
    );
  }

  // Handle form submission to edit an existing company
  onEditSubmit() {
    if (this.editForm.invalid) return;

    const formData = new FormData();
    Object.keys(this.editForm.value).forEach((key) => {
      formData.append(key, this.editForm.get(key)?.value);
    });

    const companyId = this.editForm.value.companyId;

    this.companyService.editCompany(companyId, formData).subscribe(
      () => {
        this.loadCompanies();
        this.closeEditModal();
      },
      (error) => {
        console.error('Error editing company:', error);
      }
    );
  }

  // Handle file input changes for company logos and profile images
  onFileChange(event: any, field: string) {
    const file = event.target.files[0];
    if (file) {
      this.addForm.patchValue({ [field]: file });
      this.uploadFile(file, field);
    }
  }

  // Upload a file (logo/profile image)
  uploadFile(file: File, field: string) {
    const formData = new FormData();
    formData.append(field, file);

    const headers = new HttpHeaders().set('enctype', 'multipart/form-data');
    this.companyService.uploadFile(formData, headers).subscribe(
      (event: any) => {
        if (event.type === HttpEventType.UploadProgress && event.total) {
          this.uploadProgress = Math.round((100 * event.loaded) / event.total);
        } else if (event.type === HttpEventType.Response) {
          console.log('Upload complete:', event.body);
        }
      },
      (error) => {
        console.error('Error uploading file:', error);
      }
    );
  }

  // Delete a company
  deleteCompany(companyId: number) {
    if (confirm('Are you sure you want to delete this company?')) {
      this.companyService.deleteCompany(companyId).subscribe(
        () => {
          this.loadCompanies();
        },
        (error) => {
          console.error('Error deleting company:', error);
        }
      );
    }
  }
}
