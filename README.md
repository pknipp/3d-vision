This react project consists of several unrelated physics simulations, each described below.  Although it includes authentication
 with redux, express, and postgresql, most of the activity occurs in the front end.  For each simulation the "parent" component is a class which utilizes state, life-cycle methods, and a "clock" built from the setInterval function, whereas the child components are all functional.
 The first two simulations consider a collection of objects, the position and angle of each of which are controlled by the css properties "top", "left", and "transform".

* **Drumhead** simulates the three-dimensional motion of an *N* x *N* array of particles, which may be regarded as a model for the vibrating head of a drum.  This was inspired by PhET's "Normal Modes" simulation, now largely defunct because of its reliance upon Flash.
    * Each particle is connected ("bonded") to its four neighbors or - if it resides along the edge - to the adjacent wall.  The equilibrium position for each particle is represented by a dashed circle.
    * Each particle's displacement is measured relative to its equilibrium position.  The positive directions are to the right (for *x*), down the screen (for *y*), or out of the screen (for *z*).
    * The user may "tune" both the overall strength of the restoring forces and whether the restoring force is that of Hooke's-law springs or simply a mesh under tension.  Newtonian damping is also available, to represent more realistic behavior.
    * In addition to specifying the number of particles in the system, the user must specify the system's "initial conditions", ie the extent to which any particle(s) is *not* in its equilibrium state (ie, motionless at its equilbrium position).  The user may shift arbitrarily many particles away from their equilibrium positions before running the simulation.
    * The collection of *N*<sup>2</sup> particles satisfies Newton's 2nd law, which leads to a system of 6*N*<sup>2</sup> coupled first-order ordinary differential equations.  The factor of 6 comes from 3 (the dimensionality of space) times 2 (the order of the derivative in Newton's 2nd law).
    * The system of differential equations is solved via a Runge-Kutta approach that has a nonzero step-size &Delta;*t*, which may be controlled by the user.  Because this is a 4th-order approach, the time-complexity is *O*(1/&epsilon;<sup>1/4</sup>), where &epsilon; is the desired accurary.
    * Bar graphs represent the system's kinetic energy (associated with the particles' speeds), potential energy (associated with the distortion of the bonds), and total energy.  In the absence of damping and error associated with the nonzero size of the time-step &Delta;*t*, the total energy *E* should be constant.  Hence monitoring the constancy of *E* is probably the best way to determine if &Delta;*t* is sufficiently small.  (Be forewarned that excessively small values of the &Delta;*t* will lead to backups of the event queue, for which the symptom will be that the simulation timer runs slow.)
    * Arrows represent the velocity- and acceleration-vectors for each particle.  Each arrow's direction is parallel to that of the particular vector, and each arrow's length is proportional to the magnitude of the particular vector.

* **Asteroid field** simulates the view from the front of a space ship as it flies through an endless field of asteroids, as inspired by the 1990's-era screensaver.
    * The perspective is as if the user is viewing the asteroids through a narrow cone, in which case the user's solid-angle view is well approximated by a 2-dimensional plane. Each asteroid's apparent lateral position (*X* or *Y* expressed relative to the viewer's "fixation point" at the center of the screen) is proportional to the asteroid's actual lateral position (*x* or *y*) divided by *z*, the latter being the actual distance of the asteroid from the user. (Expressed differently: "Closer objects appear larger.")
    * Each asteroid's (ReactJS) zIndex property is proportional to its *z*-coordinate, thereby ensuring that asteroids closer to the viewer will conceal any which are behind it.
    * Mindlessly using the 1/*z* factor specified in the previous part leads to some unrealistic results, namely that the entire viewing area is covered with distant asteroids.  This is often called "Olber's dark night sky paradox" when considered for the case of viewing stars from an earth-bound vantage point.  Accordingly I replace 1/*z* with 1/*z* - 1/(2 - *z*), which leads to all asteroids' invisibility beyond *z* = 1 (which we take to be "far from the viewer").
    * When an asteroid leaves the user's field of view, it is replaced by another asteroid at *z* = 1, with arbitrary lateral coordinates (*x* and *y*) and velocity components.
    * Each asteroid moves with a constant velocity, and css transitions (with a linear timing function) are used to interpolate their positions between successive timesteps in order to allow for large timesteps.

* **Heat equation** simulates the time-dependence of the temperature profile of a one-dimensional system that is subject to particular boundary conditions and initial conditions.
    * The heat equation is a partial differential equation that is first-order in time *t* and second-order in position *x*.  I solve this equation by discretizing both time and position into timesteps (&Delta;*t*) and length elements (&Delta;*t*), thereby obtaining a difference equation.  The sizes of both &Delta;*t* and &Delta;*x* are controlled by logarithmic sliders.
    * At either end of the system, the user may specify that the boundary condition be either insulating (ie no heat may pass through the boundary) or at a particular temperature.
    * The user creates an initial condition (ie, temperature profile) for this system by click-and-dragging from left to right across the bar graph.
    * I solve this difference equation via the Crank-Nicolson method, which requires solving a tridiagonal set of linear equations.  The accuracy of this "implicit" method is 2nd order in time, so the time-complexity is *O*(1/&epsilon;<sup>1/2</sup>), where &epsilon; is the desired accuracy.  In order to eliminate unphysical Gibbs-phenomenon behavior at the boundaries, I use a two-timestep average to smooth out the oscillations.