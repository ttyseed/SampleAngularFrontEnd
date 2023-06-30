import { MatTableDataSource } from "@angular/material/table";
import { Superpowers } from "./superpowers.model";

export class Superhero {
    id: string;
    name: string;
    description: string;
    superpowers: Superpowers[];
}

export class SuperheroList {
    id: string;
    name: string;
    description: string;
    superpowers?: Superpowers[] | MatTableDataSource<Superpowers>;
}

export class Stringwrapper{
    value: string;
}