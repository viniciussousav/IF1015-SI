export default class CreateCarRequest {
    
    model: string;
    year: string;

    constructor(model: string, year: string) {
        this.model = model;
        this.year = year;
    }
}