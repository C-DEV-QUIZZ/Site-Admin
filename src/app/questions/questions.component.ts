import { Component, OnInit } from '@angular/core';
import { Globals } from '../global';
import { AjaxService } from '../service/ajax.service';

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
        console.log(Json);
        this.questions= Json;
      },
      (error) => {                              
        console.log(error.error)
      }
    );
  }

}
