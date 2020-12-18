import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Globals } from '../global';
import { AjaxService } from '../service/ajax.service';

@Component({
    selector: 'app-confirmation-inscription',
    templateUrl: './confirmation-inscription.component.html',
    styleUrls: ['./confirmation-inscription.component.css']
})
export class ConfirmationInscriptionComponent implements OnInit {


    isInscriptionConfirm = false;
    message;

    constructor(public ajaxService: AjaxService,private activatedRoute: ActivatedRoute) { }

    ngOnInit(): void {
        this.activatedRoute.queryParams.subscribe(params => {

            let tokens = params[Globals.COOKIE_NAME];

            this.ajaxService.postConfirmInscription(tokens).subscribe(
                (response) => {        
                    this.isInscriptionConfirm = true;      
                    this.message="Inscription confirmé! Vous pouvez à présent vous connecter";             
                },
                (error) => {                              
                    console.error(error.error)
                    this.message=error.error;     
                }
            );
        });
    }

}
