import CreateLevelService from 'services/CreateLevelService';

export default (GameState) => {
  const createLevelService = new CreateLevelService(GameState);

  return createLevelService.createLevel({
    background  : './img/Trees-Test.png',
    clearOnLoad : true,
    cloudCount  : 0,
    columns     : 4,
    deckSize    : 16,
    name        : "Prototype Level",
    rows        : 4,
  });
};
