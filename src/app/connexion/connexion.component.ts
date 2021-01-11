import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cookie } from 'ng2-cookies';
import { environment } from 'src/environments/environment';
import { Globals } from '../global';
import { AjaxService } from '../service/ajax.service';
declare let toastr: any;

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
    modeInscription = false;

    adresseApi;
    constructor(private globals: Globals, public ajaxService: AjaxService, private router: Router) {
        this.adresseApi = ajaxService.adresse;
    }

    ngOnInit(): void {

        //retourne false si le mode inscription est désactivé dans la BDD
        this.ajaxService.getModeInscriptionSiteAdmin().subscribe(
            (responseBody) => {
                this.modeInscription = Boolean(responseBody);
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
                toastr.success("Un email de confirmation à été envoyé", "Inscription Ok", {
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
                this.activeChargement(false, "btnConfirmInscription", "attConfirmInscription");
            },
            (error) => {                              //Error callback
                toastr.error(`Erreur lors de l'enregistrement :<br> <small class="text-ultralight">${error.error}</small>`, "", {
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
                this.activeChargement(false, "btnConfirmInscription", "attConfirmInscription");
            }
        )
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

                this.globals.libelle_compte = Globals.COMPTE_STRING;

                toastr.success(`Bienvenue ${JsonResult.nom} ${JsonResult.prenom} `, "Connexion Ok", {
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
                this.activeChargement(false, "btnConfirmConnexion", "attConfirmConnnexion");
                this.router.navigate(['/']);
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
                this.activeChargement(false, "btnConfirmConnexion", "attConfirmConnnexion");
            });
    }

}
