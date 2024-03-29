import { Routes } from '@angular/router';
import { FormationsComponent } from '../formations/formations.component';
import { AddComponent } from '../add/add.component';
import { UpdateComponent } from '../update/update.component';
import { MembersComponent } from '../members/members.component';
import { AddMemberComponent } from '../add-member/add-member.component';
import { FormationMembersComponent } from '../formation-members/formation-members.component';
import { UpdateMemberComponent } from '../update-member/update-member.component';
import { MemberFormationsComponent } from '../member-formations/member-formations.component';
import { AddMemberToFormationComponent } from '../add-member-to-formation/add-member-to-formation.component';

export const routes: Routes = [

    {
        'path':"formations",
        component: FormationsComponent,
    },
    {
        'path':"members",
        component: MembersComponent,
    },
    {
        'path':"formations/newForm",
        component: AddComponent,
    },
    {
        'path':"members/newMember",
        component: AddMemberComponent,
    },
    {
        'path':"formations/update/:id",
        component: UpdateComponent,
    },
    {
        'path':"members/update/:id",
        component: UpdateMemberComponent,
    },
    {
        'path':"formations/:id1/members/newMember",
        component: AddMemberToFormationComponent,
    },
    {
        'path':"formations/:id/members",
        component: FormationMembersComponent,
    },
    {
        'path':"members/:id/formations",
        component: MemberFormationsComponent,
    },

    

    
];
