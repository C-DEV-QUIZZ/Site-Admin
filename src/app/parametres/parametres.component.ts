import { Component, OnInit } from '@angular/core';
import { Globals } from '../global';
import { AjaxService } from '../service/ajax.service';
declare let toastr: any;

@Component({
    selector: 'app-parametres',
    templateUrl: './parametres.component.html',
    styleUrls: ['./parametres.component.css'],
})
export class ParametresComponent implements OnInit {
    constructor(private globals: Globals, public ajaxService: AjaxService) { }

    parametres;
    utilisateur :any={email:"",password:""}


    ngOnInit(): void {
        this.globals.ifAdminIsConnect();

        this.ajaxService.getAllParametres().subscribe(
            (response) => { 
                this.parametres = response;
            },
            (error) => {
                console.log(error);
            }
        );
    }

    /**
     *  appeler pour envoyer les valeurs des paramètres
     * @param e switch du parametre
     */
    updateParametre(){
        var email = this.globals.validateEmail(this.utilisateur.email);
        var password = this.globals.isEmptyOrSpaces(this.utilisateur.password);

        if(!email || password){
            this.globals.PrintMessage("messageInfos","Email ou mots de passe non renseigné");
            return;
        }
        let data = {
            "parametres" : this.parametres,
            "administrateur" : this.utilisateur
        }
        this.ajaxService.UpdateParametres(data).subscribe(
            (response) => { 
                toastr.success("Les paramètres ont été actualisés correctement", "Actualisation Ok", {
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
                document.getElementById("btnClose").click();
            },
            (error) => {
                toastr.error(`Erreur lors de l'actualisation des paramètres :<br> <small class="text-ultralight">${error.error}</small>`, "", {
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
