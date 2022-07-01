import "./styles/index.scss";
import $ from "jquery";
import { TodosController } from "./scripts/controller/TodosController";

$(() => {
  new TodosController($(".dz9"));
});
