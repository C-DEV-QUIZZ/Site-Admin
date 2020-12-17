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
    isConnect:boolean;

    route;
    constructor(private router: Router,private activatedRoute: ActivatedRoute, public ajaxService: AjaxService ){

    }

    ngOnInit(): void {

        // si on viens d'un mail d'inscription
        this.router.events.subscribe(e => {
            if (e instanceof NavigationEnd) {
                if(e.url. includes("/confirmationInscription?Zz3Qu177")){

                    this.activatedRoute.queryParams.subscribe(params => {

                        // recupère le token de l'url:
                        let tokens = params[Globals.COOKIE_NAME];
                        
                        //et l'envoi pour à l'api pour le confirmer:
                        this.ajaxService.getConfirmInscription(tokens).subscribe(
                            (response) => {                           // confirmation inscription ok
                                Cookie.set(Globals.COOKIE_NAME,tokens) ;
                                this.router.navigate(['/confirmationInscription'],{ queryParams: { "connextionStatus":"true","msg" :"bienvenue" }});
                            },
                            (error) => {                              // déja inscrit ou pas encore inscrit
                                console.error(error.error)
                                this.router.navigate(['/confirmationInscription'],{ queryParams: { "connextionStatus":"false","msg" :error.error }});
                            }
                        );

                    })
                }
            }
        });


        // this.isConnect = Cookie.get(Globals.COOKIE_NAME) ? true:false;
        // if(!this.isConnect)
        // {
        //     this.router.navigate(['/connexion']);
        //     return;
        // }

    }


}
