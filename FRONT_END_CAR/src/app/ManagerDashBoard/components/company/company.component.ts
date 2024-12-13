import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpEventType, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Company } from '../../../Shared/models/company';
import { CompanyService } from '../../../Shared/service/company.service';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit {
  companies: Company[] = [];
  addForm: FormGroup;
  editForm: FormGroup;
  isModalOpen = false;
  isEditModalOpen = false;
  uploadProgress: number = 0;

  constructor(private companyService: CompanyService, private fb: FormBuilder) {
    // Form initialization for adding new company
    this.addForm = this.fb.group({
      companyName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      address: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      logoImage: [null],
      managerName: ['', Validators.required],
      profileImage: [null]
    });

    // Form initialization for editing existing company
    this.editForm = this.fb.group({
      companyId: ['', Validators.required],
      companyName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      address: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      logoImage: [null],
      managerName: ['', Validators.required],
      profileImage: [null]
    });
  }

  ngOnInit(): void {
    this.loadCompanies();
  }

  // Load all companies from the service
  loadCompanies() {
    this.companyService.getAllCompanies().subscribe((companies) => {
      this.companies = companies;
    });
  }

  // Open modal for adding new company
  openModal() {
    this.isModalOpen = true;
  }

  // Close the add company modal
  closeModal() {
    this.isModalOpen = false;
  }

  // Open modal for editing a company's details
  openEditModal(company: Company) {
    this.isEditModalOpen = true;
    this.editForm.patchValue(company);  // Fill in the form with the selected company data
  }

  // Close the edit company modal
  closeEditModal() {
    this.isEditModalOpen = false;
  }

  // Handle form submission for adding a new company
  onSubmit() {
    if (this.addForm.invalid) return;
    const formData = new FormData();
    Object.keys(this.addForm.value).forEach((key) => {
      formData.append(key, this.addForm.get(key)?.value);
    });

    this.companyService.addCompany(formData).subscribe(
      (response) => {
        this.loadCompanies(); // Reload the companies after adding
        this.closeModal();
      },
      (error) => {
        console.error('Error adding company:', error);
      }
    );
  }

  // Handle form submission for editing an existing company
  onEditSubmit() {
    if (this.editForm.invalid) return;
    const formData = new FormData();
    Object.keys(this.editForm.value).forEach((key) => {
      formData.append(key, this.editForm.get(key)?.value);
    });

    const companyId = this.editForm.value.companyId;  // Assuming the company ID is available in the form
    this.companyService.editCompany(companyId, formData).subscribe(
      (response) => {
        this.loadCompanies(); // Reload the companies after editing
        this.closeEditModal();
      },
      (error) => {
        console.error('Error editing company:', error);
      }
    );
  }

  // Handle file change for logo and profile images
  onFileChange(event: any, field: string) {
    const file = event.target.files[0];
    if (file) {
      this.addForm.patchValue({
        [field]: file
      });
      this.uploadProgress = 0;
      this.uploadFile(file, field);
    }
  }

  // Upload the selected file (logo or profile image)
  uploadFile(file: File, field: string) {
    const formData = new FormData();
    formData.append(field, file);

    this.companyService.uploadFile(formData).subscribe(
      (event: any) => {
        switch (event.type) {
          case HttpEventType.UploadProgress:
            if (event.total) {
              this.uploadProgress = Math.round((100 * event.loaded) / event.total);
            }
            break;
          case HttpEventType.Response:
            console.log('File uploaded successfully', event.body);
            break;
        }
      },
      (error) => {
        console.error('Error uploading file:', error);
        this.uploadProgress = 0; // Reset progress on error
      }
    );
  }
}
