import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Globals } from '../global';
import { AjaxService } from '../service/ajax.service';
declare let toastr :any;

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
        console.log(e)
        if(e>20)
            e=20
        if(e<1)
            e=1
        this.nbPoint = e;
    }

    // Quand on click sur enregistrer
    onClickSubmit() {

        if(this.globals.if_Undefind_EmptyOrSpaces(this.questionTexte)){
            this.globals.PrintMessage("messageInformation","Veuillez renseigner la question");
            return;
        }

        if(this.reponsesArray.length==0){
            this.globals.PrintMessage("messageInformation","Veuillez renseigner au minimum une réponse");
            return;
        }        

        if(this.globals.if_Undefind_EmptyOrSpaces(this.bonneReponse)){
            this.globals.PrintMessage("messageInformation","Veuillez renseigner la bonne réponse");
            return;
        }

        let  httpParams = new HttpParams()
        .append("question", this.questionTexte)
        .append("difficulte",this.levelDifficulte)
        .append("points",this.nbPoint)
        .append("bonneReponse",this.bonneReponse)
        .append("reponses",this.reponsesArray.toLocaleString());

        this.ajaxService.postCreateQuestion(httpParams).subscribe( 
        
            (response) => {                           //Next callback
                toastr.success("ok", "creation question Ok", {
                    "closeButton": false,
                    "debug": false,
                    "newestOnTop": false,
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
        },
            (error) => {                              //Error callback
                toastr.error(`Erreur lors de l'enregistrement de la question :<br> <small class="text-ultralight">${error.error}</small>`, "", {
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
        })
    }

}
