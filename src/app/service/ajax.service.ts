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
    
    private urlUtilisateurs = this.adresse+"utilisateurs"

    private urlConnexion = this.adresse+"utilisateurs/connexion"

    private urlInscription= this.adresse+"utilisateurs/inscription"

    private urlConfirmInscription = this.adresse+"utilisateurs/confirmationInscription"

    getUtilisateurs(){
        return this.http.get(this.urlUtilisateurs);
    }

    getConfirmInscription(data){
        return this.http.post(this.urlConfirmInscription,data, {responseType:'text'});
    }

    postConnexion(data:Object){
        return this.http.post(this.urlConnexion,data);
    }
    postInscription(data:Object){
        return this.http.post(this.urlInscription,data);
    }


}