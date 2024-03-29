import { Pipe, PipeTransform } from '@angular/core';
import { Formation } from '../models/formation.model';
@Pipe({
  name: 'formationFilter' ,standalone: true,
})
export class FormationFilterPipe implements PipeTransform {
  transform(formations: Formation[], searchText: string): Formation[] {
    if (!formations || !searchText) {
      return formations;
    }
    searchText = searchText.toLowerCase();
    return formations.filter(formations =>
      formations.titre.toLowerCase().includes(searchText)
    );
  }
}

