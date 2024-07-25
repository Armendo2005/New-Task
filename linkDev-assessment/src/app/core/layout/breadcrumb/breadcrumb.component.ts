import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, RouterLink } from '@angular/router';
import { filter } from 'rxjs/operators';

interface Breadcrumb {
  label: string;
  url: string;
}
@Component({
  selector: 'app-breadcrumb',
  standalone: true,
  imports: [NgFor, NgIf, RouterLink],
  templateUrl: './breadcrumb.component.html',
  styleUrl: './breadcrumb.component.scss'
})
export class BreadcrumbComponent  implements OnInit {
  breadcrumbs: Breadcrumb[] = [];

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.breadcrumbs = this.createBreadcrumbs(this.router.url);
    });
  }

  createBreadcrumbs(url: string): Breadcrumb[] {
    const breadcrumbs: Breadcrumb[] = [];
    const segments = url.split('/').filter(segment => segment);

    if (segments.length) {
      breadcrumbs.push({ label: 'Home', url: '/' });
    }

    let currentUrl = '';
    segments.forEach(segment => {
      currentUrl += `/${segment}`;
      breadcrumbs.push({ label: segment, url: currentUrl });
    });

    return breadcrumbs;
  }
}