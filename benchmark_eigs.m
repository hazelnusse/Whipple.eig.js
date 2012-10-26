% Written by Dale Lukas Peterson
% February 5th, 2012
clear all; close all; clc;

% Bicycle parameters
w = 1.02;
c = 0.08;
lambda = pi / 10.0;
g = 9.81;

% Rear Wheel
rR = 0.3;
mR = 2.0;
IRxx = 0.0603;
IRyy = 0.12;

% Rear frame & rider
xB = 0.3;
zB = -0.9;
mB = 85.0;
IBxx = 9.2;
IByy = 11.0;
IBzz = 2.8;
IBxz = 2.4;

% Fork and handlebars
xH = 0.9;
zH = -0.7;
mH = 4.0;
IHxx = 0.05892;
IHyy = 0.06;
IHzz = 0.00708;
IHxz = -0.00756;

% Front wheel
rF = 0.35;
mF = 3.0;
IFxx = 0.1405;
IFyy = 0.28;

% Intermediate terms needed to assemble the entries of the mass, "damping", and
% stiffness matrices.  These are equations A1 - A27 of Meijaard et al., 2007
mT = mR + mB + mH + mF;
xT = (xB*mB + xH*mH + w*mF) / mT;
zT = (-rR*mR + zB*mB + zH*mH - rF*mF) / mT;

ITxx = IRxx + IBxx + IHxx + IFxx + mR*rR^2 + mB*zB^2 + mH*zH^2 + mF*rF^2;
ITxz = IBxz + IHxz - mB*xB*zB - mH*xH*zH + mF*w*rF;
IRzz = IRxx;
IFzz = IFxx;
ITzz = IRzz + IBzz + IHzz + IFzz + mB*xB^2 + mH*xH^2 + mF*w^2;

mA = mH + mF;
xA = (xH*mH + w*mF)/mA;
zA = (zH*mH - rF*mF)/mA;

IAxx = IHxx + IFxx + mH*(zH - zA)^2 + mF*(rF + zA)^2;
IAxz = IHxz - mH*(xH - xA)*(zH - zA) + mF*(w - xA)*(rF + zA);
IAzz = IHzz + IFzz + mH*(xH - xA)^2 + mF*(w - xA)^2;

uA = (xA - w - c)*cos(lambda) - zA*sin(lambda);

IAll = mA*uA^2 + IAxx*sin(lambda)^2 + 2*IAxz*sin(lambda)*cos(lambda) + IAzz*cos(lambda)^2;
IAlx = -mA*uA*zA + IAxx*sin(lambda) + IAxz*cos(lambda);
IAlz = mA*uA*xA + IAxz*sin(lambda) + IAzz*cos(lambda);

mu = c/w*cos(lambda);
SR = IRyy / rR;
SF = IFyy / rF;
ST = SR + SF;
SA = mA*uA + mu*mT*xT;

% Mass matrix
M = [ITxx, IAlx + mu*ITxz; IAlx + mu*ITxz, IAll + 2*mu*IAlz + mu^2 * ITzz];
% Stiffness matrices
K0 = [mT*zT, -SA; -SA, -SA*sin(lambda)];
K2 = [0.0, (ST - mT*zT)/w*cos(lambda); 0.0, (SA + SF*sin(lambda))/w*cos(lambda)];
% "Damping matrix
C1 = [0.0, mu*ST + SF*cos(lambda) + ITxz/w*cos(lambda) - mu*mT*zT; -(mu*ST + SF*cos(lambda)), IAlz/w*cos(lambda) + mu*(SA + ITzz/w*cos(lambda))];

% Select speed
%v = 1.0;  % unstable
v = 5.0;  % stable
%v = 8.0;  % unstable

% State ordering is x = [phi; delta; phi_dot; delta_dot]
% Input ordering is u = [T_phi; T_delta]
A = [0, 0, 1, 0;...
     0, 0, 0, 1;
     M\[-(g*K0 + v^2*K2), -v*C1]]
B = [zeros(2); inv(M)]

% Select roll and steer angles as output:
C = [1, 0, 0, 0;...
     0, 1, 0, 0]
D = zeros(2)

% Create a state space object
sys = ss(A, B, C, D);

% Bode plot (from both inputs to roll angle output)
figure;
bode(sys);

% Step response (both inputs)
figure;
step(sys);

% Pole zero map
figure;
pzmap(sys);

% Compute roll torque transfer function coefficients
[num_r, den_r] = ss2tf(A, B, C, D, 1)
% Compute steer torque transfer function coefficients
[num_s, den_s] = ss2tf(A, B, C, D, 2)

