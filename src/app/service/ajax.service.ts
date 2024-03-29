import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Injectable({
    providedIn: 'root'
})
export class AjaxService{

    public adresse= environment.adresse;

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

    private urlGetAllParametres = this.adresse + "parametres/getall"

    private urlUpdateAllParametres = this.adresse + "parametres/update"

    private urlinfosHeaders = this.adresse + "infos/headers"

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

    getAllParametres(){
        return this.http.get(this.urlGetAllParametres);
    }
    UpdateParametres(data){
        return this.http.put(this.urlUpdateAllParametres,data);
    }

    testUrl(){
        var t="sfdsf351sdfgé%";
        let headers = new HttpHeaders();
        headers = headers.set("Authorization", "Bearer " + t);
    return this.http.post(this.urlinfosHeaders, {headers: headers})
    }
}