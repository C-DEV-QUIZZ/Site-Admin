import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Cookie } from 'ng2-cookies';
import { AjaxService } from './service/ajax.service';


@Injectable()
export class Globals {

    constructor(private router: Router,public ajaxService: AjaxService){}

    public static COOKIE_NAME:string = "Zz3Qu177";

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

            this.ajaxService.postifUserAuthorizedToNavigate(cookie).subscribe(
                (responseBody) => {
                    autorise = Boolean(responseBody);
                },
                (error)=>{
                    this.router.navigate(['/connexion']);
                    return;
                });
        }
    }

}