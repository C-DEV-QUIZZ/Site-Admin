import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Cookie } from 'ng2-cookies';
import { AjaxService } from './service/ajax.service';
declare let toastr : any;

@Injectable()
export class Globals {

    constructor(private router: Router,public ajaxService: AjaxService){}

    public static COOKIE_NAME:string = "Zz3Qu177";
    public static COMPTE_STRING:string = "compte";
    public static CONNEXION_STRING:string = "connexion";


    libelle_compte= Cookie.get(Globals.COOKIE_NAME) ? `compte`:"connexion";

    // todo si reviens sur le site 
    //Compte: string = Cookie.get(COOKIE_NAME) ? `Gestion de compte`:"Compte";


    public validateEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    public isEmptyOrSpaces(str){
        if(str===undefined)
            return true;
        return str === null || str.match(/^ *$/) !== null || str.trim()== "" || str.trim().length==0;
    }

    public ifStringRespectcaracterNb(str,min,max)
    {
        if (str.length < min || str.length > max){
            return false;
        }
        return true;
    }
    

    public ifAdminIsConnect(){
        let isConnect = Cookie.get(Globals.COOKIE_NAME) ? true:false;
        if(!isConnect)
        {
            this.router.navigate(['/connexion']);
            return;
        }
        else{
            let autorise:Boolean = false;

            let cookie = Cookie.get(Globals.COOKIE_NAME);

            this.ajaxService.postifUserAuthorized(cookie).subscribe(
                (responseBody) => {
                    autorise = Boolean(responseBody);
                },
                (error)=>{

                    toastr.error(`Erreur critique :<br> <small class="text-ultralight">${error.error}</small>`,"",{
                        "closeButton": false,
                        "debug": false,
                        "newestOnTop": true,
                        "progressBar": true,
                        "positionClass": "toast-top-right",
                        "preventDuplicates": false,
                        "onclick": null,
                        "showDuration": "300",
                        "hideDuration": "1000",
                        "timeOut": "5000",
                        "extendedTimeOut": "1000",
                        "showEasing": "swing",
                        "hideEasing": "linear",
                        "showMethod": "fadeIn",
                        "hideMethod": "fadeOut"
                    });
                    Cookie.deleteAll();
                    this.libelle_compte = Globals.CONNEXION_STRING;    
                    this.router.navigate(['/connexion']);
                    return;
                });
        }
    }

}