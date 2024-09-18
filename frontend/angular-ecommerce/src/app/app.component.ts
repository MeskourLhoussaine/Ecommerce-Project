import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-ecommerce';

  @ViewChild('sidebar') sidebar!: ElementRef;

  toggleMenu() {
    const sidebarElement = this.sidebar.nativeElement;
    sidebarElement.classList.toggle('show');
  }
}
