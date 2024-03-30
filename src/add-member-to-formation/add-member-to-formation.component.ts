import { Component, OnInit } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { MemberService } from '../service/member.service';
import { Member } from '../models/Member.model';
import { ActivatedRoute, Router } from '@angular/router';
import { FormationService } from '../service/formation.service';
@Component({
  selector: 'app-add-member-to-formation',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-member-to-formation.component.html',
  styleUrl: './add-member-to-formation.component.css',
  providers:[FormationService]
})
export class AddMemberToFormationComponent implements OnInit {
firstName: string = '';
lastName: string = '';
email: string = '';
formation: string = ''; // Change the type to string

  constructor(private memberService: MemberService, private route: ActivatedRoute, private formationService: FormationService, private router: Router) { }

  ngOnInit(): void {
    const id: string | null = this.route.snapshot.paramMap.get('id');
    if (id !== null && !isNaN(+id)) {
      this.formation = id;  // Assign the value directly
      this.formationService.findMembersByFormationId(parseInt(this.formation)).subscribe({
        // Handle subscription
      });
    } else {
      console.error("Invalid formation ID");
    }
  }

  addMember(formationId:any): void {
    const member: Member = {
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      formation: parseInt(formationId) // Convert string to number if needed
    };
    this.formationService.addMember(formationId,member).subscribe({
      next: () => {
        // Reset fields after adding
        this.firstName = '';
        this.lastName = '';
        this.email = '';
        // Navigate to the list of members for the formation
        this.router.navigate([`/formations/${this.formation}/members`]);
      },
      error: (error) => {
        console.error("Failed to add member", error);
        // Handle the error appropriately
      }
    });
  }
}