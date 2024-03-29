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
        });
      } else {
        console.error("Invalid member ID");
      }

    }

  updateMember(): void {
  this.memberService.updateMember( this.member).subscribe(() => {
    this.router.navigate(['members']);

   });
  }
}

