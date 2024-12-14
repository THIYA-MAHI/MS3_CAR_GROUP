import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appHasRole]',
})
export class HasRoleDirective {
  private currentRole: string = '';

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef
  ) {}

  @Input() set appHasRole(role: string) {
    this.currentRole = role;
    this.updateView();
  }

  private updateView() {
    const role = localStorage.getItem('Role'); // Retrieve role from local storage
    if (role === this.currentRole) {
      this.viewContainer.createEmbeddedView(this.templateRef); // Show the content
    } else {
      this.viewContainer.clear(); // Hide the content
    }
  }
}
