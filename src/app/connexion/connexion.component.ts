import { Component, OnInit } from '@angular/core';
import { Cookie } from 'ng2-cookies';
import { Globals } from '../global';
import { AjaxService } from '../service/ajax.service';

@Component({
    selector: 'app-connexion',
    templateUrl: './connexion.component.html',
    styleUrls: ['./connexion.component.css'],
})
export class ConnexionComponent implements OnInit {


    emailConnexion;
    passwordConnexion;

    nom;
    prenom;
    emailInscription;
    passwordInscription;
    confirmPassword;

    constructor(private globals:Globals, public ajaxService :AjaxService){}

    ngOnInit(): void {
        this.emailConnexion ="doe@john.fr";
        this.passwordConnexion ="123";
    }



    /**
     * 
     */
    clearFormulaire(): void {
        this.emailConnexion = '';
        this.passwordConnexion = '';
        this.nom = '';
        this.prenom = '';
        this.emailInscription = '';
        this.passwordInscription = '';
        this.confirmPassword = '';
    }
    /**
     * 
     * @param isActive 
     * @param btnElement 
     * @param loadElement 
     */
    activeChargement(isActive,btnElement,loadElement){
        if(isActive){
            document.getElementById(btnElement).style.display="none";
            document.getElementById(loadElement).style.display="flex";
        }
        else{
            document.getElementById(btnElement).style.display="flex";
            document.getElementById(loadElement).style.display="none";
        }
    }

    /**
     * 
     */
    beforeConnexion():void{



        let data = {
            "email":this.emailConnexion,
            "password":this.passwordConnexion
        }

        console.log("connexion")
        // this.ajaxService.postConnexion(data).subscribe(
        //     (response) => {
        //         let stringResult = JSON.stringify(response);
        //         let JsonResult = JSON.parse(stringResult);
        //         console.log(JsonResult);
        //         let timeConnexion = 0.041; // 1h
        //         Cookie.set(Globals.COOKIE_NAME,JsonResult.token,timeConnexion);
        //     },
        //     (error) => { 

        //     });

    }


    /**
     * 
     */
    beforeInscription():boolean{
        this.activeChargement(true,"btnConfirmInscription","attConfirmInscription");
        this.nom;
        this.prenom;
        this.emailInscription;
        this.passwordInscription;
        this.confirmPassword;

        let isEmptyOrSpacesNom:boolean =  this.globals.isEmptyOrSpaces(this.nom);

        let isEmptyOrSpacesPrenom:boolean =  this.globals.isEmptyOrSpaces(this.prenom);
    
        let valideMailInscription :boolean =  this.globals.validateEmail(this.emailInscription);
    
        let isEmptyOrSpacespasswordInscription:boolean =  this.globals.isEmptyOrSpaces(this.passwordInscription);
    
        let isEmptyOrSpacesConfirmPassword:boolean =  this.globals.isEmptyOrSpaces(this.confirmPassword);

        let isPasswordAndConfirmSimilar = this.passwordInscription == this.confirmPassword;
        if(
          isEmptyOrSpacesNom || 
          isEmptyOrSpacesPrenom ||
          isEmptyOrSpacespasswordInscription ||
          isEmptyOrSpacesConfirmPassword || 
          this.nom.length<2 ||
          this.prenom.length<2 ||
          this.passwordInscription.length<8 ||
          this.confirmPassword.length<8 ||
          !isPasswordAndConfirmSimilar ||
          !valideMailInscription
        ){
          this.activeChargement(false,"btnConfirmInscription","attConfirmInscription");
          return false;
        }
        else{
            this.sendInscription();
        }
    }

    sendInscription(){
        let data = {
            "nom":this.nom,
            "prenom":this.prenom,
            "email":this.emailInscription,
            "password":this.passwordInscription,
        }
        this.ajaxService.postInscription(data).subscribe(
            (response) => {                           //Next callback
                console.log(response);
            },
            (error) => {                              //Error callback
                console.log(error);
            }
        )
    }
}
