import { BaseService } from './base/base.service';
import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Stringwrapper, Superhero } from '../models/superhero.model';

@Injectable({
    providedIn: 'root'
})
export class SuperheroService extends BaseService {
    private service: string;

    headers = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        }),
        'responseType': 'text'

    };

    constructor(private readonly http: HttpClient) {
        super();
        this.service = this.api + 'SuperHero';
    }

    getList() {
        return this.http.get<Superhero[]>(`${this.service}/GetList`);
    }
    getHeroById(id:string) {
        let params = new Stringwrapper();
        params.value = id;
        return this.http.post<Superhero>(`${this.service}/GetHeroById`, params);
    }
    createHero(superhero: Superhero){
        return this.http.post(`${this.service}/CreateHero`, superhero).subscribe(response=>{
            console.log(response);
          },
          error=>{
            console.log(error);  
          });
    }
    updateHero(superhero:Superhero){
        return this.http.post(`${this.service}/UpdateHero`, superhero).subscribe(response=>{
            console.log(response);
          },
          error=>{
            console.log(error);  
          });
    }

    deleteHero(id:string){
        let params = new Stringwrapper();
        params.value = id;
        return this.http.post<Superhero>(`${this.service}/DeleteHero`, params);
    }
}