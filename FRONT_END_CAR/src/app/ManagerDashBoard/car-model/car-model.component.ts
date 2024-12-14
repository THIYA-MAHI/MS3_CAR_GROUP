import { Component, OnInit } from '@angular/core';
import { Model } from '../../Shared/models/model';
import { ModelService } from '../../Shared/service/model.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-car-model',
  templateUrl: './car-model.component.html',
  styleUrl: './car-model.component.css',
})
export class CarModelComponent implements OnInit{
  models: Model[] = [];
  isAddModalOpen: boolean = false;
  isEditModalOpen: boolean = false;

  newModel: Omit<Model, 'modelId'> = {
    modelName: '',
    creationDate: new Date().toISOString(),
  };

  selectedModel: Model = {
    modelId: '',
    modelName: '',
    creationDate: '',
    updateDate: null,
  };

  constructor(private modelService: ModelService) {}

  ngOnInit(): void {
    this.loadModels();
  }

  // Load all models
  loadModels(): void {
    this.modelService.getAllModels().subscribe(
      (data) => {
        this.models = data;
      },
      (error) => {
        console.error('Error fetching models:', error);
      }
    );
  }

  // Open the Add Model modal
  openAddModelModal(): void {
    this.isAddModalOpen = true;
  }

  // Close the Add Model modal
  closeAddModelModal(): void {
    this.isAddModalOpen = false;
    this.newModel = {
      modelName: '',
      creationDate: new Date().toISOString(),
    };
  }

  // Add a new model
  addModel(form: NgForm): void {
    if (form.invalid) return;

    this.modelService.addModel(this.newModel).subscribe(
      (model) => {
        this.models.push(model);
        this.closeAddModelModal();
      },
      (error) => {
        console.error('Error adding model:', error);
      }
    );
  }

  // Open the Edit Model modal
  openEditModelModal(model: Model): void {
    this.selectedModel = { ...model };
    this.isEditModalOpen = true;
  }

  // Close the Edit Model modal
  closeEditModelModal(): void {
    this.isEditModalOpen = false;
  }

  // Update an existing model
  updateModel(form: NgForm): void {
    if (form.invalid || !this.selectedModel) return;

    const modelId = this.selectedModel.modelId;
    this.modelService.updateModel(modelId, this.selectedModel).subscribe(
      (updatedModel) => {
        const index = this.models.findIndex((m) => m.modelId === modelId);
        if (index > -1) {
          this.models[index] = updatedModel;
        }
        this.closeEditModelModal();
      },
      (error) => {
        console.error('Error updating model:', error);
      }
    );
  }

  // Delete a model
  deleteModel(model: Model): void {
    const confirmation = confirm(
      `Are you sure you want to delete the model "${model.modelName}"?`
    );
    if (!confirmation) return;

    this.modelService.deleteModel(model.modelId).subscribe(
      () => {
        this.models = this.models.filter((m) => m.modelId !== model.modelId);
      },
      (error) => {
        console.error('Error deleting model:', error);
      }
    );
  }
}
