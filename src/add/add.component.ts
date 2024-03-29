import { Component } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { FormationService } from '../service/formation.service';
import { Formation } from '../models/formation.model';
import { Router } from '@angular/router';


@Component({
  selector: 'app-add',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add.component.html',
  styleUrl: './add.component.css',
  providers: [FormationService]

})
export class AddComponent {
  titre: string = '';
  description: string = '';
  dateDebut: string = '';
  dateFin: string = '';

  constructor(private formationService: FormationService,private router: Router) { }

  addFormation(): void {

    const formation: Formation = {
      titre: this.titre,
      description: this.description,
      dateDebut: new Date(this.dateDebut),
      dateFin: new Date(this.dateFin),
      done:false
    };
    this.formationService.addFormation(formation).subscribe(() => {
      this.titre = '';
      this.description = '';
      this.dateDebut = '';
      this.dateFin = '';
      
      this.router.navigate(['formations']);

    });
  
  }}
