import { Observable } from 'rxjs';
import { Injectable } from '@angular/core'
import { HttpClient, HttpParams} from '@angular/common/http';


@Injectable({
    providedIn: 'root'
})
export class AjaxService{


    // private adresse= "http://localhost:6969/" //local
    private adresse= "https://quizz.servehttp.com/" // distante

    private http:HttpClient;
    
    constructor(http:HttpClient){
        this.http=http;
    }
    
    private urlConnexion = this.adresse+"administrateurs/connexion"

    private urlInscription= this.adresse+"administrateurs/inscription"

    private urlConfirmInscription = this.adresse+"administrateurs/confirmationInscription"

    private urlIfUserAuthorizedToNavigate = this.adresse+"administrateurs/authorized"   

    private urlModeInscriptionSiteAdmin = this.adresse+"parametres/InscriptionSiteAdmin"

    private urlGetAllQuestions = this.adresse +"questions/getall"

    private urlCreateQuestion = this.adresse + "questions/create"

    
    getModeInscriptionSiteAdmin(){
        return this.http.get(this.urlModeInscriptionSiteAdmin);
    }

    getAllQuestion(){
        return this.http.get(this.urlGetAllQuestions);
    }

    postCreateQuestion(data){
        // envoyer la token.
        console.log(data);
        return this.http.post(this.urlCreateQuestion, data);
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