goog.provide('whipple.eig.start');
goog.require('goog.dom');
goog.require('goog.debug.Logger');
goog.require('goog.debug.FancyWindow');
whipple.eig.start = function(){
        // Create the debug window.
    if (goog.DEBUG) {

        var debugWindow = new goog.debug.FancyWindow('main');
        debugWindow.setEnabled(true);
        debugWindow.init();
    }
    var logger_ =
    goog.debug.Logger.getLogger('surfforecaster.main.logger');
    logger_.info('Loading Main');
    
	alert('Starting our program.')
  var A = [[1,2,3],[4,5,6],[7,8,9]];
  var eigs = numeric.eig(A);
  alert(eigs);
}
goog.exportSymbol('whipple.eig.start', whipple.eig.start);
