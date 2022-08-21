import Car from "./Car";

export default class Automaker {
    
    id: number;
    name: string;
    country: string;
    cars: Car[];

    constructor(id: number, name: string, country: string) {
        this.id = id;
        this.name = name;
        this.country = country;
        this.cars = [];
    }

    update(name: string | undefined, country: string | undefined){
        if (name) this.name = name;
        if (country) this.country = country;
    }
}