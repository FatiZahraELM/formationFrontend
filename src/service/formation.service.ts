import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Formation } from '../models/formation.model';
import { Member } from '../models/Member.model';
@Injectable({
  providedIn: 'root'
  
})
export class FormationService {

  constructor( private http:HttpClient) {
   }
    apiUrl:string = 'http://localhost:8080/formations';


  getFormations():Observable<Formation[]> {
    return this.http.get<Formation[]>(this.apiUrl);
  }

  getFormationById(id: number): Observable<Formation> {
    return this.http.get<Formation>(`${this.apiUrl}/${id}`);
  }

  addFormation(formation: Formation): Observable<void> {
    return this.http.post<void>(this.apiUrl, formation);
  }

  updateFormation( formation: Formation): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${formation.id}`, formation);
  }

  deleteFormation(id: number) {
    return this.http.delete(`${this.apiUrl}/`+id);
  }
  findMembersByFormationId(id: number):Observable<Member[]>{
    return this.http.get<Member[]>(`${this.apiUrl}/${id}/members`);

  }
  deleteFromNote(idFormation:number,idMember: number){
    return this.http.delete(`${this.apiUrl}/${idFormation}/members/${idMember}`);
  }

  addMember(formationId:any,member:Member):Observable<void>{
    return this.http.post<void>(`${this.apiUrl}/${formationId}/members`, member);

  }
}
 
