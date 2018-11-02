import { Component, EventEmitter, Output } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'nologig-controls',
  templateUrl: './controls.component.html',
  styleUrls: ['./controls.component.scss'],
})
export class ControlsComponent {

  @Output() public openedNavigation = new EventEmitter<boolean>();
  @Output() public openedSettings = new EventEmitter<boolean>();

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  constructor(private breakpointObserver: BreakpointObserver) {}

  public openSettings() {
    this.openedSettings.emit();
  }
  public openNavigation() {
    this.openedNavigation.emit();
  }
}
