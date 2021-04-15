import { Injectable, OnInit, HostListener } from '@angular/core';
import { Location } from '@angular/common'
import { BehaviorSubject } from 'rxjs';
import { EventEmitter } from 'events';

@Injectable()
export class PlatformService {
    public screen = new BehaviorSubject<object>({
        width: window.innerWidth,
        height: window.innerHeight
    });

    public events: EventEmitter = new EventEmitter();

    constructor(
        private location: Location
    ) {}

    /**
     * Assign to an observable variable, the size of the screen when resizing.
     */
    onWindowResize(event: any): void {
        this.screen.next({
            width: event.target.innerWidth,
            height: event.target.innerHeight
        });
    }

    /**
     * Navigate backwards in the browser
     */
    onBack(): void {
        this.location.back();
    }

    /**
     * Converts the first letter of the first word to uppercase
     */
    capitalize(str: string, lower: boolean = true): string{
        return (lower ? str.toLowerCase() : str).replace(/(?:^|\s|["'([{])+\S/g, match => match.toUpperCase());
    }

    /**
     * Verify that it is an email
     */
    isEmail(email: string): boolean{
        const validate = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

        return validate.test(email);
    }

    /**
     * Validate a CUIT number
     */
    validateCUIT(cuit: string): any{
        if (cuit === null || cuit === ''){
            return 'Por favor, ingrese un CUIT/DNI válido';
        }

        if (cuit.length !== 8 && cuit.length !== 11) {
            return 'Por favor, ingrese un CUIT/DNI válido';
        }

        if (cuit.length === 8) {
            return true;
        }

        const mult = new Array(5, 4, 3, 2, 7, 6, 5, 4, 3, 2);
        let total = 0;

        for (let i = 0; i < mult.length; i++) {
            total += parseInt(cuit[i]) * mult[i];
        }

        const resto = total % 11;
        const calculado = resto === 0 ? 0 : resto === 1 ? 9 : 11 - resto;
        const digito = parseInt(cuit[10]);

        if (calculado === digito) {
            return true;
        }
        else{
            return 'El CUIT/DNI ingresado no es válido.';
        }
    }

    /**
     * Validate a CBU number
     */
    validateCBU(cbu: string): any {
        try{
            cbu = cbu.replace('-', '').replace('/', '').replace('(', '').replace(')', '');

            if (cbu.length !== 22 || cbu === "0000000000000000000000"){
                return 'Por favor, ingrese el CBU correctamente';
            }

            const ponderador = '97139713971397139713971397139713';

            let i: any;
            let nDigito: any;
            let nPond: any;
            let bloque1: any;
            let bloque2: any;

            let nTotal = 0;

            bloque1 = '0' + cbu.substring(0, 7);

            for (i = 0; i <= 7; i++) {
                nDigito = bloque1.charAt(i)
                nPond = ponderador.charAt(i)
                nTotal = nTotal + (nPond * nDigito) - ((Math.floor(nPond * nDigito / 10)) * 10)

                if (isNaN(nTotal)) {
                    return 'Por favor, ingrese el CBU correctamente';
                }
            }

            i = 0;

            while (((Math.floor((nTotal + i) / 10)) * 10) !== (nTotal + i)) {
                i = i + 1;
            }

            // i = digito verificador

            if (cbu.substring(7, 8) !== i){
                return 'Por favor, ingrese un CBU válido';
            }

            nTotal = 0;

            bloque2 = '000' + cbu.substring(8, 21);

            for (i = 0; i <= 15; i++) {
                nDigito = bloque2.charAt(i);
                nPond = ponderador.charAt(i);
                nTotal = nTotal + (nPond * nDigito) - ((Math.floor(nPond * nDigito / 10)) * 10);
            }

            i = 0;

            while (((Math.floor((nTotal + i) / 10)) * 10) !== (nTotal + i)) {
                i = i + 1;
            }

            // i = Verificator digit

            if (cbu.substring(21, 22) !== i) {
                return 'Por favor, ingrese un CBU válido';
            }

            return true;
        }
        catch (ex){
            return 'Por favor, ingrese un CBU válido';
        }
    }

    /**
     * Validate that a number has between 10 and 11 digits allowing initial 0
     */
    validatePhone(telefono: string): boolean {
        return RegExp(/^[0-9]{10}([0-9]{1})?$/).test(telefono);
    }

    /**
     * Validate a card number
     */
    validateCardNumber(numero: string): boolean {
        numero = String(numero);

        if (numero.length <= 0 && numero.length < 12){
            return false;
        }

        numero = numero.replace(/\s/g, '');

        const ultimoDigito: number = Number(numero[numero.length - 1]);
        const numeroInvertido: number[] = numero.slice(0,numero.length - 1).split('').reverse().map(x => Number(x));

        for (let i = 0; i <= numeroInvertido.length - 1; i += 2){
            numeroInvertido[i] = numeroInvertido[i] * 2;
            if (numeroInvertido[i] > 9){
                numeroInvertido[i] = numeroInvertido[i] - 9;
            }
        }

        const sumaDigitos = numeroInvertido.reduce((valorPrevio, valorActual) => (valorPrevio + valorActual), 0);

        return ((sumaDigitos + ultimoDigito) % 10 === 0);
    }
}
