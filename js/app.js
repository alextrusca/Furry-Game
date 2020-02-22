document.addEventListener('DOMContentLoaded', function () {

    document.addEventListener('keydown', function(event){
        game.turnFurry(event);
    });

//     const Furry = require('./furry.js')
//     const Coin = require('./coin.js')
//     const Game = require('./game.js')
//     const idSetInterval = require('./game.js')

    var idSetInterval;

    class Furry {
        constructor(x, y, direction) {
            this.x = 0;
            this.y = 0;
            this.direction = 'right';
        }
    }

    class Coin {
        constructor(x, y) {
            this.x = Math.floor(Math.random() * 10);
            this.y = Math.floor(Math.random() * 10);
        }
    }

    class Game {
        constructor(board, furry, coin, score) {
            this.board = document.querySelectorAll('#board div');
            this.furry = new Furry();
            this.coin = new Coin();
            this.score = 0;
            this.index = function(x,y) {
                return x + (y * 10);
            };
        };
        showFurry() {
            this.hideVisibleFurry();
            this.board[ this.index(this.furry.x, this.furry.y) ].classList.add('furry');
        };
        showCoin() {
            this.board[ this.index(this.coin.x, this.coin.y) ].classList.add('coin');
        };

        startGame(){
            idSetInterval = setInterval(function () {
                game.moveFurry();
            }, 250);
        };

        hideVisibleFurry() {
            for(var i = 0; i < this.board.length; i++){
                this.board[i].classList.remove('furry');
            }
        };

        moveFurry(){
            if(this.furry.direction === 'right') {
                this.furry.x = this.furry.x + 1;
            } else if(this.furry.direction === 'left') {
                this.furry.x = this.furry.x - 1;
            } else if(this.furry.direction === 'up') {
                this.furry.y = this.furry.y - 1;
            } else if(this.furry.direction === 'down') {
                this.furry.y = this.furry.y + 1;
            }

            this.gameOver();
            this.checkCoinCollision();
            this.showFurry();
            this.showCoin();
        };

        turnFurry(event) {
            event.which || event.keyCode
            switch (event.which) {
                case 37:
                    this.furry.direction = 'left';
                    break;
                case 38:
                    this.furry.direction = 'up';
                    break;
                case 39:
                    this.furry.direction = 'right';
                    break;
                case 40:
                    this.furry.direction = 'down';
                    break;
            }
        };

        checkCoinCollision(){
            if(this.furry.x === this.coin.x && this.furry.y === this.coin.y) {
                this.board[ this.index(this.coin.x, this.coin.y) ].classList.remove('coin');
                this.score ++;
                document.querySelector('#score strong').innerText = this.score;
                this.coin = new Coin();
                game.showCoin();
            }
        };

        gameOver(){
            if(this.furry.x < 0 || this.furry.x > 9 || this.furry.y < 0 || this.furry.y > 9) {
                this.hideVisibleFurry();
                function stopInterval(){
                    clearInterval(idSetInterval);
                }
                stopInterval();
                scoreDisplay.style.display = 'none';
                boardDisplay.style.display = 'none';
                document.querySelector('#over').style.display = 'inline-block';
                document.querySelector('#over strong').innerText = this.score;
                document.querySelector('#startGame').style.display = 'none';
            }

        };

    }


    const game = new Game();

    var scoreDisplay = document.querySelector('#score');
    var boardDisplay = document.querySelector('#board');
    var startButton = document.querySelector('#startGame')


    // game.startGame();
    // game.showCoin();
    // game.moveFurry();

    startButton.addEventListener('click', function () {
        game.startGame();
        game.showCoin();
        game.moveFurry();
    });

});
