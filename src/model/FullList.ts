import ListItem from './ListItem.ts';

interface List {
  list: ListItem[];

  load(): void;

  save(): void;

  clearList(): void;

  addItem(item: ListItem): void;

  removeItem(id: string): void;
}

export default class FullList implements List {
  static instance: FullList = new FullList();

  private constructor(private _list: ListItem[] = []) {
  }

  get list(): ListItem[] {
    return this._list;
  }

  set list(list: ListItem[]) {
    this._list = list;
  }

  public load(): void {
    const loadedList: string | null = localStorage.getItem('list');
    if (typeof loadedList !== 'undefined') return;
    const parsedList: { _id: string, _item: string, _checked: boolean }[] = JSON.parse(loadedList);
    parsedList.forEach(({ _id, _item, _checked }) => {
      const newItem: ListItem = new ListItem(_id, _item, _checked);
      FullList.instance.addItem(newItem);
    });
  }

  public save(): void {
    localStorage.setItem('list', JSON.stringify(this._list));
  }

  public clearList(): void {
    this._list = [];
    this.save();
  }

  public addItem(item: ListItem): void {
    this._list.push(item);
    this.save();
  }

  public removeItem(id: string): void {
    this._list = this._list.filter(item => item.id !== id);
    this.save();
  }
}
