goog.provide('whipple.eig.Parameters');
goog.require('goog.structs.Map')
/**
 * @constructor
 */
whipple.eig.Parameters = function(){
	// Bicycle parameters
	this.w = 1.02;
	this.c = 0.08;
	this.lambda = Math.PI/ 10.0;
	this.g = 9.81;

	// Rear Wheel
	this.rR = 0.3;
	this.mR = 2.0;
	this.IRxx = 0.0603;
	this.IRyy = 0.12;
	this.IRzz = 2.8;
	// Rear frame & rider
	this.xB = 0.3;
	this.zB = -0.9;
	this.mB = 85.0;
	this.IBxx = 9.2;
	this.IByy = 11.0;
	this.IBzz = 2.8;
	this.IBxz = 2.4;

	// Fork and handlebars
	this.xH = 0.9;
	this.zH = -0.7;
	this.mH = 4.0;
	this.IHxx = 0.05892;
	this.IHyy = 0.06;
	this.IHzz = 0.00708;
	this.IHxz = -0.00756;

	// Front wheel
	this.rF = 0.35;
	this.mF = 3.0;
	this.IFxx = 0.1405;
	this.IFyy = 0.28;
	this.IFzz = 0.28;
	
	//Not sure what they are
	this.mT = 3.0;
};
/**
 * @param {goog.structs.Map}  newParametersMap
 */
whipple.eig.Parameters.prototype.setParameters = function(newParametersMap){
	var iter = newParametersMap.getKeys();
	var ourParameters = this;
	goog.iter.forEach(iter, function(theKey, index) {
		//console.log(theKey);
		ourParameters[theKey] =Number(newParametersMap.get(theKey));
		//console.log(ourParameters.ourTest);
	  });
	//console.log(ourParameters.ourTest)
};
