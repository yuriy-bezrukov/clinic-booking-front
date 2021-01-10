import { Component, OnInit } from '@angular/core';
import { ROUTINGS } from '@app/app-routing.module';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {

  items: { url: string, name: string }[] = [
    { url: `/${ROUTINGS.main}`, name: 'Main' },
    { url: `/${ROUTINGS.users}`, name: 'Users' },
    { url: `/${ROUTINGS.calendar}`, name: 'Calendar' },
  ];

}
