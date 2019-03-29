import { Component, OnDestroy, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { schoolNavItems } from '../../_schoolnav';
import { navItems } from '../../_nav';
import { Router, Event, NavigationEnd, GuardsCheckStart } from '@angular/router';


@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html'
})
export class DefaultLayoutComponent implements OnDestroy {
  public schoolNavItems = schoolNavItems;
  public username: String;
  public navItems = navItems;
  public sidebarMinimized = true;
  private changes: MutationObserver;
  public element: HTMLElement;
  public schoolRole: boolean = false;
  constructor(private router: Router, @Inject(DOCUMENT) _document?: any) {

    this.changes = new MutationObserver((mutations) => {
      this.sidebarMinimized = _document.body.classList.contains('sidebar-minimized');
    });
    this.element = _document.body;
    this.changes.observe(<Element>this.element, {
      attributes: true,
      attributeFilter: ['class']
    });
    this.router.events.subscribe(
      (event: Event) => {
        if (event instanceof NavigationEnd) {
          console.log("LocalStorage ", localStorage.getItem('Role'));
          if (localStorage.getItem('Role') === 'school') {
            this.schoolRole = true;
            console.log("role is school");
          }
          else
          this.schoolRole = false;
          console.log("Next point");
        }
      });
  }

  ngOnInit() {

    
  }

  ngOnDestroy(): void {
    this.changes.disconnect();
  }
}
