import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccueilComponent } from './accueil/accueil.component';
import { ConfirmationInscriptionComponent } from './confirmation-inscription/confirmation-inscription.component';
import { ConnexionComponent } from './connexion/connexion.component';
import { CreationComponent } from './creation/creation.component';
import { ErrorComponent } from './error/error.component';
import { GestionCompteComponent } from './gestion-compte/gestion-compte.component';
import { GestionUtilisateurComponent } from './gestion-utilisateur/gestion-utilisateur.component';
import { ParametresComponent } from './parametres/parametres.component';
import { QuestionsComponent } from './questions/questions.component';

const routes: Routes = [
  { path: '', component: AccueilComponent },
  { path: 'connexion', component: ConnexionComponent },
  { path: 'confirmationInscription', component: ConfirmationInscriptionComponent },
  { path: 'questions', component: QuestionsComponent },
  { path: 'compte', component: GestionCompteComponent },
  { path: 'gestion-utilisateur', component: GestionUtilisateurComponent },
  { path: 'error', component: ErrorComponent },
  { path: 'creation', component: CreationComponent },
  { path: 'parametres', component: ParametresComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
