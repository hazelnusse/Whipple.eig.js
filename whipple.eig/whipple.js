/**
* @fileoverview Whipple contains information about a Whipple bicycle model,
* such as it's parameters and how to compute the linearized dynamics matrices.
* @author hazelnusse@gmail.com (Dale Lukas Peterson)
*/
goog.provide('whipple.eig.Whipple');
goog.require('whipple.eig.Parameters');

/**
* Creates a new Whipple Model, default initialized with benchmark values of
* parameters.
* @constructor
*/
whipple.eig.Whipple = function() {
  /**
  * @type {Parameters}
  * @private
  */
  this.parameters_ = new Parameters();
}

/**
 * @return {array}
 */
whipple.eig.prototype.computeEigenvalues = function() {

  var mT = this.parameters_.mR + this.parameters_.mB
         + this.parameters_.mH + this.parameters_.mF;
  var xT = (this.parameters_.xB*this.parameters_.mB
            + this.parameters_.xH*this.parameters_.mH
            + this.parameters_.w*this.parameters_.mF) / this.parameters_.mT;
  var zT = (-this.parameters_.rR*this.parameters_.mR
            + this.parameters_.zB*this.parameters_.mB
            + this.parameters_.zH*this.parameters_.mH
            - this.parameters_.rF*this.parameters_.mF) / this.parameters_.mT;

  var ITxx = this.parameters_.IRxx + this.parameters_.IBxx
           + this.parameters_.IHxx + this.parameters_.IFxx
           + this.parameters_.mR*Math.pow(this.parameters_.rR, 2)
           + this.parameters_.mB*Math.pow(this.parameters_.zB, 2)
           + this.parameters_.mH*Math.pow(this.parameters_.zH, 2)
           + this.parameters_.mF*Math.pow(this.parameters_.rF, 2);
  var ITxz = this.parameters_.IBxz + this.parameters_.IHxz
           - this.parameters_.mB*this.parameters_.xB*this.parameters_.zB
           - this.parameters_.mH*this.parameters_.xH*this.parameters_.zH
           + this.parameters_.mF*this.parameters_.w*this.parameters_.rF;
  var IRzz = this.parameters_.IRxx;
  var IFzz = this.parameters_.IFxx;
  var ITzz = this.parameters_.IRzz + this.parameters_.IBzz
           + this.parameters_.IHzz + this.parameters_.IFzz
           + this.parameters_.mB*Math.pow(this.parameters_.xB, 2)
           + this.parameters_.mH*Math.pow(this.parameters_.xH, 2)
           + this.parameters_.mF*Math.pow(this.parameters_.w, 2);

  var mA = this.parameters_.mH + this.parameters_.mF;
  var xA = (this.parameters_.xH*this.parameters_.mH
            + this.parameters_.w*this.parameters_.mF)/mA;
  var zA = (this.parameters_.zH*this.parameters_.mH
            - this.parameters_.rF*this.parameters_.mF)/mA;

  var IAxx = this.parameters_.IHxx + this.parameters_.IFxx
           + this.parameters_.mH*Math.pow(this.parameters_.zH - zA, 2)
           + this.parameters_.mF*Math.pow(this.parameters_.rF + zA, 2);
  var IAxz = this.parameters_.IHxz
           - this.parameters_.mH*(this.parameters_.xH - xA)
             *(this.parameters_.zH - zA)
           + this.parameters_.mF*(this.parameters_.w - xA)
             *(this.parameters_.rF + zA);
  var IAzz = this.parameters_.IHzz + this.parameters_.IFzz
           + this.parameters_.mH*Math.pow(this.parameters_.xH - xA, 2)
           + this.parameters_.mF*Math.pow(this.parameters_.w - xA, 2);

  var uA = (xA - this.parameters_.w - this.parameters_.c)*Math.cos(lambda)
         - zA*Math.sin(this.parameters_.lambda);

  var IAll = mA*uA^2 + IAxx*Math.pow(Math.sin(this.parameters_.lambda), 2)
           + 2*IAxz*Math.sin(this.parameters_.lambda)
            *Math.cos(this.parameters_.lambda)
           + IAzz*Math.pow(Math.cos(this.parameters_.lambda), 2);
  var IAlx = -mA*uA*zA + IAxx*Math.sin(this.parameters_.lambda)
           + IAxz*Math.cos(this.parameters_.lambda);
  var IAlz = mA*uA*xA + IAxz*Math.sin(this.parameters_.lambda)
           + IAzz*Math.cos(this.parameters_.lambda);

  var mu = this.parameters_.c
           / this.parameters_.w*Math.cos(this.parameters_.lambda);
  var SR = this.parameters_.IRyy / this.parameters_.rR;
  var SF = this.parameters_.IFyy / this.parameters_.rF;
  var ST = SR + SF;
  var SA = mA*uA + mu*mT*xT;

  var M = [[ITxx, IAlx + mu*ITxz],
           [IAlx + mu*ITxz, IAll + 2*mu*IAlz + Math.pow(mu, 2) * ITzz]];

  var K0 = [[mT*zT, -SA],
            [-SA, -SA*Math.sin(this.parameters_.lambda)]];
  var K2 = [[0.0, (ST - mT*zT)
                   /this.parameters_.w*Math.cos(this.parameters_.lambda)],
            [0.0, (SA + SF*Math.sin(this.parameters_.lambda))
                   /this.parameters_.w*Math.cos(this.parameters_.lambda)]];

  var C1 = [[0.0, mu*ST + SF*Math.cos(this.parameters_.lambda)
                  + ITxz/this.parameters_.w*Math.cos(this.parameters_.lambda)
                  - mu*mT*zT],
            [-(mu*ST + SF*Math.cos(this.parameters_.lambda)),
              IAlz/this.parameters_.w*Math.cos(this.parameters_.lambda)
              + mu*(SA + ITzz/this.parameters_.w*Math.cos(this.parameters_.lambda))];
  var M_inv = numeric.inv(M);
  // TODO: populate 4x4 system dynamic matrix that we compute eigenvalues of
}

