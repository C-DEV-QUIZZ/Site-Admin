import { Component, OnInit } from '@angular/core';
import { Globals } from '../global';
import { AjaxService } from '../service/ajax.service';
declare let toastr: any;

@Component({
    selector: 'app-questions',
    templateUrl: './questions.component.html',
    styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit {

    constructor(private globals: Globals, private ajaxService: AjaxService) { }

    questionsList;
    IdQuestionASupprimer;

    ngOnInit(): void {
        this.globals.ifAdminIsConnect();
    }

    GetAllQuestions(): any {
        this.ajaxService.getAllQuestion().subscribe(
            (response) => {
                var stringJson = JSON.stringify(response)
                var Json = JSON.parse(stringJson);
                this.questionsList = Json;
            },
            (error) => {
                let msgErreur = error.error;
                if (error.status == 0)
                    msgErreur = "Connexion à distance impossible"
                toastr.error(`Connexion impossible :<br> <small class="text-ultralight">${msgErreur}</small>`, "", {
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
            }
        );
    }

    changeNumber(e) {
        var iptPoints = e;
        if (iptPoints.value > 20)
            iptPoints.value = 20;
        if (iptPoints.value < 1)
            iptPoints.value = 1;
    }

    EnableDisableBLoc(button,questionId): any {
        var blocQuestion = button.parentNode;
        var BlocMode= document.getElementById("divMode"+questionId);
        var blocReponse = blocQuestion.nextSibling;
        var buttonActualisation = blocReponse.nextSibling;
        var buttonSupprimer= buttonActualisation.nextSibling;
        var inputPoint = button.previousSibling.firstChild;
        var textAreaQuestion = blocQuestion.firstChild.firstChild;
        var selectDifficulte = button.previousSibling.previousSibling;
        this.ToggleElementQuestion(textAreaQuestion,inputPoint,selectDifficulte,blocReponse,buttonActualisation,buttonSupprimer,BlocMode);
    }

    ToggleElementQuestion(textAreaQuestion,inputPoint,selectDifficulte,blocReponse,buttonActualisation,buttonSupprimer,BlocMode,toggle=true){
        if (toggle){
            textAreaQuestion.disabled = !textAreaQuestion.disabled;
            inputPoint.disabled = !inputPoint.disabled;
            selectDifficulte.disabled = !selectDifficulte.disabled;
            BlocMode.disabled = !BlocMode.disabled;
            Array.from(blocReponse.children).forEach((rep: any) => {
                var inputReponse = rep.firstChild;
                inputReponse.disabled = !inputReponse.disabled;
            });
            buttonActualisation.hidden = !buttonActualisation.hidden;
            buttonSupprimer.hidden = !buttonSupprimer.hidden;
        }
        else{
            textAreaQuestion.disabled =true;
            inputPoint.disabled =true;
            selectDifficulte.disabled =true;
            Array.from(blocReponse.children).forEach((rep: any) => {
                var inputReponse = rep.firstChild;
                inputReponse.disabled = true;
            });
            buttonActualisation.hidden =true;
            buttonSupprimer.hidden =true;
        }
    }

    sendUpdateQuestion(idQuestion, btnUpdate) {

        var btnAnnuler= btnUpdate.nextSibling;
        btnUpdate.hidden=true;
        btnAnnuler.hidden=true;

        var ArrayReponse = [];
        var IdBonneReponse;
        var txtBonneReponse;
        var blocReponse = btnUpdate.previousSibling;
        var Question = blocReponse.previousSibling.firstChild.firstChild;
        var Points =blocReponse.previousSibling.lastChild.previousSibling.firstChild;
        var difficulte = blocReponse.previousSibling.firstChild.nextSibling;
        var buttonActualisation = blocReponse.nextSibling;
        var buttonSupprimer= buttonActualisation.nextSibling;
        var BlocMode : any= document.getElementById("divMode"+idQuestion);

        Array.from(blocReponse.children).forEach((rep: any) => {
            var inputReponse = rep.firstChild;
            var reponse = `{ "id" : "${inputReponse.dataset.id}", "texte" : "${inputReponse.value}"}`;
            ArrayReponse.push(reponse);
            if (inputReponse.dataset.goodanswer != undefined){
                IdBonneReponse = inputReponse.dataset.id;
                txtBonneReponse= inputReponse.value;
            }
        });

        var data = `
        {
            "id": ${idQuestion},
            "texte": "${Question.value}",
            "points": "${Points.value}",
            "bonneReponse": {
                "id": ${IdBonneReponse},
                "texte": "${txtBonneReponse}"
            },
            "reponses":[${ArrayReponse}],
            "difficultes": {
                "id": ${difficulte.value},
                "nom": ""
            },
            "isMultiplayer" : ${BlocMode.value}
        }`;
        this.ajaxService.updateQuestion(data).subscribe(
            (response) => {
                toastr.success("Mise à jour de la question", "Mise à jour Ok", {
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
                this.ToggleElementQuestion(Question,Points,difficulte,blocReponse,buttonActualisation,buttonSupprimer,false);
            },
            (error) => {
                console.log(error);
                toastr.error(`Connexion impossible :<br> <small class="text-ultralight">${error.message}</small>`, "", {
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
                btnUpdate.hidden=false;
                btnAnnuler.hidden=false;
            }
        );
    }

    changeDifficulte(select){
        var classe;
        select.classList.remove("bg-blue");
        select.classList.remove("bg-green");
        select.classList.remove("bg-red");
        switch(select.value)
        {
            case "1":
                classe ="bg-blue";
                break;
            case "2":
                classe ="bg-green";
                break;
            default:
                classe ="bg-red";
                break;
        }
        select.classList.add(classe);

    }

    changeMode(select)
    {
        var classe;
        select.classList.remove("bg-blue");
        select.classList.remove("bg-green");
        select.classList.remove("bg-red");
        switch(select.value)
        {
            case "0":
                classe ="bg-blue";
                break;
            case "1":
                classe ="bg-green";
                break;
        }
        select.classList.add(classe);
    }
    deleteQuestion(){
        if(this.IdQuestionASupprimer == null)
            return;
        this.ajaxService.deleteQuestion(this.IdQuestionASupprimer).subscribe(
            (Response)=>{
                toastr.success("La question à été supprimée", "Suppression Ok", {
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
                document.getElementById("div" +this.IdQuestionASupprimer).remove();
            },
            (error)=>{
                let msgErreur = error.error;
                if (error.status == 0)
                    msgErreur = "Connexion à distance impossible"
                    toastr.error(`Connexion impossible :<br> <small class="text-ultralight">${msgErreur}</small>`, "", {
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
            }
        )
    }
    getIdQuestionASupprimer(id){
        this.IdQuestionASupprimer = id;
    }

}
