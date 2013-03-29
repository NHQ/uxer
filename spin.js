var events = require('touchdown')
,   findPos = require('./findPosition')
,   getCSS = require('./getCSS')
;

module.exports = function(el){

	el.touchdown = [];

	var w = getCSS(el, 'width').primitive.val;
	var h = getCSS(el, 'height').primitive.val;	
	var p = findPos(el)
	,   clockwise = undefined
	,   degree = 0
	,   pad = 25
	;
	el.center = [p[0] + (w/2), p[1] + (h/2)]

  events.start(el);

  el.addEventListener('touchdown', touchdown)
  el.addEventListener('vector', vectorChange)
  el.addEventListener('liftoff', liftoff)

	function touchdown(e){
		var event = e.detail;
		var el = this;
		el.touchdown = [e.detail.x, e.detail.y];
		var evt = new CustomEvent('spinstart', { cancelable: true, bubbles: true, detail : event});
    this.dispatchEvent(evt);

	}
	
	function vectorChange(e){
		var event = e.detail;
		var el = this;
		var vector = el.vector = event.vector;
    var point = [e.detail.x, e.detail.y]
		var a = distance(event.lastPoint, point);
		var b = distance(event.lastPoint, el.center);
		var c = distance(point, el.center);
		if(point[1] < el.center[1] - pad){
			if(vector[0] < 0){
				clockwise = -1
			}
			else if (vector[0] > 0){
				clockwise = 1
			}
			else if(vector[0] == 0){
				if(point[0] < el.center[0]){
					if(vector[1] > 0){
						clockwise = -1
					}
					else{
						clockwise = 1
					}
				}
				else 	if(point[0] > el.center[0]){
					if(vector[1] > 0){
						clockwise = 1
					}
					else{
						clockwise = -1
					}
				}
			}
		}
		else if(point[1] > el.center[1] + pad){
			if(vector[0] < 0){
				clockwise = 1
			}
			else if(vector[0] > 0){
				clockwise = -1
			}
			else{
				if(point[0] < el.center[0]){
					if(vector[1] > 0){
						clockwise = -1
					}
					else{
						clockwise = 1
					}
				}
				else{
					if(vector[1] > 0){
						clockwise = 1
					}
					else{
						clockwise = -1
					}
				}
			}	
		}
		else{
			if(point[0] < el.center[0]){
				if(vector[1] > 0){
					clockwise = -1
				}
				else if(vector[1] < 0){
					clockwise = 1
				}
				else{
					if(vector[0] < el.center[0]){
						if(vector[0] > 0){
							clockwise = 1
						}
						else{
							clockwise = -1
						}
					}
					else{
						if(vector[0] < 0){
							clockwise = -1
						}
						else{
							clockwise = 1
						}
					}
				}
			}
			else{
				if(vector[1] > 0){
					clockwise = 1
				}
				else{
					clockwise = -1
				}
			}
		}
		
		degree += getAngle(a,b,c) * clockwise
				
		var evt = new CustomEvent('spin', { cancelable: true, bubbles: true, detail : event});
		
		evt.detail.degree = degree;
		evt.detail.clockwise = clockwise
		evt.detail.degreeChange = getAngle(a,b,c) * clockwise
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
}