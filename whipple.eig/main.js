goog.provide('whipple.eig.start');
goog.require('goog.dom');
whipple.eig.start = function(){
	alert('Starting our program.')
  var A = [[1,2,3],[4,5,6],[7,8,9]];
  var eigs = numeric.eig(A);
  alert(eigs);
}
goog.exportSymbol('whipple.eig.start', whipple.eig.start);
