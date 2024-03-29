export interface Formation {
    id?: number; // Making id optional with `?`
    titre: string;
    description: string;
    dateDebut: Date;
    dateFin: Date;
    done: boolean;

  }