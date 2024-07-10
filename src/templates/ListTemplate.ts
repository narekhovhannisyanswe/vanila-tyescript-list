import FullList from '../model/FullList.ts';

interface DOMList {
  ul: HTMLUListElement;

  clear(): void;

  render(fullList: FullList): void;
}

export default class ListTemplate implements DOMList {
  public ul: HTMLUListElement;

  public static instance: ListTemplate = new ListTemplate();

  private constructor() {
    this.ul = document.getElementById('listItems') as HTMLUListElement;
  }

  public clear(): void {
    this.ul.innerHTML = '';
  }

  public render(fullList: FullList): void {
    this.clear();
    fullList.list.forEach((item) => {
      const li = document.createElement('li') as HTMLLIElement;
      li.className = 'item';

      const checkbox = document.createElement('input') as HTMLInputElement;
      checkbox.id = item.id;
      checkbox.type = 'checkbox';
      checkbox.checked = item.checked;
      li.append(checkbox);

      checkbox.addEventListener('change', () => {
        item.checked = !item.checked;
        console.log(item.checked);
        fullList.save();
        this.render(fullList);
      });

      const label = document.createElement('label') as HTMLLabelElement;
      label.htmlFor = item.id;
      label.textContent = item.item;
      li.append(label);

      const button = document.createElement('button') as HTMLButtonElement;
      button.textContent = 'X';
      button.className = 'button';
      li.append(button);

      button.addEventListener('click', () => {
        fullList.removeItem(item.id);
        fullList.save();
        this.render(fullList);
      });


      this.ul.appendChild(li);
    });
  }
}