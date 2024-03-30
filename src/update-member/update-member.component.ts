import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {  Member} from '../models/Member.model';
import { MemberService } from '../service/member.service';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-update-member',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './update-member.component.html',
  styleUrl: './update-member.component.css',
   providers:[MemberService]
})
export class UpdateMemberComponent implements OnInit {

  member: Member ={
    firstName: '',
    lastName: '',
    email: '',
    formation:0

  };

  constructor(
    private route: ActivatedRoute,
    private memberService: MemberService,private router:Router) { }

    ngOnInit(): void {
      const id: string | null = this.route.snapshot.paramMap.get('id');
      if (id !== null && !isNaN(+id)) {
        const memberId: number = +id;
        this.memberService.getMembersById(memberId).subscribe(member => {
          this.member = member;
          // Extract formation_id from the formation object
          if (this.member.formation) {
            this.member.formation = this.member.formation;
          }
        });
      } else {
        console.error("Invalid member ID");
      }
    }
  
    updateMember(): void {
      if (this.isValidFormationId(this.member.formation)) {
        this.memberService.updateMember(this.member).subscribe(() => {
          this.router.navigate([`/formations/${this.member.formation}/members`]);
        });
      } else {
        console.error("Invalid formation ID");
        // Handle invalid formation ID appropriately
      }
    }
  
    // Example validation function
    isValidFormationId(formationId: number): boolean {
      return formationId > 0; // Placeholder validation
    }
  }