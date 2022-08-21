export default class Car {
    
    id: number;
    model: string;
    year: string;

    constructor(id: number, model: string, year: string) {
        this.id = id;
        this.model = model;
        this.year = year;
    }

    update(model: string | undefined, year: string | undefined){
        if (model) this.model = model;
        if (year) this.year = year;
    }
}