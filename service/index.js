// Funkcje do pracy z bazą danych i schematy oddzielamy od reszty aplikacji i umieszczamy w folderze service.
// Tu jest typowo mongoose (metody z mongoose czyli findOne, create, find, findByIdAndUpdate etc)
// odpowiada wyłącznie za przygotowanie (w tym przypadku) schemy i odpytanie serwera odpowiednią metodą (kontakt z bazą danych)

const Task = require("./schemas/task");

const getAlltasks = async () => {
  return Task.find();
};

const getTaskById = (id) => {
  return Task.findOne({ _id: id });
};

const createTask = ({ title, text }) => {
  return Task.create({ title, text });
};

const updateTask = (id, fields) => {
  return Task.findByIdAndUpdate({ _id: id }, fields, { new: true });
};

const removeTask = (id) => {
  return Task.findByIdAndRemove({ _id: id });
};

module.exports = {
  getAlltasks,
  getTaskById,
  createTask,
  updateTask,
  removeTask,
};
