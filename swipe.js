var events = require('touchdown')
,   findPos = require('./findPosition')
,   getCSS = require('./getCSS')
;

module.exports = function(el){

    el.touchdown = [];

    var clockswise = [];
    var quadrants = [];
    var points = [];
    var w = getCSS(el, 'width').primitive.val;
    var h = getCSS(el, 'height').primitive.val;	
    var p = findPos(el)
    ,   SWITCH = false
    ,   LEFT = false, TOP = false
    ,   clockwise = undefined
    ,   quad = undefined
    ,   degree = 0
    ,   pad = 25
    ,   lastPoint = [];
    ;

    el.center = [p[0] + (w/2), p[1] + (h/2)]

    el.zero = [el.center[0] + w / 2, el.center[1]]
    el._b = el.center[1] - ( h / 2 ) ;
    events.start(el);

    el.addEventListener('touchdown', touchdown)
    el.addEventListener('deltavector', vectorChange)
    el.addEventListener('liftoff', liftoff)

    function touchdown(e){
	var event = e.detail;
	var el = this;

	var point = [e.detail.x, e.detail.y]
        lastPoint = point.slice(0);
	var a = distance(el.zero, point);
	var b = distance(el.zero, el.center);
	var c = distance(point, el.center);
	var angle = 360 - getAngle(a,b,c);
        el.lastAngle = angle;
	el.touchdown = [e.detail.x, e.detail.y];
	var evt = new CustomEvent('spinstart', { cancelable: true, bubbles: true, detail : event});
	this.dispatchEvent(evt);
	quad = getQuadrant(point, el.center)
    }
    
    function vectorChange(e){
	
	var event = e.detail;
	var el = this;

	var point = [e.detail.x, e.detail.y]
	var lq = quad;

        quad = getQuadrant(point, el.center);

	var a = distance(el.zero, point);
	var b = distance(el.zero, el.center);
	var c = distance(point, el.center);
	var angle = (quad==1||quad==2) ?  360 - getAngle(a,b,c) : getAngle(a,b,c);

        var la = el.lastAngle;

	var a = distance(lastPoint, point);
	var b = distance(lastPoint, el.center);
	var c = distance(point, el.center);

	degree += getAngle(a,b,c) * el.clockwise;
	
	var evt = new CustomEvent('spin', { cancelable: true, bubbles: true, detail : event});
	el.lastAngle = angle;
	evt.detail.degree = degree;
	evt.detail.clockwise = el.clockwise;
	evt.detail.lastPoint = lastPoint.slice(0);
	lastPoint = point.slice(0);	

	evt.detail.delta = getAngle(a,b,c) * el.clockwise

        this.dispatchEvent(evt);

    }
    
    function liftoff(e){
	var event = e.detail;
	var el = this;
	var evt = new CustomEvent('spinstop', { cancelable: true, bubbles: true, detail : event});
	this.dispatchEvent(evt);
    }

}

function getAngle(a,b,c){ // solve for angle A in degrees

	var x = (Math.pow(b, 2) + Math.pow(c, 2) - Math.pow(a, 2)) / (2 * (b * c));

	return Math.acos(x) * (180/Math.PI)

};


function distance(p1, p2){
	return Math.sqrt(
		Math.pow(p2[0] - p1[0], 2) +
		Math.pow(p2[1] - p1[1], 2)
	)
};

function getQuadrant(point, center){
  if(point[0] < center[0]){
    if(point[1] < center[1]) return 2
    else return 4
  }
  else{
    if(point[1] < center[1]) return 1
    else return 3 
  }
};
