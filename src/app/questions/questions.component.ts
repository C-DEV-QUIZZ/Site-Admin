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

    questions;
    IdQuestionASupprimer;

    ngOnInit(): void {
        this.globals.ifAdminIsConnect();
    }

    GetAllQuestions(): any {
        this.ajaxService.getAllQuestion().subscribe(
            (response) => {
                var stringJson = JSON.stringify(response)
                var Json = JSON.parse(stringJson);
                this.questions = Json;
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
        console.log(e.value);
    }

    modifQuestion(button): any {

        var blocQuestion = button.parentNode;
        var blocReponse = blocQuestion.nextSibling;
        var buttonActualisation = blocReponse.nextSibling;
        var buttonSupprimer= buttonActualisation.nextSibling;
        var inputPoint = button.previousSibling.firstChild;
        var textAreaQuestion = blocQuestion.firstChild.firstChild;
        var selectDifficulte = button.previousSibling.previousSibling;

        console.log(selectDifficulte.value);

        // console.log(blocQuestion);
        // console.log(textAreaQuestion.disabled= !textAreaQuestion.disabled );
        // console.log(inputPoint);

        // active desactive le textarea question : 
        // active desactive le input points : 
        // active desactive le select difficulte : 
        // active desactive les réponses : 
        textAreaQuestion.disabled = !textAreaQuestion.disabled;
        inputPoint.disabled = !inputPoint.disabled;
        selectDifficulte.disabled = !selectDifficulte.disabled;
        Array.from(blocReponse.children).forEach((rep: any) => {
            var inputReponse = rep.firstChild;
            inputReponse.disabled = !inputReponse.disabled;
        });

        // active desactive le bouton mise à jour : 
        buttonActualisation.hidden = !buttonActualisation.hidden
        buttonSupprimer.hidden = !buttonSupprimer.hidden

    }

    sendUpdateQuestion(idQuestion, btnUpdate) {
        var btnAnnuler= btnUpdate.nextSibling;
        btnUpdate.hidden=true;
        btnAnnuler.hidden=true;

        var ArrayReponse = [];
        var IdBonneReponse;
        var txtBonneReponse;
        var blocReponse = btnUpdate.previousSibling;
        var Question = blocReponse.previousSibling.firstChild.firstChild.value;
        var Points =blocReponse.previousSibling.lastChild.previousSibling.firstChild.value;
        var difficulte = blocReponse.previousSibling.firstChild.nextSibling.value;

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
            "texte": "${Question}",
            "points": "${Points}",
            "bonneReponse": {
                "id": ${IdBonneReponse},
                "texte": "${txtBonneReponse}"
            },
            "reponses":[${ArrayReponse}],
            "difficultes": {
                "id": ${difficulte},
                "nom": ""
            }
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
        // recuperer la question.
        // recuperer toutes les reponses
        // formater au format 
        // faire un put

        btnUpdate.hidden=false;
        btnAnnuler.hidden=false;
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

    deleteQuestion(){
        if(this.IdQuestionASupprimer == null)
            return;
        console.log("suppression de la question avec l'id " + this.IdQuestionASupprimer);    

        this.ajaxService.deleteQuestion(this.IdQuestionASupprimer).subscribe(
            (Response)=>{
                document.getElementById("div" +this.IdQuestionASupprimer).remove();
            },
            (error)=>{
                console.log("erreur");
            }
        )
    }

    getIdQuestionASupprimer(id){
        this.IdQuestionASupprimer = id;
    }
}
