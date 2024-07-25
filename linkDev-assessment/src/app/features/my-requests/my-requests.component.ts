import { Component, OnInit } from '@angular/core';
import { RequestsService } from './services/requests.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgFor, DatePipe } from '@angular/common';
import { DateOnlyPipe } from '../../shared/pipe/date-only.pipe';
import { DateNoTimePipe } from '../../shared/pipe/date-no-time.pipe';
import { SidebarComponent } from '../../core/layout/sidebar/sidebar.component';

@Component({
  selector: 'app-my-requests',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgxPaginationModule,
    NgFor,
    DateOnlyPipe,
    DateNoTimePipe,
    SidebarComponent,
  ],
  templateUrl: './my-requests.component.html',
  styleUrl: './my-requests.component.scss',
  providers: [DatePipe],
})
export class MyRequestsComponent implements OnInit {
  requests: any[] = [];
  statuses: any[] = [];
  filteredRequests: any[] = [];
  filterForm: FormGroup;
  p: number = 1;
  itemsPerPage: number = 5;

  constructor(
    private requestsService: RequestsService,
    private fb: FormBuilder
  ) {
    this.filterForm = this.fb.group({
      requestNumber: [''],
      requestStatus: [''],
      submissionDateFrom: [''],
      submissionDateTo: [''],
    });
  }

  ngOnInit(): void {
    this.requestsService.getRequests().subscribe((data) => {
      this.requests = data.requestModel;
      this.sortAndFilterRequests();
    });

    this.requestsService.getRequestStatuses().subscribe((data) => {
      this.statuses = data;
      console.log(this.statuses);
    });
  }

  onFilter() {
    this.sortAndFilterRequests();
  }

  clearFilter() {
    this.filterForm.reset();

    this.sortAndFilterRequests();
  }

  private sortAndFilterRequests() {
    const {
      requestNumber,
      requestStatus,
      submissionDateFrom,
      submissionDateTo,
    } = this.filterForm.value;

    this.filteredRequests = this.requests.filter((request) => {
      const matchesNumber =
        !requestNumber || request.requestNumber.includes(requestNumber);
      const matchesStatus =
        !requestStatus ||
        this.statuses.find((s) => s.statusName === requestStatus)?.statusId ===
          request.requestStatus;
      const matchesDateFrom =
        !submissionDateFrom ||
        this.getDateWithoutTime(request.requestSubmissionDate) >=
          this.getDateWithoutTime(submissionDateFrom);
      const matchesDateTo =
        !submissionDateTo ||
        this.getDateWithoutTime(request.requestSubmissionDate) <=
          this.getDateWithoutTime(submissionDateTo);

      return matchesNumber && matchesStatus && matchesDateFrom && matchesDateTo;
    });

    this.filteredRequests.sort((a, b) => {
      const dateA = this.getDateWithoutTime(a.requestSubmissionDate);
      const dateB = this.getDateWithoutTime(b.requestSubmissionDate);
      return dateB.getTime() - dateA.getTime();
    });
  }

  private getDateWithoutTime(dateString: string): Date {
    const date = new Date(dateString);
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
  }

  getStatusName(statusCode: string): string {
    const status = this.statuses.find((s) => s.statusId === statusCode);
    return status ? status.statusName : 'Unknown';
  }
}
