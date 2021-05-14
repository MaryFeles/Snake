let PlayState = (function () {
    const MINUTES = 0;
    const SECONDS = 30;
    const NORMAL_GAME_SPEED = 400;
    const INCREASED_GAME_SPEED = 100;
    const DECREASED_GAME_SPEED = 9000;

    let speedTimeout;

    let _score = document.querySelector('.score');
    let _timer = document.querySelector('.timer');

    let playState = {
        game: 'stop',
        score: 0,
        timer: {
            min: MINUTES,
            sec: SECONDS
        },

        gameSpeed: NORMAL_GAME_SPEED,
    };

    return {
        reset: function () {
            playState.score = 0;
            playState.timer.min = MINUTES;
            playState.timer.sec = SECONDS;
            playState.gameSpeed = NORMAL_GAME_SPEED;

            _score.textContent = playState.score;

            this.setTimer();
            this.startTimer();
        },

        setTimer: function () {
            let min = playState.timer.min;
            let sec = playState.timer.sec;
            _timer.textContent = (min < 10 ? "0" + min : min) + ":" + (sec < 10 ? "0" + sec : sec);
        },

        increaseScore: function (typeFood) {
            let numberOfpoints = Food.getNumberOfPoints(typeFood);
            
            playState.score+=numberOfpoints;
            _score.textContent = playState.score;
        },

        increaseSpeed: function () {
            clearTimeout(speedTimeout);
            playState.gameSpeed = INCREASED_GAME_SPEED;

            speedTimeout = setTimeout(() => {
                playState.gameSpeed = NORMAL_GAME_SPEED;
            }, 5000);
        },

        decreaseSpeed: function () {
            clearTimeout(speedTimeout);
            playState.gameSpeed = DECREASED_GAME_SPEED;

            speedTimeout = setTimeout(() => {
                playState.gameSpeed = NORMAL_GAME_SPEED;
            }, 5000);
        },

        getScore: function () {
            return playState.score;
        },

        getSpeed: function () {
            return playState.gameSpeed;
        },

        getTime: function () {
            return playState.timer;
        },

        startTimer: function () {
            let min = playState.timer.min;
            let sec = playState.timer.sec;

            let start = function () {
                sec--;

                if (sec == 0 && min > 0) {
                    min--;
                    sec = 60;
                }

                playState.timer.min = min;
                playState.timer.sec = sec;

                PlayState.setTimer();
            };

            interval.make(() => start(), 1000);
        },

        setState: function (state) {
            playState.game = state;
        },

        getState: function () {
            return playState.game;
        },
    }
})();