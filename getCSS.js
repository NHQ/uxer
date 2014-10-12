module.exports = function(el, param){

    var propValue = window.getComputedStyle(el).getPropertyCSSValue(param)
		if(!propValue) throw new Error("No prop valueValue. Is the element appended to the document yet?")
		if(!propValue) return false
    var valueType = '';
    for(var b in propValue.__proto__){
			try{
      if(propValue.__proto__[b] == propValue.cssValueType) {
				valueType = b;
				break;
			}}catch(err){console.log(param, propValue.cssValueType, b)}
		};


    switch(valueType.toLowerCase()){
    case 'cssvaluelist':
	var l = propValue.length;
        var obj = {};
	obj.type = 'cssPrimitiveValue'
	obj.value = Array.prototype.slice.call(propValue).map(function(x){ return CSSGetPrimitiveValue(x)});
        return obj;
	break;
    case 'cssprimitivevalue':
	return {type: 'cssPrimitiveValue', value : CSSGetPrimitiveValue(propValue)};
	break;
    case 'svgpaint':
	return {type: 'SVGPaint', value : CSSGetPrimitiveValue(propValue)};
	break;
	 default:
	return {type: 'cssValue', primitive: CSSGetPrimitiveValue(propValue), value : {unit: '', type: propValue.cssValueType, val: propValue.cssText}};
	break;
    }

};

