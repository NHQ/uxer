module.exports = {
  distance: function ( point1, point2 ) {
    var dx = point2[0] - point1[0];
    var dy = point2[1] - point1[1];
    return Math.sqrt( Math.pow( dx, 2 ) + Math.pow( dy, 2 ) );
  },
  angle: function ( point1, point2 ) {
    var dx = point2[0] - point1[0];
    var dy = point2[1] - point1[1];
    return Math.atan2( dy, dx );
  }
}
