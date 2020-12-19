import { Observable } from 'rxjs';
import { Injectable } from '@angular/core'
import { HttpClient} from '@angular/common/http';


@Injectable({
    providedIn: 'root'
})
export class AjaxService{


    private adresse= "http://localhost:6969/" //local
    // adresse= "https://quizz.servehttp.com//" // distante

    private http:HttpClient;
    
    constructor(http:HttpClient){
        this.http=http;
    }
    
    private urlConnexion = this.adresse+"administrateurs/connexion"

    private urlInscription= this.adresse+"administrateurs/inscription"

    private urlConfirmInscription = this.adresse+"administrateurs/confirmationInscription"

    private urlIfUserAuthorizedToNavigate = this.adresse+"administrateurs/authorized"   

    private urlModeInscriptionSiteAdmin = this.adresse+"parametres/InscriptionSiteAdmin"



    
    getModeInscriptionSiteAdmin(){
        return this.http.get(this.urlModeInscriptionSiteAdmin);
    }

    postConfirmInscription(data){
        return this.http.post(this.urlConfirmInscription,data, {responseType:'text'});
    }

    postConnexion(data:Object){
        return this.http.post(this.urlConnexion,data);
    }
    postInscription(data:Object){
        return this.http.post(this.urlInscription,data);
    }

    postifUserAuthorized(data){
        return this.http.post(this.urlIfUserAuthorizedToNavigate,data);
    }

}