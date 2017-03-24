import CardsHandler from '../handlers/CardsHandler';
import TurbolinksHandler from '../handlers/TurbolinksHandler';

export default class CardPage {
  constructor() {
    let cardsHandler = new CardsHandler(Array.apply([], document.querySelectorAll('.js-card-container')));
    cardsHandler.listen();

    let turbolinksHandler = new TurbolinksHandler();
    turbolinksHandler.listen();
  }
}
