import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, QueryList, ViewChildren, ViewChild, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Superhero, SuperheroList } from 'src/app/shared/models/superhero.model';
import { Superpowers } from 'src/app/shared/models/superpowers.model';
import { SuperheroService } from '../../../shared/services/superhero.service';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ListComponent implements AfterViewInit {
  superheroList: Superhero[] = [];
  superheroTableList: SuperheroList[] = [];
  superheroListItem: SuperheroList;
  dataSource: MatTableDataSource<SuperheroList>;
  usersData: SuperheroList[] = [];
  columnsToDisplay = ['name', 'description','actions'];
  innerDisplayedColumns = ['superPower', 'description'];
  expandedElement: SuperheroList | null;

  @ViewChild('outerSort', { static: true }) sort: MatSort;
  @ViewChildren('innerSort') innerSort: QueryList<MatSort>;
  @ViewChildren('innerTables') innerTables: QueryList<MatTable<Superpowers>>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  


  constructor(private superHeroesService: SuperheroService, private cd: ChangeDetectorRef, private router: Router) { }
  ngOnInit(): void {
    this.superheroList = this.getApi();

  }

  ngAfterViewInit() {

  }

  getApi() {
    this.superHeroesService.getList().subscribe((response) => {
      this.superheroList = response;
      this.superheroList.forEach(user => {
        let superheroListItem = new SuperheroList();
        superheroListItem.id = user.id;
        superheroListItem.name = user.name;
        superheroListItem.description = user.description
          if (user.superpowers.length > 0) {
            superheroListItem.superpowers = user.superpowers;
          }
          this.superheroTableList.push(superheroListItem);
        
      });
      console.log(this.superheroList);
      this.superheroTableList.forEach(user => {
        if (user.superpowers && Array.isArray(user.superpowers) && user.superpowers.length) {
          this.usersData = [...this.usersData, { ...user, superpowers: new MatTableDataSource(user.superpowers) }];
        } else {
          this.usersData = [...this.usersData, user];
        }
      });
      this.dataSource = new MatTableDataSource(this.usersData);
      this.dataSource.sort = this.sort;
      console.log(this.dataSource);
      this.dataSource.paginator = this.paginator;
    });

    return this.superheroList;
  }

  toggleRow(element: SuperheroList) {
    element.superpowers && (element.superpowers as MatTableDataSource<Superpowers>).data.length ? (this.expandedElement = this.expandedElement === element ? null : element) : null;
    this.cd.detectChanges();
    this.innerTables.forEach((table, index) => (table.dataSource as MatTableDataSource<Superpowers>).sort = this.innerSort.toArray()[index]);
  }

  applyFilter(filterValue: string) {
    this.innerTables.forEach((table, index) => (table.dataSource as MatTableDataSource<Superpowers>).filter = filterValue.trim().toLowerCase());
  }

  redirectToAnotherPage(id: string) {
    // Perform any necessary logic or checks here

    // Redirect to the desired page and pass the row data as a query parameter
    this.router.navigate(['/superheroes/update', id]);
  }

  deleteHero(id:string){
    this.superHeroesService.deleteHero(id).subscribe();
  }
}
