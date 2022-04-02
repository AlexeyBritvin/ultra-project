import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { GiphyItemComponent } from './components/giphy-item/giphy-item.component';

@NgModule({
  declarations: [DashboardComponent, GiphyItemComponent],
  imports: [CommonModule],
  exports: [DashboardComponent],
})
export class DashboardModule {}
