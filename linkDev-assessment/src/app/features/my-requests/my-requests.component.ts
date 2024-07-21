import { Component, OnInit } from '@angular/core';
import { RequestsService } from './services/requests.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import {NgFor } from '@angular/common';
import { DateOnlyPipe } from "../../shared/pipe/date-only.pipe";


@Component({
  selector: 'app-my-requests',
  standalone: true,
  imports: [ReactiveFormsModule, NgxPaginationModule, NgFor, DateOnlyPipe],
  templateUrl: './my-requests.component.html',
  styleUrl: './my-requests.component.scss'
})
export class MyRequestsComponent  implements OnInit {
  requests: any[] = [];
  statuses: any[] = [];
  filteredRequests: any[] = [];
  filterForm: FormGroup;
  p: number = 1;
  itemsPerPage: number = 5;

  constructor(private requestsService: RequestsService, private fb: FormBuilder) {
    this.filterForm = this.fb.group({
      requestNumber: [''],
      requestStatus: [''],
      submissionDateFrom: [''],
      submissionDateTo: ['']
    });
  }

  ngOnInit(): void {
    this.requestsService.getRequests().subscribe(data => {
      this.requests = data.requestModel;
      this.filteredRequests = this.requests;
    });

    this.requestsService.getRequestStatuses().subscribe(data => {
      this.statuses = data;
      console.log(this.statuses);
    });
  }

  onFilter() {
    const { requestNumber, requestStatus, submissionDateFrom, submissionDateTo } = this.filterForm.value;
    this.filteredRequests = this.requests.filter(request => {
      const status = this.statuses.find(s => s.statusName === requestStatus);
      return (!requestNumber || request.requestNumber.includes(requestNumber)) &&
      (!requestStatus || (status && request.requestStatus === status.statusId)) &&
      (!submissionDateFrom || new Date(request.requestSubmissionDate) >= new Date(submissionDateFrom)) &&
      (!submissionDateTo || new Date(request.requestSubmissionDate) <= new Date(submissionDateTo));
    });
  }

  clearFilter() {
    this.filterForm.reset();
    this.filteredRequests = this.requests; // Reset filtered requests to the original list
  }

  getStatusName(statusCode: string): string {
    const status = this.statuses.find(s => s.statusId === statusCode);
    return status ? status.statusName : 'Unknown';
  }
}