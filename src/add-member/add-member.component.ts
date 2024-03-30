import { Component } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { MemberService } from '../service/member.service';
import { Member } from '../models/Member.model';
import { Router } from '@angular/router';


@Component({
  selector: 'app-add-member',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-member.component.html',
  styleUrl: './add-member.component.css',
  providers: [MemberService]

})
export class AddMemberComponent {
  firstName: string = '';
  lastName: string = '';
  email: string = '';
  formation:any=0;

  constructor(private memberService: MemberService,private router: Router) { }

  addMember(): void {

    const formation: Member = {
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      formation:this.formation
    };
    this.memberService.addMember(formation).subscribe(() => {
      this.firstName = '';
      this.lastName = '';
      this.email = '';
   
      this.router.navigate(['members']);

    });
  

  }}
