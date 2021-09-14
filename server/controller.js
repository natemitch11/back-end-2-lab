let houses = require('./db.json');
let id = 4

module.exports = {
    getHouses: (req, res) =>{
        res.status(200).send(houses)
    },
    createHouse: (req, res) => {
        let {address, price, imageURL} = req.body;
        console.log(req.body)
        let house = {
            id: id,
            address,
            price: +price,
            imageURL
        }
        console.log(house)
        id++;
        houses.push(house)
        res.status(200).send(houses)
    },
    updateHouse: (req, res) => {
        let {id} = req.params;
        let {type} = req.body;
        let index = houses.findIndex(elem => elem.id === +id);
        let housePrice = houses[index].price

        if (housePrice <= 0 && type === 'minus') {
            return res.status(400).send('Price cannot got below 0')
        }
        else if (type === 'minus') {
            if (housePrice >=10000){
                houses[index].price -= 10000   
            }
            else if (housePrice <10000){
                houses[index].price -= housePrice;
            }
            return res.status(200).send(houses)
        }
        else {
            houses[index].price +=10000
            return res.status(200).send(houses)
        }
    },
    deleteHouse: (req, res) => {
        let {id} = req.params;
        let index = houses.findIndex(elem => elem.id === +id);
        houses.splice(index, 1);
        res.status(200).send(houses);
    }
};