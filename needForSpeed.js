function needForSpeed (input) {

    let cars = Number(input.shift());
    let carsObject = {};
    
    while (cars > 0) {
        cars--;

        let [make, milleage, fuel] = input.shift().split('|');
        milleage = Number(milleage);
        fuel = Number(fuel);

        if (!carsObject.hasOwnProperty(make)) {
            carsObject[make] = {
                milleage: milleage,
                fuel: fuel
            }

        } else {
            carsObject[make].milleage += milleage;
            carsObject[make].fuel += fuel;
        }
        
    }

    while (input[0] !== 'Stop') {
        let tokens = input.shift().split(' : ');
        
        let [command, make, range, fuel] = tokens;
        range = Number(range);
        fuel = Number(fuel);
        
        if (command === 'Drive') {
            if (carsObject.hasOwnProperty(make)) {
                if (carsObject[make].fuel <= fuel) {
                    console.log(`Not enough fuel to make that ride`);

                } else {
                    carsObject[make].milleage += range;
                    carsObject[make].fuel -= fuel;
                    console.log(`${make} driven for ${range} kilometers. ${fuel} liters of fuel consumed.`);
                }
                if (carsObject[make].milleage >= 100000) {
                    console.log(`Time to sell the ${make}!`);
                    delete carsObject[make];
                }
            }
        } else if (command === 'Refuel') {
            if (carsObject.hasOwnProperty(make)) {
                console.log(`${make} refueled with ${range} liters`);
                carsObject[make].fuel += range;
                if (carsObject[make].fuel > 75) {
                    range -= 75;
                    carsObject[make].fuel += range;
                }
            }

        } else if (command === 'Revert') {
            if (carsObject.hasOwnProperty(make)) {
                carsObject[make].milleage -= range;
                console.log(`${make} mileage decreased by ${range} kilometers`);
            }
            if (carsObject[make].milleage < 10000) {
                carsObject[make].milleage = 10000;
            }
        }
    }
    let entries = Object.entries(carsObject);
    
    for (let [car, others] of entries) {
        console.log(`${car} -> Mileage: ${others.milleage} kms, Fuel in the tank: ${others.fuel} lt.`);
    }
}

needForSpeed (['3',
            'Audi A6|38000|62',
            'Mercedes CLS|11000|35',
            'Volkswagen Passat CC|45678|5',
            'Drive : Audi A6 : 543 : 47',
            'Drive : Mercedes CLS : 94 : 11',
            'Drive : Volkswagen Passat CC : 69 : 8',
            'Refuel : Audi A6 : 50',
            'Revert : Mercedes CLS : 500',
            'Revert : Audi A6 : 30000',
            'Stop']);

            console.log('----');

needForSpeed ([
    '4',
    'Lamborghini Veneno|11111|74',
    'Bugatti Veyron|12345|67',
    'Koenigsegg CCXR|67890|12',
    'Aston Martin Valkryie|99900|50',
    'Drive : Koenigsegg CCXR : 382 : 82',
    'Drive : Aston Martin Valkryie : 99 : 23',
    'Drive : Aston Martin Valkryie : 2 : 1',
    'Refuel : Lamborghini Veneno : 40',
    'Revert : Bugatti Veyron : 2000',
    'Stop']);