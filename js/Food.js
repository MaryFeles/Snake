let Food = (function () {

    let food = {
        addOnePoint: {
            coords: getRandomCoord(),
            color: '#ff0000',
            interval: 20000,
            givesPoints: 1,
        },

        plusSpeed: {
            coords: getRandomCoord(),
            color: '#00ff00',
            interval: 5500,
            givesPoints: 1,
        },

        minusSpeed: {
            coords: getRandomCoord(),
            color: '#0000ff',
            interval: 2000,
            givesPoints: 1,
        },

        addFewPoints: {
            coords: getRandomCoord(),
            color: '#ffff00',
            interval: 2000,
            givesPoints: 5,
        },
    };

    return {
        getCoords: function (foodType) {
            return food[foodType].coords;
        },

        setCoords: function(foodType) {
            food[foodType].coords = getRandomCoord();
        },

        setCoordsforAllFood: function () {
            let foodList = this.getFoodList();

            foodList.forEach(foodType => {
                this.setCoords(foodType);
            });
        },

        getFoodList: function () {
            let foodList = [];

            for (let prop in food) {
                foodList.push(prop);
            }

            return foodList;
        },

        getNumberOfPoints: function(typeFood) {
            return food[typeFood].givesPoints;
        },

        draw: function (foodType) {
            let coords = food[foodType].coords;

            ctx.fillStyle = food[foodType].color;
            ctx.beginPath();
            ctx.arc(coords.x + CELL_SIZE / 2, coords.y + CELL_SIZE / 2, CELL_SIZE / 2 - 2, 0, 2 * Math.PI);
            ctx.fill();
        },

        placeFood: function () {
            this.setCoordsforAllFood();

            if (PlayState.getState() == 'start') {
                let foodList = this.getFoodList();

                foodList.forEach(foodType => {
                    let setNewCoords = function () {
                        food[foodType].coords = getRandomCoord();
                    };

                    interval.make(() => setNewCoords(), food[foodType].interval);
                });
            } else {
                interval.clearAll();
            };
        },

        stopRendering: function () {
            interval.clearAll();
        },
    }
})();

