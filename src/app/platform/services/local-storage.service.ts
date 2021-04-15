import { Injectable, OnInit } from '@angular/core';

// Models
import { UserData } from 'src/app/platform/models/user';

/**
 * This service is in charge of managing the information that will only be required within the angular application.
 */
@Injectable()
export class LocalStorageService {
    constructor() {}

    /**
     * Retrieves a user from the local Storage.
     */
    public userGet(): UserData {
        const userData = localStorage.getItem('userdata');

        return userData ? Object.assign(new UserData(), JSON.parse(userData)) : userData;
    }

    /**
     * Saves a user into the local storage.
     */
    public userSet(user: UserData): void {
        localStorage.setItem('userdata', JSON.stringify(user));
    }

    /**
     * Remove the user information from the local storage.
     */
    public userRemove(): void {
        localStorage.removeItem('userdata');
    }

    /**
     * Retrieves a token from the local Storage.
     */
     public tokenGet(): string {
        return localStorage.getItem('token');
    }

    /**
     * Saves a token into the local storage.
     */
    public tokenSet(token: string): void {
        localStorage.setItem('token', token);
    }

    /**
     * Remove token from the local storage.
     */
    public tokenRemove(): void {
        localStorage.removeItem('token');
    }
}
