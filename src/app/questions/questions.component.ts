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

  constructor(private globals:Globals, private ajaxSerice : AjaxService) { }

  questions;

  ngOnInit(): void {
    this.globals.ifAdminIsConnect();
  }

  GetAllQuertion():any {
    this.ajaxSerice.getAllQuestion().subscribe(
      (response) => {        
        var stringJson= JSON.stringify(response)
        var Json = JSON.parse(stringJson);
        this.questions= Json;
        console.log(response);
      },
      (error) => {                              
        let msgErreur;
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

  modifQuestion(button):any{

    var blocQuestion = button.parentNode;
    var blocReponse = blocQuestion.nextSibling;
    var buttonActualisation = blocReponse.nextSibling;

    var textAreaQuestion = blocQuestion.firstChild.firstChild;


    // console.log(blocQuestion);
    // console.log(textAreaQuestion.disabled= !textAreaQuestion.disabled );

    // active desactive le textarea question : 
    textAreaQuestion.disabled= !textAreaQuestion.disabled 


    //console.log(blocReponse);

    // active desactive les réponses : 
    Array.from(blocReponse.children).forEach(( rep:any) => {
        var inputReponse = rep.firstChild;
        inputReponse.disabled = !inputReponse.disabled;
    });

    // active desactive le bouton mise à jour : 
    buttonActualisation.hidden = !buttonActualisation.hidden

  }

  UpdateQuestion(idQuestion,btnUpdate){
    var ArrayReponse =[];
    var IdBonneReponse;
    var blocReponse = btnUpdate.previousSibling;    
    var Question = blocReponse.previousSibling.firstChild.firstChild.value;

    Array.from(blocReponse.children).forEach(( rep:any) => {
      var inputReponse =  rep.firstChild;


      var reponse = `{ "id" : "${inputReponse.dataset.id}", "texte" : "${inputReponse.value}"}`;
      ArrayReponse.push(reponse);

      if (inputReponse.dataset.goodanswer!=undefined)
        IdBonneReponse= inputReponse.dataset.id; 
    });


    console.log(idQuestion);
    console.log(Question);
    console.log(ArrayReponse);
    console.log(IdBonneReponse);

    var data = `
    {
      "id": ${idQuestion},
      "texte": "${Question}",
      "bonneReponse": {
          "id": ${IdBonneReponse},
          "texte": "good"
      },
      "reponses":[${ArrayReponse}],
      "difficultes": {
          "id": 1,
          "nom": "Facile"
      }
    }`;

    this.ajaxSerice.updateQuestion(data).subscribe(
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
        let msgErreur;
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


  }
}
