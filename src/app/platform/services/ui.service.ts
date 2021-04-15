import { Injectable, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';

// Components
import { UiDialogComponent } from 'src/app/platform/components/ui-dialog/ui-dialog.component';
import { MatSidenav } from '@angular/material/sidenav';

export class SplashData {
    show: boolean;
    status: boolean;
    message: Array<string>;

    constructor() {
        this.show = false;
        this.status = true;
        this.message = ['Cargando datos...'];
    }
}

/**
 * This service is in charge of managing on screen components that can be triggered from several other components. Like toasts, spinners, etc.
 */
@Injectable()
export class UiService {
    public spinner = new BehaviorSubject<boolean>(false);
    public splash = new BehaviorSubject<object>(new SplashData());
    public interfaseShow = new BehaviorSubject<boolean>(false);
    public toolbarTitle = new BehaviorSubject<string>('');
    public tabIndex = 0;
    public sidenav: MatSidenav;

    constructor(
        private router: Router,
        private location: Location,
        private matSnackBar: MatSnackBar,
        private uiDialog: MatDialog,
    ) {
        router.events.subscribe((val) => {
            if (val instanceof NavigationEnd){
                this.toolbarTitle.next(this.getTitleFromRoute());
            }
        });
    }

    /**
     * Set splash visibility
     */
    public splashShow(show: boolean, message?: Array<string>, status?: boolean): void {
        const splashData = new SplashData();

        splashData.show = show;
        splashData.status = (typeof status !== 'undefined') ? status : true;

        if (typeof message !== 'undefined') {
            splashData.message = message;
        }

        this.splash.next(splashData);
    }

    /**
     * Set sidenav component
     */

    public sidenavSet(sidenav: MatSidenav): void {
        this.sidenav = sidenav;
    }

    /**
     * Set sidenav visibility
     */
    public sidenavShow(status: boolean): void {
        if (status) {
            this.sidenav.open();
        } else {
            this.sidenav.close();
        }
    }

    /**
     * Shows a snack bar to display errors and messages.
     */
    public snackbarShow(message: string): void {
        this.matSnackBar.open(message, '', {duration: 1000 * 5});
    }

    /**
     * Set spinner visibility
     */
    public spinnerShow(value: boolean): void {
        this.spinner.next(value);
    }

    /**
     * Set interfase visibility
     */
    public interfaseSet(value: boolean): void {
        this.interfaseShow.next(value);
    }

    /**
     * Show a basic dialog
     */
    public dialogShow(title: string, message: string): void {
        this.uiDialog.open(UiDialogComponent, {
            width: '350px',
            data: {
                title: title,
                message: message,
                buttonCancelText: '',
                buttonConfirmText: 'Aceptar'
            }
        });
    }

    /**
     * Get the title form router
     */
    public getTitleFromRoute(): string {
        const currentPath = this.location.path();
        let currentTitle = '';

        this.router.config.map((value: any, index) => {
            if (('/' + value.path) === currentPath && value.data !== undefined) {
                currentTitle = value.data.title;
            } else {
                if (typeof value.path !== 'undefined'){
                    if ((value.path.split('/')).pop() === (currentPath.split('/')).pop()){
                        currentTitle = value.data.title;
                    }
                }
            }
        });

        return currentTitle;
    }
}
