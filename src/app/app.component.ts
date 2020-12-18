import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Cookie } from 'ng2-cookies';
import { Globals } from './global';
import { AjaxService } from './service/ajax.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
    title = 'administrationSite';
    constructor( ){}

    ngOnInit(): void {}


}
