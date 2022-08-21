import { Request, Response, Router } from "express";
import Automaker from "../models/Automaker";
import Car from "../models/Car";
import CreateAutomakerRequest from "../models/requests/CreateAutomakerRequest";
import CreateCarRequest from "../models/requests/CreateCarRequest";
import UpdateAutomakerRequest from "../models/requests/UpdateAutomakerRequest";
import UpdateCarRequest from "../models/requests/UpdateCarRequest";
import AutomakerRepository from "../repositories/automaker.repository";

const repository = new AutomakerRepository();

const automakerRouter = Router();

automakerRouter.route('/')
    .get((req: Request, res: Response) => {
        try {
            const automakers = repository.getAutomakers();
            return res.status(200).json({ automakers });
        }
        catch (error) {
            return res.status(500).json({ message: `A server error occured`, error });
        }
    })
    .post((req: Request, res: Response) => {
        try {
            const request: CreateAutomakerRequest = req.body;
            const automakers = repository.getAutomakers();

            if (automakers.find(a => a.name == request.name))
                return res.status(409).json({ message: `Already exists an Automaker with same name` });

            const newAutomaker = new Automaker(automakers.length + 1, request.name, request.country);
            repository.addAutomaker(newAutomaker);

            return res.status(201).json(newAutomaker);
        }
        catch (error) {
            return res.status(500).json({ message: `A server error occured`, error });
        }
    });

automakerRouter.route('/:automakerId')
    .get((req: Request, res: Response) => {
        try {
            const id = Number.parseInt(req.params.automakerId);
            const automaker = repository.getAutomakerById(id);

            if (!automaker)
                return res.status(404).json({ message: `Automaker with id ${id} not found` });

            return res.status(200).json(automaker);
        }
        catch (error) {
            return res.status(500).json({ message: `A server error occured`, error });
        }
    })
    .put((req: Request, res: Response) => {
        try {
            const id = Number.parseInt(req.params.automakerId);
            const automaker = repository.getAutomakerById(id);

            if (!automaker)
                return res.status(404).json({ message: `Automaker with id ${id} not found` });

            const request: UpdateAutomakerRequest = req.body;

            if (repository.getAutomakers().find(a => a.name === request.name && a.id !== id))
                return res.status(409).json({ message: `Already exists an Automaker with same name` });

            automaker.update(request.name, request.country);
            repository.updateAutomaker(automaker);

            return res.status(200).json({ message: `Automaker with id ${id} successfully updated` });
        }
        catch (error) {
            return res.status(500).json({ message: `A server error occured`, error });
        }
    })
    .delete((req: Request, res: Response) => {
        try {
            const id = Number.parseInt(req.params.automakerId);

            if (!repository.getAutomakerById(id))
                return res.status(404).json({ message: `Automaker with id ${id} not found` });

            repository.removeAutomaker(id);
            return res.status(200).json({ message: `Automaker with id ${id} successfully deleted` });
        }
        catch (error) {
            return res.status(500).json({ message: `A server error occured`, error });
        }
    })

automakerRouter.route('/:automakerId/cars')
    .get((req: Request, res: Response) => {
        try {
            const id = Number.parseInt(req.params.automakerId);
            const automaker = repository.getAutomakerById(id);

            if (!automaker)
                return res.status(404).json({ message: `Automaker with id ${id} not found` });

            return res.status(200).json({ cars: automaker.cars });
        }
        catch (error) {
            return res.status(500).json({ message: `A server error occured`, error });
        }
    })
    .post((req: Request, res: Response) => {
        try {
            const id = Number.parseInt(req.params.automakerId);
            const automaker = repository.getAutomakerById(id);

            if (!automaker)
                return res.status(404).json({ message: `Automaker with id ${id} not found` });

            const request: CreateCarRequest = req.body;

            if (automaker.cars.find(c => c.model === request.model))
                return res.status(409).json({ message: `Already exists an car with same model name` });

            const car: Car = new Car(automaker.cars.length + 1, request.model, request.year);
            repository.addCar(id, car);

            return res.status(201).json(car);
        }
        catch (error) {
            return res.status(500).json({ message: `A server error occured`, error });
        }
    });

automakerRouter.route('/:automakerId/cars/:carId')
    .get((req: Request, res: Response) => {
        try {
            const automakerId = Number.parseInt(req.params.automakerId);
            const automaker = repository.getAutomakerById(automakerId);

            if (!automaker)
                return res.status(404).json({ message: `Automaker with id ${automakerId} not found` });

            const carId = Number.parseInt(req.params.carId);
            const car = repository.getCar(automakerId, carId);

            if (!car)
                return res.status(404).json({ message: `Car with id ${carId} not found` });

            return res.status(200).json(car);
        }
        catch (error) {
            return res.status(500).json({ message: `A server error occured`, error });
        }
    })
    .put((req: Request, res: Response) => {
        try {
            const automakerId = Number.parseInt(req.params.automakerId);
            const automaker = repository.getAutomakerById(automakerId);

            if (!automaker)
                return res.status(404).json({ message: `Automaker with id ${automakerId} not found` });

            const carId = Number.parseInt(req.params.carId);
            const car = repository.getCar(automakerId, carId);

            if (!car)
                return res.status(404).json({ message: `Car with id ${carId} not found` });

            const request: UpdateCarRequest = req.body;

            if (automaker.cars.find(c => c.model === request.model && c.id !== carId))
                return res.status(409).json({ message: `Already exists an car with same model name` });

            car.update(request.model, request.year);
            repository.updateCar(automakerId, car);

            return res.status(200).json({ message: `Car with id ${carId} successfully updated` });
        }
        catch (error) {
            return res.status(500).json({ message: `A server error occured`, error });
        }
    })
    .delete((req: Request, res: Response) => {
        try {
            const automakerId = Number.parseInt(req.params.automakerId);

            if (!repository.getAutomakerById(automakerId))
                return res.status(404).json({ message: `Automaker with id ${automakerId} not found` });

            const carId = Number.parseInt(req.params.carId);

            if (!repository.getCar(automakerId, carId))
                return res.status(404).json({ message: `Car with id ${carId} not found` });

            repository.removeCar(automakerId, carId);
            return res.status(200).json({ message: `Car with id ${carId} successfully deleted` });
        }
        catch (error) {
            return res.status(500).json({ message: `A server error occured`, error });
        }
    })

export default automakerRouter;