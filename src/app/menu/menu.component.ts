import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Globals } from '../global';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {


  version = environment.production ? environment.appVersion : null;

  constructor(private globals: Globals) { 
    this.global = globals;
  }

  global :Globals
  
  ngOnInit(): void {

  }

}
