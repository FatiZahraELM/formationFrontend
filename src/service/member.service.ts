import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Member } from '../models/Member.model';
import { Formation } from '../models/formation.model';
@Injectable({
  providedIn: 'root'
  
})
export class MemberService {

  constructor( private http:HttpClient) {
   }
    apiUrl:string = 'http://localhost:8080/members';


  getMembers():Observable<Member[]> {
    return this.http.get<Member[]>(this.apiUrl);
  }

  getMembersById(id: number): Observable<Member> {
    return this.http.get<Member>(`${this.apiUrl}/${id}`);
  }

  addMember(member: Member): Observable<void> {
    return this.http.post<void>(this.apiUrl, member);
  }

  updateMember( member: Member): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${member.member_id}`, member);
  }

  delete(id: number) {
    return this.http.delete(`${this.apiUrl}/`+id);
  }
  findFormationsByMemberId(id: number):Observable<Formation[]>{
    return this.http.get<Formation[]>(`${this.apiUrl}/${id}/formations`);

  }

 
}
 
