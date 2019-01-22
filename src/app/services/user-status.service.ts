import { Injectable } from '@angular/core';

@Injectable()
export class UserStatusService {

  constructor() { }

  getUserStatusValues() {
    //let list = [{en:'none'}, {en:'begineer'}, {en:'intermediate'}, {en:'expert'}];
    let list = [{ id: 'whitelisted', name: 'Whitelisted'}, 
      {id: 'blacklisted', name: 'Blacklisted'}
    ];
    return list;
  }

}
