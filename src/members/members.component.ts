import { Component, OnInit } from '@angular/core';
import { MemberService } from '../service/member.service';
import { DatePipe, NgClass, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { FormationFilterPipe } from '../pipes/FormationFilterPipe';
import { Member } from '../models/Member.model';

@Component({
  selector: 'app-members',
  standalone: true,
  imports: [NgFor,FormsModule,FormationFilterPipe,NgClass,DatePipe],
  templateUrl: './members.component.html',
  styleUrl: './members.component.css',
  providers: [MemberService]

})
export class MembersComponent implements OnInit{

  members: Member[] = [];

  constructor(private memberService: MemberService,private router: Router) { }

  ngOnInit(): void {
    this.getMembers();

  }
  getMembers():void{
    this.memberService.getMembers().subscribe(members => {
      this.members = members;
    });
  }

  goToAdd():void{
    this.router.navigate(['members/newMember']);

  }
  goToFormations(){
    this.router.navigate(['/formations']);

  }
  goToUpdate(id:any){
    this.router.navigate(['members/update/'+id]);

  }
  executeDelete(id:any){
    const confirmation = confirm("Êtes-vous sûr de vouloir supprimer ce membre ?");
    if (confirmation) {
          this.memberService.delete(id).subscribe(
      () => {
        
        this.members = this.members.filter(member => member.member_id !== id);
        
        this.getMembers();
      },
            
      error => {
        console.error("Error deleting member:", error);
      }
          
    );
  }
  }
  getFormationsByMember(member: Member): void {
    if (member.member_id !== undefined) {
        this.memberService.getFormationByMemberId(member.member_id).subscribe(
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
