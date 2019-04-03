import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { getStyle, hexToRgba } from '@coreui/coreui/dist/js/coreui-utilities';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';

import { DashboardService } from './dashboard.service';
import { ITrendingOrg } from '../model/ITrendingOrg';
import { ITrendingAssociate } from '../model/ITrendingAssociate';
import { ILatestEvents } from '../model/ILatestEvents';

@Component({
  templateUrl: 'dashboard.component.html'
})
export class DashboardComponent implements OnInit {

  // Chart variables
  dataArray: Array<any> = [];
  public barChartLabels: string[] = ['Top 5 Organisations'];
  public barChartType = 'bar';
  public barChartLegend = true;

  barChartData: Array<any> = [{ data: '', label: '' },
  { data: '', label: '' },
  { data: '', label: '' },
  { data: '', label: '' }];

  // Grid variables
  rowDataDef = [];

  paginationPageSize = 5;

  DefColumnDefs = [
    { headerName: 'User', field: 'volunteerName',width: 200,  cellStyle: { 'font-size': '15px' } },
    { headerName: 'Organization Name', field: 'org_name',width: 200, cellStyle: { 'font-size': '15px' } },
    { headerName: 'Hours spent', field: 'timePeriod',width:135,  cellStyle: { 'font-size': '15px' } }
  ];

  // Event list
  eventList = [];

  constructor(public dashboardService: DashboardService) {
    this.dashboardService.getTrendingOrganisations().subscribe((response: ITrendingOrg[]) => {
      console.log(response);
      this.dataArray = [];
      for (let i = 0; i < response.length; i++) {
        var array: any[] = [];
        array.push(response[i].timePeriod);
        let newItem = {
          data: array,
          label: response[i].organizationName
        };
        this.dataArray.push(newItem);

      }
      this.barChartData = this.dataArray;
      console.log("Data array ", this.dataArray);
    });

    this.dashboardService.getTrendingAssociates().subscribe((response: ITrendingAssociate[]) => {
      console.log("Trending Associates: ", response);
      this.rowDataDef = response;
    });

    this.dashboardService.getOpenRequests().subscribe((response: ILatestEvents[]) => {
      console.log(response);
      this.eventList = response;
    });

  }

  ngOnInit() {
    // this.dashboardService.getOpenRequests().subscribe((data: {}) => {
    //   console.log(data);
    // });
  }

  trendingOrg: ITrendingOrg[];

  // barChart
  public barChartOptions: any = {
    tooltips: {
      enabled: false,
      custom: CustomTooltips
    },
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      xAxes: [{
        display: true,
        //barPercentage: 0.6,
      }],
      yAxes: [{
        ticks: {
          beginAtZero: true,
          steps: 5,
          stepValue: 10,
          max: 30
        }
      }]
    },
    legend: {
      display: true
    }
  };

}
