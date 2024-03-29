import { Component, OnInit } from '@angular/core';
import { FormationService } from '../service/formation.service';
import { Formation } from '../models/formation.model';
import { DatePipe, NgClass, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { FormationFilterPipe } from '../pipes/FormationFilterPipe';

@Component({
  selector: 'app-formations',
  standalone: true,
  imports: [NgFor,FormsModule,FormationFilterPipe,NgClass,DatePipe],
  templateUrl: './formations.component.html',
  styleUrl: './formations.component.css',
  providers: [FormationService]

})
export class FormationsComponent implements OnInit{
  searchText: string = '';
  formationFilter:FormationFilterPipe=new FormationFilterPipe ;

  formations: Formation[] = [];

  constructor(private formationService: FormationService,private router: Router) { }

  ngOnInit(): void {
    this.getFormations();

  }
  getFormations():void{
    this.formationService.getFormations().subscribe(formations => {
      this.formations = formations;
    });
  }

  goToAdd():void{
    this.router.navigate(['/formations/newForm']);

  }
  goToMembers(){
    this.router.navigate(['/members']);

  }
  goToUpdate(id:any){
    this.router.navigate(['/formations/update/'+id]);

  }
  executeDelete(id:any){
    const confirmation = confirm("Êtes-vous sûr de vouloir supprimer cette formation ?");
    if (confirmation) {
          this.formationService.deleteFormation(id).subscribe(
      () => {
        
        this.formations = this.formations.filter(formation => formation.id !== id);
        
        this.getFormations();
      },
            
      error => {
        console.error("Error deleting formation:", error);
      }
          
    );
  }
  }

  markAsDone(formation: Formation): void {
    formation.done = !formation.done;
  }

  getMembersByFormation(formation:Formation): void {
    if (formation.id !== undefined) {
        this.formationService.findMembersByFormationId(formation.id).subscribe(
            () => {
                this.router.navigate([`formations/${formation.id}/members`]);
            },
            (error) => {
                console.error('Error fetching members:', error);
            }
        );
    } else {
        console.error('Formation ID is undefined');
    }
}

}
