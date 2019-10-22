# TO-DO
- [ ] Test gameplay variants for maximum fun
- [ ] Implement hero-specific sounds
- [ ] Create Background sprites
- [ ] Improve background sprite movement and performance (maybe all sprite movement)
- [ ] Disable arrows for impossible actions
- [ ] Create multiple levels and auto transition functionality
- [ ] Create/Implement ship destruction animation

# DONE

#### v0.0.5
In Progress...
- [x] Implement a few alternate play style options
- [x] Implement background music for levels
- [x] Fix all sprite animations (broke them at some point)
- [x] Add gamestate constant for autoAttackAtEndOfTurn
- [x] Make attack a button, still fire off lightning on failed connections
- [x] Experiment with "quad only" behavior
- [x] Clean up AI action scheduling
- [x] Add yet another test tile sprite

#### v0.0.4
- [x] Implement sprite color shifter function
- [x] Colored lightning & damage animation (Requires sprite color shifter)
- [x] Make hand size actually work
- [X] Add color filter options to colorizer

#### v0.0.3
- [x] Remove dist folder from tracking
- [x] Add round counter
- [x] Make player GUI display before first action
- [x] Move cyclePlayerTurns lib to TurnService
- [x] Move cycleActions lib to ActionService
- [x] Move controls, setHover, and resethover libs to ControlService
- [x] Move findTileAtPosition and getTileWithPlayer to TileService
- [x] Move lighting libs to lightning service
- [x] Move endGame to game service
- [x] Rename WorldSpaceToCanvas to ScreenSpaceToCanvas

#### v0.0.2
- [x] Add hero-specific tile sprites
- [x] Add factories to make configs actually configs
- [x] Change getTileWithPlayerName to use IDs instead of names
- [x] Make deck run out correctly, add infinite deck config
- [x] Fix movement bug cause by refactor
- [x] Add very simple AI
