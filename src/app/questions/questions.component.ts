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

}
