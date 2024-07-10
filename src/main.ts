import './styles/style.css';
import ListTemplate from './templates/ListTemplate';
import FullList from './model/FullList.ts';
import ListItem from './model/ListItem.ts';

const initApp = (): void => {
  const fullList = FullList.instance;
  const template = ListTemplate.instance;

  const form = document.getElementById('itemEntryForm') as HTMLFormElement;
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const input = document.getElementById('newItem') as HTMLInputElement;
    const newEntryText = input.value.trim();
    if (!newEntryText.length) return;
    input.value = '';

    const newId: number = fullList.list.length ? parseInt(fullList.list[fullList.list.length - 1].id) + 1 : 1;
    const newItem: ListItem = new ListItem(newId.toString(), newEntryText);
    fullList.addItem(newItem);
    template.render(fullList);
  });

  const clearButton = document.getElementById('clearItemsButton') as HTMLButtonElement;
  clearButton.addEventListener('click', (): void => {
    fullList.clearList();
    template.clear();
  });

  fullList.load();
  template.render(fullList);

};

document.addEventListener('DOMContentLoaded', initApp);