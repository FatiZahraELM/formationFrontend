import { Component, OnInit } from '@angular/core';
import { FormationService } from '../service/formation.service';
import { Formation } from '../models/formation.model';
import { DatePipe, NgClass, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { FormationFilterPipe } from '../pipes/FormationFilterPipe';
import { MemberService } from '../service/member.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-member-formations',
  standalone: true,
  imports: [NgFor,FormsModule,FormationFilterPipe,NgClass,DatePipe],
  templateUrl: './member-formations.component.html',
  styleUrl: './member-formations.component.css',
  providers: [FormationService]

})
export class MemberFormationsComponent implements OnInit{
  searchText: string = '';
  formationFilter:FormationFilterPipe=new FormationFilterPipe ;
memberId:number=0;
  formations: Formation[] = [];

  constructor(private formationService: FormationService,    private route: ActivatedRoute,
    private memberService: MemberService,private router: Router) { }

  ngOnInit(): void {
    const id: string | null = this.route.snapshot.paramMap.get('id');
      
      if (id !== null && !isNaN(+id)) {
        this.memberId = +id;
        this.memberService.findFormationsByMemberId(this.memberId).subscribe(formation => {
          this.formations = formation;
        });
      } else {
        console.error("Invalid formation ID");
      }

    }

  
  getFormations():void{
    this.formationService.getFormations().subscribe(formations => {
      this.formations = formations;
    });
  }

  goToAdd():void{
    this.router.navigate(['/formations/newForm']);

  }
  goToUpdate(id:any){
    this.router.navigate(['/formations/update/'+id]);

  }
  executeDelete(idFormation:any,idMmeber:any){
    const confirmation = confirm("Êtes-vous sûr de vouloir supprimer cette formation ?");
    if (confirmation) {
          this.formationService.deleteFromNote(idFormation,idMmeber).subscribe(
      () => {
        
        this.formations = this.formations.filter(formation => formation.id !== idFormation);
        
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

