import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

// Services
import { ApiService } from 'src/app/platform/services/api.service';
import { LocalStorageService } from 'src/app/platform/services/local-storage.service';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    public authentication: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    public token: BehaviorSubject<string> = new BehaviorSubject('');

    constructor(
        private apiService: ApiService,
        private localStorageService: LocalStorageService,
    ) {
        this.loginVerification();
    }

    authenticationGet(): boolean {
        return this.authentication.value;
    }
    /**
     * Verify that there is a session started
     */
    loginVerification(account?: string): boolean {
        const token = this.localStorageService.tokenGet();

        if (typeof token !== 'undefined' && token != null && token !== '') {
            this.authentication.next(true);

            return true;
        }

        return false;
    }

    /**
     * Call the api to request a JWT type session token
     */
    userLogin(user: string, password: string): Promise<any> {
        const headers = {
            'Content-Type': 'application/x-www-form-urlencoded'
        };

        const data = {
            user,
            password
        };

        const promise = new Promise((resolve, reject) => {
            this.apiService.request('post', 'auth/login/', data, headers).toPromise().then((success: any) => {
                if (success.status) {
                    this.authentication.next(true);
                    this.localStorageService.tokenSet(success.data.token);

                    resolve(this.apiService.successDataPrepare(success.data.message, success));
                } else {
                    reject(this.apiService.errorDataPrepare(success.data.message, success));
                }
            }, (error) => {
                reject(this.apiService.errorDataPrepare(error.data.message, error));
            });
        });

        return promise;
    }

    /**
     * Call the api to delete the current session
     */

    userLogout(): Promise<any> {
        const headers = {
            'Content-Type': 'application/x-www-form-urlencoded',
        };

        const promise = new Promise((resolve, reject) => {
            this.apiService.request('post', 'auth/logout/', {}, headers).toPromise().then((success: any) => {
                if (success.status) {
                    this.authentication.next(false);
                    this.localStorageService.tokenRemove();

                    resolve(this.apiService.successDataPrepare(success.data.message, success));
                } else {
                    reject(this.apiService.errorDataPrepare(success.data.message, success));
                }
            }, (error) => {
                reject(this.apiService.errorDataPrepare(error.data.message, error));
            });
        });

        return promise;
    }

    /**
     * Call the api to send an email with a token to request a new password
     */
    userPasswordRecover(email: string): Promise<any> {
        const data = {
          email
        };

        const promise = new Promise((resolve, reject) => {
            this.apiService.request('post', 'auth/recover' + email, data).toPromise().then((success: any) => {
                if (success.response.status) {
                    resolve(this.apiService.successDataPrepare(success.response.message, success));
                } else {
                    reject(this.apiService.errorDataPrepare(success.response.message, success));
                }
            }, (error) => {
                reject(this.apiService.errorDataPrepare(error.response.message, error));
            });
        });

        return promise;
    }

    /**
     * Call the api to generate a new password for the user and send it by email
     */
    userPasswordRestore(token: string): Promise<any> {
        const data = {
          token
        };

        const promise = new Promise((resolve, reject) => {
            this.apiService.request('post', 'auth/restore', data).toPromise().then((success: any) => {
                if (success.response.status) {
                    resolve(this.apiService.successDataPrepare(success.response.message, success));
                } else {
                    reject(this.apiService.errorDataPrepare(success.response.message, success));
                }
            }, (error) => {
                reject(this.apiService.errorDataPrepare(error.response.message, error));
            });
        });

        return promise;
    }
}
