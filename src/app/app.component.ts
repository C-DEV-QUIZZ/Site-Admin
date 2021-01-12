import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Cookie } from 'ng2-cookies';
import { environment } from 'src/environments/environment';
import { Globals } from './global';
import { AjaxService } from './service/ajax.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
    title = 'administrationSite';

    ngOnInit(): void {}
    public constructor(private titleService: Title) { 
        titleService.setTitle(environment.NomSite);
    }



}