function CSSGetPrimitiveValue(value) {
		try {

				var valueType = value.primitiveType;

			  if (CSSPrimitiveValue.CSS_PX == valueType) {
					return {class: CSSPrimitiveValue.CSS_PX, unit : 'px', type: 'float', val : value.getFloatValue (valueType)};
			  }

			  if (valueType == CSSPrimitiveValue.CSS_NUMBER) {
					return {class: CSSPrimitiveValue.CSS_NUMBER, unit : '', type: 'float', val : value.getFloatValue (valueType)};
			  }

			  if (valueType == CSSPrimitiveValue.CSS_PERCENTAGE) {
					return {class: CSSPrimitiveValue.CSS_PERCENTAGE, unit : '%', type: 'float', val : value.getFloatValue (valueType)};
			  }

			  if (CSSPrimitiveValue.CSS_EMS == valueType) {
					return {class: CSSPrimitiveValue.CSS_EMS, unit : 'em', type: 'float', val : value.getFloatValue (valueType)};
			  }

			  if (CSSPrimitiveValue.CSS_CM == valueType) {
					return {class: CSSPrimitiveValue.CSS_CM, unit : 'cm', type: 'float', val : value.getFloatValue (valueType)};
			  }

			  if (CSSPrimitiveValue.CSS_IDENT == valueType) {
					return {class: CSSPrimitiveValue.CSS_IDENT, unit : '', type: 'string', val : value.getStringValue (valueType)};
			  }

			  if (CSSPrimitiveValue.CSS_EXS == valueType) {
					return {class: CSSPrimitiveValue.CSS_EXS, unit : 'ex', type: 'float', val : value.getFloatValue (valueType)};
			  }

			  if (CSSPrimitiveValue.CSS_IN == valueType) {
					return {class: CSSPrimitiveValue.CSS_IN, unit : 'in', type: 'float', val : value.getFloatValue (valueType)};
			  }

			  if (CSSPrimitiveValue.CSS_MM == valueType) {
					return {class: CSSPrimitiveValue.CSS_MM, unit : 'mm', type: 'float', val : value.getFloatValue (valueType)};
			  }

			  if (CSSPrimitiveValue.CSS_PC == valueType) {
					return {class: CSSPrimitiveValue.CSS_PC, unit : 'pc', type: 'float', val : value.getFloatValue (valueType)};
			  }

			  if (CSSPrimitiveValue.CSS_PT == valueType) {
					return {class: CSSPrimitiveValue.CSS_PT, unit : 'pt', type: 'float', val : value.getFloatValue (valueType)};
			  }

			 	if (valueType == CSSPrimitiveValue.CSS_DIMENSION){
					return {class: CSSPrimitiveValue.CSS_DIMENSION, unit : '', type: 'float', val : value.getFloatValue (valueType)};
				}

			  if (CSSPrimitiveValue.CSS_STRING <= valueType && valueType <= CSSPrimitiveValue.CSS_ATTR) {
			     return {unit : '', type: 'string', val: value.getStringValue (valueType)};
			  }

			  if (valueType == CSSPrimitiveValue.CSS_COUNTER) {
			    var counterValue = value.getCounterValue ();
					return {
						class: CSSPrimitiveValue.CSS_COUNTER,
						unit: '',
						type: 'counter',
						val : {
							identifier: counterValue.identifier,
							listStyle: counterValue.listStyle,
							separator: counterValue.separator
						}};
			   }

			   if (valueType == CSSPrimitiveValue.CSS_RECT) {
			      var rect = value.getRectValue ()
			       	,	topPX = rect.top.getFloatValue (CSSPrimitiveValue.CSS_PX)
			       	,	rightPX = rect.right.getFloatValue (CSSPrimitiveValue.CSS_PX)
			       	,	bottomPX = rect.bottom.getFloatValue (CSSPrimitiveValue.CSS_PX)
			       	,	leftPX = rect.left.getFloatValue (CSSPrimitiveValue.CSS_PX)
						;
						return {
							class: CSSPrimitiveValue.CSS_RECT,
							unit: 'px',
							type: 'rect',
							val: {
								top: topPX,
								right: rightPX,
								bottom: bottomPX,
								left: leftPX
							}};
			   }

			   if (valueType == CSSPrimitiveValue.CSS_RGBCOLOR) {
			      var rgb = value.getRGBColorValue ()
			       	,	r = rgb.red.getFloatValue (CSSPrimitiveValue.CSS_NUMBER)
			       	,	g = rgb.green.getFloatValue (CSSPrimitiveValue.CSS_NUMBER)
			       	, b = rgb.blue.getFloatValue (CSSPrimitiveValue.CSS_NUMBER)
						;

						return {
							class: CSSPrimitiveValue.CSS_RGBCOLOR,
							unit: '',
							type: 'rgb',
							val: {
								r: r,
								g: g,
								b: b,
							}};
			   }

				if (CSSPrimitiveValue.CSS_GRAD == valueType >= CSSPrimitiveValue.CSS_DEG ) {
					return {class: CSSPrimitiveValue.CSS_GRAD, unit : 'grad', type: 'angle', val : value.getFloatValue (valueType)};
				}

				if(valueType == CSSPrimitiveValue.CSS_DEG) {
					return {class: CSSPrimitiveValue.CSS_DEG, unit : 'deg', type: 'angle', val : value.getFloatValue (valueType)};
				}

				if(valueType == CSSPrimitiveValue.CSS_RAD) {
					return {class: CSSPrimitiveValue.CSS_RAD, unit : 'radian', type: 'angle', val : value.getFloatValue (valueType)};
				}

				if(CSSPrimitiveValue.CSS_S == valueType ) {
					return {class: CSSPrimitiveValue.CSS_S, unit : '', type: 'time', val : value.getFloatValue (valueType)};
				}

				if(valueType == CSSPrimitiveValue.CSS_MS ) {
					return {class: CSSPrimitiveValue.CSS_MS, unit : '', type: 'time', val : value.getFloatValue (valueType)};
				}

				if(!valueType) {
					return {class: undefined, unit : '', type: 'unknown', val : value.cssText};
				}

			return {class: undefined, unit : '', type: 'unknown', val : value.cssText};

		}

		catch (Err){	   
			return {class: 'unknown', unit : '', type: value.propValue.__proto__.constructor.name, val : value.cssText};
		}
};
