import { Component, OnInit } from '@angular/core';
import { Globals } from '../global';

@Component({
  selector: 'app-creation',
  templateUrl: './creation.component.html',
  styleUrls: ['./creation.component.css']
})
export class CreationComponent implements OnInit {

  constructor(private globals:Globals) { }

  ngOnInit(): void {
    this.globals.ifAdminIsConnect();
  }

}
