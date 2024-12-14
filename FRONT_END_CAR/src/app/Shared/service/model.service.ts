import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Model } from '../models/model'; // Import your model interface

@Injectable({
  providedIn: 'root',
})
export class ModelService {
  private apiUrl = 'http://localhost:5096/api/Model';

  constructor(private http: HttpClient) {}

  // Add a new model
  addModel(model: Omit<Model, 'modelId'>): Observable<Model> {
    return this.http.post<Model>(`${this.apiUrl}/AddModel`, model);
  }

  // Get a model by ID
  getModelById(modelId: string): Observable<Model> {
    return this.http.get<Model>(`${this.apiUrl}/${modelId}`);
  }

  // Get all models
  getAllModels(): Observable<Model[]> {
    return this.http.get<Model[]>(`${this.apiUrl}/AllModels`);
  }

  // Update a model by ID
  updateModel(modelId: string, model: Partial<Model>): Observable<Model> {
    return this.http.put<Model>(`${this.apiUrl}/UpdateModel/${modelId}`, model);
  }

  // Delete a model by ID
  deleteModel(modelId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/DeleteModel/${modelId}`);
  }
}
