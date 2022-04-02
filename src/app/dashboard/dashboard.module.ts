import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { GiphyItemComponent } from './components/giphy-item/giphy-item.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [DashboardComponent, GiphyItemComponent],
  imports: [CommonModule, ReactiveFormsModule, NgbPaginationModule],
  exports: [DashboardComponent],
})
export class DashboardModule {}
