import { Component, OnInit } from '@angular/core';
import { Cookie } from 'ng2-cookies';
import { environment } from 'src/environments/environment';
import { Globals } from '../global';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(private globals: Globals) { 
    this.global = globals;
  }
  
  version = environment.production ? environment.appVersion : null;

  global :Globals
  
  ngOnInit(): void {

  }

}
