# TO-DO
- [ ] Implement background music
- [ ] Implement hero-specific sounds
- [ ] Create Background sprites
- [ ] Improve background sprite movement and performance (maybe all sprite movement)
- [ ] Implement sprite color shifter function
- [ ] Colored lightning & damage animation (Requires sprite color shifter)
- [ ] Make hand size actually work
- [ ] Disable arrows for impossible actions

# DONE

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
