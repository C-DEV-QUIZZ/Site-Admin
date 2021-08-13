import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Globals } from '../global';
import { AjaxService } from '../service/ajax.service';
declare let toastr :any;
declare let Metro:any;
@Component({
    selector: 'app-creation',
    templateUrl: './creation.component.html',
    styleUrls: ['./creation.component.css']
})
export class CreationComponent implements OnInit {


    constructor(private globals: Globals,public ajaxService: AjaxService) { }

    levelDifficulte ="2";
    questionTexte:string;
    bonneReponse:string;
    reponsesArray : Array<String> =  [];
    nbPoint="10";
    isMulti= "1";

    ngOnInit(): void {
        this.globals.ifAdminIsConnect();
    }

    // clique sur le bouton ajout réponse
    addInputReponse(e){

        let inputAddReponse= e.previousSibling;

        if (this.globals.if_Undefind_EmptyOrSpaces(inputAddReponse.value)){
            this.globals.PrintMessage("messageInformationReponse","Veuillez renseigner un texte pour la réponse");
            return;
        }

        this.reponsesArray.push(inputAddReponse.value);
        inputAddReponse.value="";
    }

    // clique sur la croix rouge d'une réponse
    deleteInputReponse(i){
        this.reponsesArray.splice(i,1);
    }

    // lorsque l'on change la valeur du nombre de point
    changeNumber(e){
        if(e>20)
            e=20
        if(e<1)
            e=1
        this.nbPoint = e;
    }

    // Quand on click sur enregistrer
    onClickSubmit() {

        if(this.globals.if_Undefind_EmptyOrSpaces(this.questionTexte)){
            this.globals.PrintMessage("messageInformation","Veuillez renseigner la question svp!");
            return;
        }

        if(this.reponsesArray.length<2){
            this.globals.PrintMessage("messageInformation","Veuillez renseigner au minimum deux réponses svp!");
            return;
        }        

        if(this.globals.if_Undefind_EmptyOrSpaces(this.bonneReponse)){
            this.globals.PrintMessage("messageInformation","Veuillez renseigner la bonne réponse svp!");
            return;
        }

        let  httpParams = new HttpParams()
        .append("question", this.questionTexte)
        .append("difficulte",this.levelDifficulte)
        .append("points",this.nbPoint)
        .append("bonneReponse",this.bonneReponse)
        .append("reponses",this.reponsesArray.toLocaleString())
        .append("isMulti",this.isMulti);

        this.ajaxService.postCreateQuestion(httpParams).subscribe( 
        
            (response) => {                           //Next callback
                Metro.infobox.create(`
                <h3>ENREGISTREMENT OK!</h3>
                <p>La page va recharger dans 2s...</p>`, "success");
                setTimeout(()=>{
                    document.location.reload();
                },2000);
        },
            (error) => { 
                Metro.infobox.create(`
                <h3>ERREUR LORS DE L'ENREGISTREMENT DE LA QUESTION!</h3>
                <small class="text-ultralight">${error.error}</small>`, "alert");       
        })
    }

}
