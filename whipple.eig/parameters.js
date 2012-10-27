goog.provide('whipple.eig.Parameters');
/** @const */
var pi = 3.141592653589793;

/**
 * @param {!Element} theElements
 * @constructor
 */
whipple.eig.Parameters = function(thePositionElement){
	this.pi = pi;
	// Bicycle parameters
	this.w = 1.02;
	this.c = 0.08;
	this.lambda = this.pi / 10.0;
	this.g = 9.81;

	// Rear Wheel
	this.rR = 0.3;
	this.mR = 2.0;
	this.IRxx = 0.0603;
	this.IRyy = 0.12;

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
};
