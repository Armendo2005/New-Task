import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgFor, NgIf } from '@angular/common';
import { SidebarComponent } from "../../core/layout/sidebar/sidebar.component";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-workspace',
  standalone: true,
  imports: [NgFor, NgIf, SidebarComponent, RouterLink],
  templateUrl: './workspace.component.html',
  styleUrl: './workspace.component.scss'
})
export class WorkspaceComponent  implements OnInit {
  inProgressRequestsCount: number = 0;
  pendingTasksCount: number = 0;
  latestRequests: any[] = [];
  requestStatus: any[] = [];

  private readonly dashboardUrl = 'https://api.npoint.io/287f15da7aaf2d316683/data';
  private readonly statusUrl = 'https://api.npoint.io/0d1ae6c75a16d8886e30/data/requeststatus';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadDashboardData();
    this.loadRequestStatus();
  }

  private loadDashboardData(): void {
    this.http.get<any>(this.dashboardUrl).subscribe(data => {
      console.log('Dashboard Data:', data); 
      this.inProgressRequestsCount = data.inProgressRequestsCount || 0;
      this.pendingTasksCount = data.pendingTasksCount || 0;
      this.latestRequests = data.requestModel.slice(0, 5); // Get top 5 latest requests
    });
  }

  private loadRequestStatus(): void {
    this.http.get<any>(this.statusUrl).subscribe(data => {
      this.requestStatus = data;
      console.log('DATA STATUS:',this.requestStatus);
    });
  }

  getStatusName(statusCode: string): string {
    const status = this.requestStatus.find(s => s.statusId === statusCode);
    return status ? status.statusName : 'Unknown';
  }
}