# War Thunder Avionics (and other stuff)

This repository is intended to be used to provide a second monitor view of important pieces of aircraft information (gauges,dials,tapes) etc to aid in awareness of your aircrafts state during a match of war thunder.

## Planned Avionics

- Artificial Horizon
- Vertical Speed Indicator
- Airspeed & TAS Indicator
- Optimum Climb IAS Indicator
- AoA/SideSlip
- Engine Parameters
- Velocity Vector (vs Attitude)
- Enhanced Map
- Others?

## How it Works

War Thunder publishes a lot of aircraft data during a match at [localhost:8111](127.0.0.1:8111). This repo simply hits the various endpoints, stores the results in [Redux](https://redux.js.org/) and renders them using [React](https://react.dev/) + [Konva](https://konvajs.org/)

Performance Data is taken from the [War-Thunder-Datamine](https://github.com/gszabi99/War-Thunder-Datamine/) repository. All credit for any of the files goes to [gszabi99](https://github.com/gszabi99) (and their credited collaborators). Go donate to their Ko-fi.



## Future Plans

- Build a Physical Cockpit (A-1 Skyraider/P51 Mustang) with either physical or digital (screens) avionics
- Microcontroller integration ([Teensy](https://www.pjrc.com/teensy/)) for use with physical indicators/Inputs (switches to control the shown avionics?)
