import Automaker from "../models/Automaker";
import Car from "../models/Car";

export default class AutomakerRepository {

    automakersList: Automaker[] = []

    getAutomakers(): Automaker[] {
        return this.automakersList;
    }

    addAutomaker(newAutomaker: Automaker) {
        this.automakersList.push(newAutomaker);
    }

    updateAutomaker(updatedAutomaker: Automaker) {
        const index = this.automakersList.findIndex(a => a.id === updatedAutomaker.id);
        this.automakersList[index] = updatedAutomaker;
    }

    removeAutomaker(id: number) {
        const index = this.automakersList.findIndex(a => a.id === id);
        this.automakersList.splice(index, 1);
    }

    getAutomakerById(id: number): Automaker | undefined {
        return this.automakersList.find(a => a.id === id);
    }

    addCar(automakerId: number, car: Car) {
        const index = this.automakersList.findIndex(a => a.id === automakerId);
        this.automakersList[index].cars.push(car);
    }

    getCar(automakerId: number, carId: number) {
        const index = this.automakersList.findIndex(a => a.id === automakerId);
        return this.automakersList[index].cars.find(c => c.id === carId);
    }

    updateCar(automakerId: number, updatedCar: Car) {
        const automakerIndex = this.automakersList.findIndex(a => a.id === automakerId);
        const carIndex = this.automakersList[automakerIndex].cars.findIndex(c => c.id === updatedCar.id);
        this.automakersList[automakerIndex].cars[carIndex] = updatedCar;
    }

    removeCar(automakerId: number, carId: number) {
        const automakerIndex = this.automakersList.findIndex(a => a.id === automakerId);
        const carIndex = this.automakersList[automakerIndex].cars.findIndex(c => c.id === carId);
        this.automakersList[automakerIndex].cars.splice(carIndex, 1);
    }
}