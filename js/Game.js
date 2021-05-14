let Game = (function () {
    let speed = PlayState.getSpeed();
    let refreshSpeedGame;

    let refreshGame = function () {
        interval.clear(refreshSpeedGame);
        ctx.clearRect(0, 0, SNAKEBOARD.width, SNAKEBOARD.height);

        Snake.move();
        Snake.draw();
        Snake.foodEat();

        if (Snake.bodyEat() || Snake.clashWithWall()) {
            Game.stop();
            Modal.createWindow('losingWindow');
            return;
        }

        Food.draw('plusSpeed');
        Food.draw('minusSpeed');
        Food.draw('addOnePoint');
        Food.draw('addFewPoints');

        if (PlayState.getTime().min <= 0 && PlayState.getTime().sec <= 0) {
            Game.stop();
            Modal.createWindow('summaryWindow');
            return;
        }

        speed = PlayState.getSpeed();
        refreshSpeedGame = interval.make(() => refreshGame(), speed);
    }

    return {
        start: function () {
            PlayState.setState('start');
            PlayState.reset();
            speed = PlayState.getSpeed();
            Snake.createNewSnake();

            interval.make(() => refreshGame(), speed);

            Food.placeFood();
        },

        restart: function () {
            PlayState.setState('restart');
            Snake.createNewSnake();
            
            interval.clearAll();

            PlayState.setState('start');
            PlayState.reset();
            interval.make(() => refreshGame(), speed);
            Food.placeFood();
        },

        pause: function () {
            interval.clearAll();
            PlayState.setState('pause');
        },

        continue: function () {
            interval.clearAll();

            PlayState.setState('start');
            interval.make(() => refreshGame(), speed);
            Food.placeFood();
            PlayState.startTimer();
        },

        stop: function () {
            PlayState.setState('stop');
            btnStart.dataset.gameState = 'start';
            btnPause.disabled = true;

            interval.clearAll();
            Snake.createNewSnake();
        },
    }
})();