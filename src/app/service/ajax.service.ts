import { Observable } from 'rxjs';
import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';


@Injectable({
    providedIn: 'root'
})
export class AjaxService{


    private adresse= "http://localhost:6969/" //local
    // private adresse= "https://quizz.servehttp.com/" // distante

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

    private urlUpdateQuestion = this.adresse + "questions/update"

    private urlDeleteQuestion = this.adresse + "questions/delete"

    updateQuestion(data){
        let headers = new HttpHeaders();
            headers = headers.set('Content-Type', 'application/json; charset=utf-8');
        return this.http.put(this.urlUpdateQuestion, data,{headers: headers})
    }

    deleteQuestion(id){
        return this.http.delete(this.urlDeleteQuestion+`/${id}`);
    }
    
    getModeInscriptionSiteAdmin(){
        return this.http.get(this.urlModeInscriptionSiteAdmin);
    }

    getAllQuestion(){
        return this.http.get(this.urlGetAllQuestions);
    }

    postCreateQuestion(data){
        // envoyer la token.
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