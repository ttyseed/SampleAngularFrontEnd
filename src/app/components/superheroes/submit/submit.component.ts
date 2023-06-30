import { Component } from '@angular/core';
import {FormGroup} from '@angular/forms';
import { FormlyFieldConfig} from '@ngx-formly/core';
import { Superhero } from 'src/app/shared/models/superhero.model';
import { SuperheroService } from '../../../shared/services/superhero.service';

@Component({
  selector: 'app-submit',
  templateUrl: './submit.component.html',
  styleUrls: ['./submit.component.scss']
})
export class SubmitComponent {

  constructor(private superHeroesService: SuperheroService) { }

  form = new FormGroup({});
  model = new Superhero();
  fields: FormlyFieldConfig[] = [
    {
      key: 'name',
      type: 'input',
      templateOptions: {
        label: 'Superhero Name',
        placeholder: 'Enter Name',
        required: true,
      },   
    },
    {
      key: 'description',
      type: 'input',
      templateOptions: {
        label: 'Description',
        placeholder: 'Enter Description',
        required: true,
      }
    }
  ];

  onSubmit() {
    this.superHeroesService.createHero(this.model);
  }

}
