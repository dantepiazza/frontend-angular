export class UserData {
    public id: number;
    public token: string;
    public username: string;
    public email: string;

    constructor() {
        this.id = 0;
        this.token = '';
        this.username = '';
        this.email = '';
    }

    /**
     * Returns true if the given user is valid.
     */
    isValid(): boolean {
        return this.id !== 0;
    }

    /**
     * Set user data
     */
    configData(parameters: any): void {
        for (let [key, value] of Object.entries(parameters)) {
            if (typeof Object.prototype.hasOwnProperty.call(parameters, key) !== 'undefined'){
                (this as any)[key] = value;
            }
        }
    }
}
