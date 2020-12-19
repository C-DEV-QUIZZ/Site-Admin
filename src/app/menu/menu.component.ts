import { Component, OnInit } from '@angular/core';
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

  global :Globals
  
  ngOnInit(): void {

  }

}
