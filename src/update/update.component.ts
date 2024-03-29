import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Formation } from '../models/formation.model';
import { FormationService } from '../service/formation.service';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-update',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './update.component.html',
  styleUrl: './update.component.css',
  providers: [FormationService]

})
export class UpdateComponent implements OnInit{
  formation: Formation ={
    titre: '',
    description: '',
    dateDebut: new Date(),
    dateFin: new Date(),
    done:false
  };

  constructor(
    private route: ActivatedRoute,
    private formationService: FormationService,private router:Router) { }

    ngOnInit(): void {
      const id: string | null = this.route.snapshot.paramMap.get('id');
      
      if (id !== null && !isNaN(+id)) {
        const formationId: number = +id;
        this.formationService.getFormationById(formationId).subscribe(formation => {
          this.formation = formation;
        });
      } else {
        console.error("Invalid formation ID");
      }

    }

  updateFormation(): void {
  this.formationService.updateFormation( this.formation).subscribe(() => {
    this.router.navigate(['formations']);

   });
  }
}

