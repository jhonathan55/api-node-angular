import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  //even.. class de angular que nos permite crear un metodo personalizado

  @Output() toggleSidenav = new EventEmitter<void>();

  isLogged = false;
  isAdmin = false;
  private subscription: Subscription = new Subscription;
  constructor(
    private authSvc: AuthService
  ) { }

  ngOnInit(): void {
    this.subscription?.add(
      this.authSvc.isLogged.subscribe((res) => (this.isLogged = res))
      );

  }
  ngOnDestroy(): void {
      this.subscription?.unsubscribe()
  }
  onToggleSidenav() {
    this.toggleSidenav.emit();
  }

  onLogout(): void {
    this.authSvc.logout()
  }

}
