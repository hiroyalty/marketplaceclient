import { Injectable } from '@angular/core';

@Injectable()
export class ProjectStatusService {

  constructor() { }
 
  getStatusValues() {
    //let list = [{en:'draft'}, {en:'created'}, {en:'awarded'}, {en:'ongoing'}];
    let list = [{ id: 'draft', name: 'Draft'}, 
      {id: 'created', name: 'Created'}, 
      {id: 'awarded', name: 'Awarded'}, 
      {id: 'ongoing', name: 'Ongoing'},
      {id: 'finished', name: 'Finished'},
    ];
    return list;
  }
}
