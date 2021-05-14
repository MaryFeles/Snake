let Modal = (function () {
    let modal = {
        welcomWindow: {
            content: `
                Цель игры: за выделенное время собрать максимальное количество еды.<br/><br/>
                    <div class="description">
                        <div class="redCircle"></div>&nbsp;&ndash; даёт одно очко;
                    </div><br/>
                    <div class="description">
                        <div class="greenCircle"></div>&nbsp;&ndash; даёт одно очко и увеличивает скорость;
                    </div><br/>
                    <div class="description">
                        <div class="cyanCircle"></div>&nbsp;&ndash; даёт пять очков;
                    </div><br/>
                        <div class="description">
                    <div class="blueCircle"></div>&nbsp;&ndash; даёт одно очко и уменьшает скорость.
                    </div>
                <br/>Управление осуществляется стрелками на клавиатуре.
            `,
            buttonText: "Начать",
            modifier: "welcomWindow",
        },
        summaryWindow: {
            content: "Время вышло! Ваш счет: ",
            buttonText: "Закрыть",
            modifier: "summaryWindow",
        },
        losingWindow: {
            content: "Вы проиграли!",
            buttonText: "Закрыть",
            modifier: "loseWindow",
        }
    };

    let _gameContainer = document.querySelector('.game-container');

    let toggleCover = function () {
        let _cover = document.querySelector('.cover');

        if (_cover.dataset.cover == 'opened') {
            _cover.dataset.cover = 'hidden';
        } else _cover.dataset.cover = 'opened';
    };

    let createHtml = function (content, buttonText, modifier) {
        let _modal = document.createElement("div");
        _modal.classList.add('modal');
        _modal.innerHTML = `
            <div class="modal__content">${content}</div>
            <button class="btn modal__btn modal__btn--${modifier}" onclick="Modal.close()">${buttonText}</button>
        `;
        document.body.insertBefore(_modal, _gameContainer);
        toggleCover();
    };

    return {
        createWindow: function (type) {
            let content = '';
            let buttonText = '';
            let modifier = '';

            content = modal[type].content;
            buttonText = modal[type].buttonText;
            modifier = modal[type].modifier;

            if (type == 'summaryWindow') {
                if (PlayState.getScore() < 5) {
                    content = modal.summaryWindow.content + PlayState.getScore() + ". <br/><br/> Pезультат оставляет желать лучшего... <br/>";
                } else if (PlayState.getScore() >= 5 && PlayState.getScore() <= 20) {
                    content = "Поздравляю! Вы набрали " + PlayState.getScore() + " очков!";
                } else content = modal.summaryWindow.content + PlayState.getScore();
            }

            createHtml(content, buttonText, modifier);
        },

        close: function () {
            let _modal = document.querySelector('.modal');
            _modal.remove();
            toggleCover();
        },
    }
})();

Modal.createWindow('welcomWindow');

