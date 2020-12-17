import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AjaxService } from '../service/ajax.service';

@Component({
    selector: 'app-confirmation-inscription',
    templateUrl: './confirmation-inscription.component.html',
    styleUrls: ['./confirmation-inscription.component.css']
})
export class ConfirmationInscriptionComponent implements OnInit {


    isInscriptionConfirm = false;
    message;

    constructor(public ajaxService: AjaxService,private router: Router,private activatedRoute: ActivatedRoute) { }

    ngOnInit(): void {
        this.activatedRoute.queryParams.subscribe(params => {
        // Defaults to 0 if no query param provided.
            this.message = params['msg'];
      });
    }

}
