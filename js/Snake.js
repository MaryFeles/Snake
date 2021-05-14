let Snake = (function () {
    const SNAKE_HEAD_COLOR = '#9933ff';
    const SNAKE_BODY_COLOR = '#ceff34';

    const START_COORD = {
        x: SNAKEBOARD.width / 2,
        y: SNAKEBOARD.height / 2
    }

    let snake = {};

    let _drawSnakePart = function (snakePart, bodyColor) {
        ctx.fillStyle = bodyColor;
        ctx.fillRect(snakePart.x + 2, snakePart.y + 2, CELL_SIZE - 4, CELL_SIZE - 4);
    }

    return {
        createNewSnake: function () {
            snake.x = START_COORD.x;
            snake.y = START_COORD.y;
            snake.dx = 0;
            snake.dy = - CELL_SIZE;
            snake.body = [];
            snake.bodyParts = 4;
            snake.direction = "up";
        },

        setDirection: function (key) {
            switch (key) {
                case "ArrowUp":
                    if (snake.direction != "down") {
                        snake.direction = "up";

                        snake.dx = 0;
                        snake.dy = - CELL_SIZE;
                    }
                    break;
                case "ArrowRight":
                    if (snake.direction != "left") {
                        snake.direction = "right";

                        snake.dx = CELL_SIZE;
                        snake.dy = 0;
                    }
                    break;
                case "ArrowDown":
                    if (snake.direction != "up") {
                        snake.direction = "down";

                        snake.dx = 0;
                        snake.dy = CELL_SIZE;
                    }
                    break;
                case "ArrowLeft":
                    if (snake.direction != "right") {
                        snake.direction = "left";

                        snake.dx = - CELL_SIZE;
                        snake.dy = 0;
                    }
                    break;
            }
        },

        move: function () {
            snake.x += snake.dx;
            snake.y += snake.dy;

            snake.body.unshift({ x: snake.x, y: snake.y });

            if (snake.body.length > snake.bodyParts) {
                snake.body.pop();
            }
        },

        draw: function () {
            snake.body.forEach((bodyPart, index) => {
                let isSnakeHead = index == 0;

                if (isSnakeHead) {
                    _drawSnakePart(bodyPart, SNAKE_HEAD_COLOR);
                } else {
                    _drawSnakePart(bodyPart, SNAKE_BODY_COLOR);
                }
            });
        },

        foodEat: function () {
            let foodList = Food.getFoodList();

            snake.body.forEach(bodyPart => {
                foodList.forEach(typeFood => {
                    if (bodyPart.x === Food.getCoords(typeFood).x && bodyPart.y === Food.getCoords(typeFood).y) {

                        switch (typeFood) {
                            case 'plusSpeed':
                                snake.bodyParts++;
                                PlayState.increaseSpeed();
                                PlayState.increaseScore(typeFood);
                                break;
                            case 'minusSpeed':
                                snake.bodyParts++;
                                PlayState.decreaseSpeed();
                                PlayState.increaseScore(typeFood);
                                break;
                            case 'addOnePoint':
                                snake.bodyParts++;
                                PlayState.increaseScore(typeFood);
                                break;
                            case 'addFewPoints':
                                snake.bodyParts++;
                                PlayState.increaseScore(typeFood);
                                break;
                            default:
                                break;
                        }
                        Food.setCoords(typeFood);
                        Food.draw(typeFood);
                    }
                });
            });
        },

        bodyEat: function () {
            for (let i = 1; i < snake.body.length; i++) {
                if (snake.body[0].x == snake.body[i].x && snake.body[0].y == snake.body[i].y) {
                    return true;
                }
            }
        },

        clashWithWall: function () {
            let snakeHead = snake.body[0];
            return snakeHead.x < 0 ||
                snakeHead.y < 0 ||
                snakeHead.x > SNAKEBOARD.width - CELL_SIZE ||
                snakeHead.y > SNAKEBOARD.height - CELL_SIZE;
        },
    }

})();