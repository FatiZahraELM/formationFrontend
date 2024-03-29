import { Component, OnInit } from '@angular/core';
import { MemberService } from '../service/member.service';
import { DatePipe, NgClass, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FormationFilterPipe } from '../pipes/FormationFilterPipe';
import { Member } from '../models/Member.model';
import { FormationService } from '../service/formation.service';
@Component({
  selector: 'app-formation-members',
  standalone: true,
  imports: [NgFor,FormsModule,FormationFilterPipe,NgClass,DatePipe],
  templateUrl: './formation-members.component.html',
  styleUrl: './formation-members.component.css',
  providers:[MemberService]
})
export class FormationMembersComponent implements OnInit{

  members: Member[] = [];
  formationId: number = 0; 
  constructor(private memberService: MemberService,private route:ActivatedRoute,private formationService: FormationService, private router: Router) { }

  ngOnInit(): void {
    const id: string | null = this.route.snapshot.paramMap.get('id');
    if (id !== null && !isNaN(+id)) {
      this.formationId = +id; 
      this.formationService.findMembersByFormationId(this.formationId).subscribe(member => {
        this.members = member;
      });
    } else {
      console.error("Invalid formation ID");
    }
  }
  
  
  getMembers():void{
    this.memberService.getMembers().subscribe(members => {
      this.members = members;
    });
  }

  goToAdd():void{
    this.router.navigate(['members/newMember']);

  }
  goToUpdate(id:any){
    this.router.navigate(['members/update/'+id]);

  }
  executeDelete(idFormation: number, idMember: number): void {
    const confirmation = confirm("Êtes-vous sûr de vouloir supprimer ce membre ?");
    if (confirmation) {
      this.formationService.deleteFromNote(idFormation, idMember).subscribe(
        () => {
          this.members = this.members.filter(member => member.member_id !== idMember);
          this.getMembers(); // Refresh the list of members
        },
        error => {
          console.error("Error deleting member:", error);
        }
      );
    }
  }
  getFormationsByMember(member: Member): void {
    if (member.member_id !== undefined) {
        this.memberService.findFormationsByMemberId(member.member_id).subscribe(
            () => {
                this.router.navigate([`members/${member.member_id}/formations`]);
            },
            (error) => {
                console.error('Error fetching formations:', error);
            }
        );
    } else {
        console.error('Member ID is undefined');
    }
}
  

}

