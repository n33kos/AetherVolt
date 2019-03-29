import CreateCaptainService from 'services/CreateCaptainService';

export default (GameState) => {
  const createCaptainService = new CreateCaptainService(GameState);

  return createCaptainService.createCaptain({
    color      : '100,100,255',
    health     : 50,
    maxHealth  : 50,
    maxMoves   : 2,
    moves      : 2,
    name       : 'Jack',
    spritePath : './img/captains/Jack/',
  });
};
