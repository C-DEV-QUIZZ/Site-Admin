import { Component, OnInit } from '@angular/core';
import { Globals } from '../global';

@Component({
    selector: 'app-error',
    templateUrl: './error.component.html',
    styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit {

    constructor(private globals: Globals) { }

    ngOnInit(): void {
        this.globals.ifAdminIsConnect();
    }

}
