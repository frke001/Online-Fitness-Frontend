import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from "@angular/core";

import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexTitleSubtitle,
  NgApexchartsModule,
  ApexFill,
  ApexStroke,
} from "ng-apexcharts";
import { ClientService } from "../services/client/client.service";

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  title: ApexTitleSubtitle;
  fill: ApexFill;
  stroke: ApexStroke;
  colors: string[];
};

@Component({
  selector: 'app-area-chart',
  standalone: true,
  imports: [NgApexchartsModule],
  templateUrl: './area-chart.component.html',
  styleUrl: './area-chart.component.css'
})
export class AreaChartComponent implements OnChanges{
  @ViewChild("chart") chart!: ChartComponent;
  public chartOptions: any;

  @Input("xAxis") 
  xAxis: Array<any> = [];
  @Input("yAxis") 
  yAxis: Array<any> = [];

  ngOnChanges(changes: SimpleChanges): void {
    
    if(changes['xAxis'] || changes['yAxis']){
      console.log("usao da setam");
      console.log(this.xAxis);
      console.log(this.yAxis);
      
      
      this.chartOptions = {
        ...this.chartOptions,
        series: [
          {
            name: "My weight",
            data: this.yAxis,
          }
        ],
    
        xaxis: {
          categories: this.xAxis,
          type: "string",
          labels: {
            style: {
              fontSize: '15px',
              fontWeight: '500'
            }
          }
        },
      };
    }

  }
  constructor(private clientService:ClientService) {
    console.log("konstruktor");
    
    this.chartOptions = {
      series: [
        {
          name: "My weight",
          data: [],
        }
      ],
      chart: {
        height: 400,
        type: "area",
        fontFamily: "Roboto",
        toolbar:{
          show: false
        }
      },
      title: {
        text: "My weight progress",
        style: {
          fontSize: '25px',
          fontWeight: '500'
        }
      },
      xaxis: {
        categories: [],
        type: "string",
        labels: {
          style: {
            fontSize: '15px',
            fontWeight: '500'
          }
        }
      },
      fill: {
        colors: ['#4452a2', '#7067cf', '#8f7ceb', '#a895f5', '#c3afff']
      },
      stroke: {
        curve: "smooth"
      },
      colors: ["#8f7ceb"]
    };

    
  }
  // ngOnInit(): void {
  //   this.clientService.getProgressChartValues().subscribe({
  //     next: (data) => {
  //       this.xAxis = data.xaxis;
  //       this.yAxis = data.yaxis;  
  //       this.chartOptions = {
  //         series: [
  //           {
  //             name: "My weight",
  //             data: this.yAxis,
  //           }
  //         ],
  //         chart: {
  //           height: 400,
  //           type: "area",
  //           fontFamily: "Roboto",
  //           toolbar:{
  //             show: false
  //           }
  //         },
  //         title: {
  //           text: "My weight progress",
  //           style: {
  //             fontSize: '25px',
  //             fontWeight: '500'
  //           }
  //         },
  //         xaxis: {
  //           categories: this.xAxis,
  //           type: "string",
  //           labels: {
  //             style: {
  //               fontSize: '15px',
  //               fontWeight: '500'
  //             }
  //           }
  //         },
  //         fill: {
  //           colors: ['#4452a2', '#7067cf', '#8f7ceb', '#a895f5', '#c3afff']
  //         },
  //         stroke: {
  //           curve: "smooth"
  //         },
  //         colors: ["#8f7ceb"]
  //       };
        
  //     },
  //     error: (err) => {
       
  //     }
  //   })
  // }

  // updateChart(){
  //   this.clientService.getProgressChartValues().subscribe({
  //     next: (data) => {
  //       this.xAxis = data.xaxis;
  //       this.yAxis = data.yaxis;  
  //       this.chartOptions = {
  //         series: [
  //           {
  //             name: "My weight",
  //             data: this.yAxis,
  //           }
  //         ],
  //         chart: {
  //           height: 400,
  //           type: "area",
  //           fontFamily: "Roboto",
  //           toolbar:{
  //             show: false
  //           }
  //         },
  //         title: {
  //           text: "My weight progress",
  //           style: {
  //             fontSize: '25px',
  //             fontWeight: '500'
  //           }
  //         },
  //         xaxis: {
  //           categories: this.xAxis,
  //           type: "string",
  //           labels: {
  //             style: {
  //               fontSize: '15px',
  //               fontWeight: '500'
  //             }
  //           }
  //         },
  //         fill: {
  //           colors: ['#4452a2', '#7067cf', '#8f7ceb', '#a895f5', '#c3afff']
  //         },
  //         stroke: {
  //           curve: "smooth"
  //         },
  //         colors: ["#8f7ceb"]
  //       };
        
  //     },
  //     error: (err) => {
       
  //     }
  //   })
  // }
}


