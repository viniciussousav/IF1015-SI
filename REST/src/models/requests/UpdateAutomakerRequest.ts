export default class UpdateAutomakerRequest {
    
    name: string | undefined;
    country: string | undefined;

    constructor(name: string | undefined, country: string | undefined) {
        this.name = name;
        this.country = country;
    }
}