import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

// Models
import { UserData } from 'src/app/platform/models/user';

/**
 * This class is in charge of managing data regarding users.
 */
@Injectable()
export class UserService {
    public user = new BehaviorSubject<UserData>(new UserData());

    constructor( ) { }
}
