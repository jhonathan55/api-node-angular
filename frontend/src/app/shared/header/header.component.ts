import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  //even.. class de angular que nos permite crear un metodo personalizado

  @Output() toggleSidenav = new EventEmitter<void>();

  private destroy$ =new Subject<any>();

  isLogged = false;
  isAdmin = null;
 
  constructor(
    private authSvc: AuthService
  ) { }

  ngOnInit(): void {

      this.authSvc.isLogged.pipe(
        takeUntil(this.destroy$)
      )
      .subscribe((res) => (this.isLogged = res))


      this.authSvc.isAdmin$.pipe(
        takeUntil(this.destroy$)
      )
      .subscribe(res=>this.isAdmin=res)

  }
  ngOnDestroy(): void {
      
      this.destroy$.next({});
      this.destroy$.complete();
  }
  onToggleSidenav() {
    this.toggleSidenav.emit();
  }

  onLogout(): void {
    this.authSvc.logout()
  }

}
