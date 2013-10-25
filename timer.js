(function(){
    var GO = 'space to start',
        WAIT = 'space to stop';
    
    function nap(number, len) {
       return (new Array(len - String(number).length + 1)).join('0') + number;
    }

    function Timer (target) {
        var _this = this;
            button = target.querySelector('.timer__button');

        this._status = target.querySelector('.timer__status');
        this._time = target.querySelector('.timer__time');
        this._status.innerText = GO;

        window.addEventListener('keydown', function(e) {
            if (_this._checkEvent(e)) {
                _this.stop();
            }
        }, false);
        
        window.addEventListener('keyup', function(e) {
            if(_this._checkEvent(e)) {
                _this.start();
            }
        }, false);
        button.addEventListener('click', function(){
            _this.stopAndClean();
            button.blur();
        }, false);
    }

    Timer.prototype.stopAndClean = function () {
        clearInterval(this._interval);
        this._setTimer(0);
        this._firstStart = false;
        this._status.innerText = GO;
    }

    Timer.prototype._checkEvent = function (e) {
        return e.keyCode === 32;
    }

    Timer.prototype.stop = function () {
        clearInterval(this._interval);

        if (!this._firstStart){
            this._setTimer(0);
        }
    }

    Timer.prototype.start = function () {
        this._firstStart = !this._firstStart;
        if(!this._firstStart){
            this._status.innerText = GO;
            return;
        }
        this._status.innerText = WAIT;
        this._startTimer = Date.now();
        this._interval = setInterval(this._setTimer.bind(this),10);
    }

    Timer.prototype._setTimer = function (time) {
        var t = time !== undefined ? time : (Date.now() - this._startTimer),
            ms = t % 1000,
            t = (t - ms) / 1000,
            s = t % 60,
            m = (t - s) / 60,
            st = nap(m, 1) + ':' + nap(s, 2) + ':' + nap(ms, 3);

        this._time.innerText = st;
    }

    window.addEventListener('load', function () {
        Array.prototype.forEach.call(document.querySelectorAll('.timer'), function (item) {
            new Timer(item);
        });
    }, false);
})();
