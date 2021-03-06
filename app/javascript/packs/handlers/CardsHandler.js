import Card from '../data/Card';
import CardHandler from './CardHandler';

export default class CardsHandler {
  constructor(elements) {
    this.elements = elements;
    this.dragSource = null;
  }

  listen() {
    this.elements.forEach((element) => {
      element.addEventListener('dragstart', (e) => { this.dragStarListener(e)}, false);
      element.addEventListener('dragenter', (e) => { this.dragEnterListener(e)}, false);
      element.addEventListener('dragover', (e) => { this.dragOverListener(e)}, false);
      element.addEventListener('dragleave', (e) => { this.dragLeaveListener(e)}, false);
      element.addEventListener('drop', (e) => { this.dropListener(e)}, false);
      element.addEventListener('dragend', (e) => { this.dragEndListener(e)}, false);
      this.resetElementHandler(element.querySelector('.js-card'));
    });
  }

  resetElementHandler(element) {
    let card = new Card(element.dataset.key, element.innerText);
    let cardHandler = new CardHandler(card, element);
    cardHandler.listen();
  }

  dragStarListener(e) {
    document.querySelector('body').focus();
    e.currentTarget.style.opacity = '0.4';

    this.dragSource = e.currentTarget;
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', this.dragSource.innerHTML);
  }

  dragEnterListener(e) {
    e.currentTarget.classList.add('over');
  }

  dragOverListener(e) {
    e.currentTarget.classList.add('over');
    e.preventDefault(); // Necessary. Allows us to drop.
    e.dataTransfer.dropEffect = 'move';  // See the section on the DataTransfer object.
  }

  dragLeaveListener(e) {
    e.currentTarget.classList.remove('over');
  }

  dropListener(e) {
    e.currentTarget.classList.remove('over');
    e.stopPropagation();

    if (this.dragSource != e.currentTarget) {
      let cardKey = this.dragSource.querySelector('.js-card').dataset.key;
      let newRank = e.currentTarget.dataset.index;
      let newCategory = e.currentTarget.dataset.categoryId;

      if (this.dragSource.dataset.categoryId == e.currentTarget.dataset.categoryId) {
        this.dragSource.innerHTML = e.currentTarget.innerHTML;
        this.resetElementHandler(this.dragSource.querySelector('.js-card'))
      }

      e.currentTarget.innerHTML = e.dataTransfer.getData('text/html');
      this.resetElementHandler(e.currentTarget.querySelector('.js-card'))

      let cardForm = document.querySelector(`.js-card-update-form[data-key="${cardKey}"]`);
      cardForm.querySelector('.js-card-form-rank-field').value = newRank;
      cardForm.querySelector('.js-card-form-category-field').value = newCategory;
      cardForm.querySelector('input[type="submit"]').click();
    }

  }

  dragEndListener(e) {
    this.elements.forEach((element) => {
      element.style.opacity = '1.0';
      element.classList.remove('over');
    });
  }
}
