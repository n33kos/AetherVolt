import CreateCaptainService from 'services/CreateCaptainService';

export default (GameState) => {
  const createCaptainService = new CreateCaptainService(GameState);

  return createCaptainService.createCaptain({
    color      : '255,100,100',
    health     : 30,
    maxHealth  : 30,
    maxMoves   : 4,
    moves      : 4,
    name       : 'Kcaj',
    spritePath : './img/captains/Kcaj/',
  });
};
