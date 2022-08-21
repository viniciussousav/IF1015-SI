export default class UpdateCarRequest {
    
    model: string | undefined;
    year: string | undefined;

    constructor(model: string | undefined, year: string | undefined) {
        this.model = model;
        this.year = year;
    }
}