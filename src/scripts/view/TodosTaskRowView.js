import $ from "jquery";
import { EventEmitter } from "../common/EventEmiter";

export class TodosTaskRowView extends EventEmitter {
  static TASK_TEMP = `<li data-id="{{id}}" class="task-item {{doneClass}}">{{title}}
  <div>
  <button class="edit-btn">Edit</button>
  <button class="delete-btn">X</button>
  </div>
  </li>`;
  static TASK_SELECTOR = ".task-item";
  static TASK_DELETE_SELECTOR = ".delete-btn";
  static TASK_DONE_CLASS = "done";
  static TASK_EDIT_SELECTOR = ".edit-btn";

  static createItemElement(todo) {
    return $(
      TodosTaskRowView.TASK_TEMP.replace("{{id}}", todo.id)
        .replace("{{title}}", todo.title)
        .replace(
          "{{doneClass}}",
          todo.isDone ? TodosTaskRowView.TASK_DONE_CLASS : ""
        )
    );
  }

  constructor(model) {
    super();

    this._model = model;
    this._model.on("delete", this.deleteRow);
    this._model.on("save", this.updateRow);

    this.init();
  }

  init() {
    this.renderRow();
    this.$el.on("click", TodosTaskRowView.TASK_DELETE_SELECTOR, () =>
      this._model.delete()
    );
    this.$el.on("click", TodosTaskRowView.TASK_EDIT_SELECTOR, () =>
      this._model.toggleTodo()
    );
  }
  //   this.trigger("edit", this._model)
  renderRow() {
    this.$el?.empty();
    this.$el = $(TodosTaskRowView.createItemElement(this._model));
    console.log(this.$el);
  }

  //   renderRow() {
  //     this.$el.empty();
  //     this.$el.html(interpolate(UserRow.userTemplate, this._model));
  //   }

  deleteRow = () => {
    this.$el.remove();
  };

  updateRow = () => {
    this.renderRow();
  };
}
