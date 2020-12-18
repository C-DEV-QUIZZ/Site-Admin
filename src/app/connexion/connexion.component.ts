import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

    // désactive le tabs Inscription;
    modeInscription =false;

    constructor(private globals: Globals, public ajaxService: AjaxService,private router: Router) { 

    }

    ngOnInit(): void {

        //recupère et retourne false si le mode inscription est désactivé dans la BDD

        this.ajaxService.getModeInscriptionSiteAdmin().subscribe(
        (responseBody) => {
            this.modeInscription = Boolean (responseBody);
        },
        (error)=>{
            console.log("mode inscription: "+error);
        });

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
    activeChargement(isActive, btnElement, loadElement) {
        if (isActive) {
            document.getElementById(btnElement).style.display = "none";
            document.getElementById(loadElement).style.display = "flex";
        }
        else {
            document.getElementById(btnElement).style.display = "flex";
            document.getElementById(loadElement).style.display = "none";
        }
    }

    /**
     * 
     */
    beforeConnexion(): boolean {

        this.activeChargement(true, "btnConfirmConnexion", "attConfirmConnnexion");

        let valideMailConnexion: boolean = this.globals.validateEmail(this.emailConnexion);
        let isEmptyOrSpacesPasswordConnexion: boolean = this.globals.isEmptyOrSpaces(this.passwordConnexion);


        if (!valideMailConnexion || isEmptyOrSpacesPasswordConnexion) {
            this.activeChargement(false, "btnConfirmConnexion", "attConfirmConnnexion");
            return false;
        }
        else
            this.sendConnexion();

    }

    sendConnexion() {
        let data = {
            "email": this.emailConnexion,
            "password": this.passwordConnexion
        }
        this.ajaxService.postConnexion(data).subscribe(
            (response) => {
                let stringResult = JSON.stringify(response);
                let JsonResult = JSON.parse(stringResult);
                let timeConnexion = 0.041; // 1h
                Cookie.set(Globals.COOKIE_NAME, JsonResult.token, timeConnexion);
                this.activeChargement(false,"btnConfirmConnexion","attConfirmConnnexion");
                this.router.navigate(['/']);
            },
            (error) => {
                this.activeChargement(false,"btnConfirmConnexion","attConfirmConnnexion");
            });
    }



    /**
     * 
     */
    beforeInscription(): boolean {
        this.activeChargement(true, "btnConfirmInscription", "attConfirmInscription");
        this.nom;
        this.prenom;
        this.emailInscription;
        this.passwordInscription;
        this.confirmPassword;

        let isEmptyOrSpacesNom: boolean = this.globals.isEmptyOrSpaces(this.nom);

        let isEmptyOrSpacesPrenom: boolean = this.globals.isEmptyOrSpaces(this.prenom);

        let valideMailInscription: boolean = this.globals.validateEmail(this.emailInscription);

        let isEmptyOrSpacespasswordInscription: boolean = this.globals.isEmptyOrSpaces(this.passwordInscription);

        let isEmptyOrSpacesConfirmPassword: boolean = this.globals.isEmptyOrSpaces(this.confirmPassword);

        let isPasswordAndConfirmSimilar = this.passwordInscription == this.confirmPassword;
        if (
            isEmptyOrSpacesNom ||
            isEmptyOrSpacesPrenom ||
            isEmptyOrSpacespasswordInscription ||
            isEmptyOrSpacesConfirmPassword ||
            this.nom.length < 2 ||
            this.prenom.length < 2 ||
            this.passwordInscription.length < 8 ||
            this.confirmPassword.length < 8 ||
            !isPasswordAndConfirmSimilar ||
            !valideMailInscription
        ) {
            this.activeChargement(false, "btnConfirmInscription", "attConfirmInscription");
            return false;
        }
        else {
            this.sendInscription();
        }
    }

    sendInscription() {
        let data = {
            "nom": this.nom,
            "prenom": this.prenom,
            "email": this.emailInscription,
            "password": this.passwordInscription,
        }
        this.ajaxService.postInscription(data).subscribe(
            (response) => {                           //Next callback
                console.log(response);
                this.activeChargement(false, "btnConfirmInscription", "attConfirmInscription");
            },
            (error) => {                              //Error callback
                console.log(error);
                this.activeChargement(false, "btnConfirmInscription", "attConfirmInscription");
            }
        )
    }
}
