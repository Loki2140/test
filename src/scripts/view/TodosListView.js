import $ from "jquery";
import { EventEmitter } from "../common/EventEmiter";
import { TodosTaskRowView } from "./TodosTaskRowView";

export class TodosListView extends EventEmitter {
  static LIST_TEMPLATE = `<ol id="taskList" name="toDoList" class="toDoList"></ol>`;

  static containerSelector = ".list-container";

  constructor(collection) {
    super();
    this._collection = collection;

    this._collection.on("update", this.renderList);
    this._collection.on("add", this.renderUser);
    this._collection.on("save", this.renderUser);

    this.init();
  }

  init() {
    this.$el = $(TodosListView.LIST_TEMPLATE);
  }
  //   init() {
  //     this.$el = $(UsersList.LIST_TEMPLATE);
  //     this._$listContainer = this.$el.find(UsersList.containerSelector);
  //   }

  renderList = (list) => {
    this.$el.append(list.map((el) => this._wrapRow(el).$el));
  };

  //   renderList = (list) => {
  //     this._$listContainer.append(list.map((model) => this._wrapRow(model).$el));
  //   };

  renderUser = (el) => {
    this.$el.append(this._wrapRow(el).$el);
  };

  //   renderUser = (model) => {
  //     this._$listContainer.append(this._wrapRow(model).$el);
  //   };

  _wrapRow(el) {
    const rowView = new TodosTaskRowView(el);
    rowView.on("edit", (model) => this.trigger("edit", model));
    return rowView;
  }
}
