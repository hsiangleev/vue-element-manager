
export function windowResize(time=500, callback) {
    var timer = null;
    var firstTime = true;
    window.addEventListener("resize",()=>{
        if (firstTime) {
            callback()
            return firstTime = false;
        }
        if (timer) {
            return false;
        }
        timer = setTimeout(function () {
            clearTimeout(timer);
            timer = null;
            callback()
        }, time)
    })
}
