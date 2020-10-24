import { NgModule } from '@angular/core';
import { NbCardModule, NbSelectModule, NbTabsetModule } from '@nebular/theme';

import { ThemeModule } from '../../theme/theme.module';
import { DashboardComponent } from './dashboard.component';
import { StatusCardComponent } from './status-card/status-card.component';
import { ECommerceChartsPanelComponent } from './charts-panel/charts-panel.component';
import { ChartPanelHeaderComponent } from './charts-panel/chart-panel-header/chart-panel-header.component';
import { ChartPanelSummaryComponent } from './charts-panel/chart-panel-summary/chart-panel-summary.component';
import { OrdersChartComponent } from './charts-panel/charts/orders-chart.component';
import { ProfitChartComponent } from './charts-panel/charts/profit-chart.component';
import { ECommerceLegendChartComponent } from './charts-panel/legend-chart/legend-chart.component';
import { NgxEchartsModule } from 'ngx-echarts';

@NgModule({
  imports: [
    NbSelectModule,
    NbTabsetModule,
    NbCardModule,
    ThemeModule,
    NgxEchartsModule,
  ],
  declarations: [
    DashboardComponent,
    StatusCardComponent,
    ECommerceChartsPanelComponent,
    ChartPanelHeaderComponent,
    ChartPanelSummaryComponent,
    OrdersChartComponent,
    ProfitChartComponent,
    ECommerceLegendChartComponent,
  ],
})
export class DashboardModule { }
