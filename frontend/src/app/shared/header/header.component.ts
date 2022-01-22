import { Component, OnInit, Output,EventEmitter } from '@angular/core';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Output() toggleSidenav=new EventEmitter<void>();


  isAdmin=false;

  constructor() { }

  ngOnInit(): void {
  }

  onToggleSidenav(){
    this.toggleSidenav.emit();
  }

}
