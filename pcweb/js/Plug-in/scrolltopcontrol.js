function ScrollTop(){
    this.dis = $(document).scrollTop();
    this.timer = null;
    this.interval = 3000;
    this.speed = this.dis/this.interval*30;
}
ScrollTop.prototype.move = function(){
    var that = this;
    this.timer = setInterval(function(){
        that.dis -= that.speed;
        if(that.dis <= 0){
            clearInterval(that.timer);
        }
        $(document).scrollTop(that.dis);

    });
};
