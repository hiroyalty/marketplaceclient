import { Injectable } from '@angular/core';

@Injectable()
export class EnumDataService {

  constructor() { }

  getEnumValues() {
    //let list = [{en:'none'}, {en:'begineer'}, {en:'intermediate'}, {en:'expert'}];
    let list = [{ id: 'none', name: 'None'}, 
      {id: 'begineer', name: 'Begineer'}, 
      {id: 'intermediate', name: 'Intermediate'}, 
      {id: 'expert', name: 'Expert'}
    ];
    return list;
  }
}
