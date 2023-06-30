import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { Superhero } from 'src/app/shared/models/superhero.model';
import { SuperheroService } from 'src/app/shared/services/superhero.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})

export class UpdateComponent implements OnInit {
  id: string;
  model: any = {};
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id'];
    });
  
    this.superHeroesService.getHeroById(this.id).subscribe((response) => {
      console.log(response)
      this.model.name = response.name;
      this.model.id = response.id;
      this.model.description = response.description;
      console.log(this.model);
      this.setup();
    });  
  }

  constructor(private superHeroesService: SuperheroService, private route: ActivatedRoute) { }

  form = new FormGroup({});
  fields: FormlyFieldConfig[];
  setup() {
    this.fields = [
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
      },
    ];
  }

  onSubmit() {
    this.superHeroesService.updateHero(this.model);
  }

}
