// logikę pracy aplikacji (obsługę endpointów) przenosimy do folderu controller.
// tu są funkcje, które się wykonają po przekazaniu  api/index.js i je exportujemy jako module.exports
// W controller nie mamy zapytań do bazy danych, mamy logikę biznesową. Co ma się zadziać np. w przypadku get
// controller odpowiada za komunikację. pobiera info z requestu i wysyła response. Odpowiada za komunikację z klientem. nie sprawdza co jest pod spodem, bo od tego jest service.
// controller korzysta z services, który to dopiero komunikuje się z backendem
// Kontroller jest czymś na zasadzie validatora, ma sprawdzić czy wszystko jest ok i na swoim miejscu i jeśli tak to odpytać o coś backend (service)

const service = require("../service");

// w gecie pytamy tylko o taski (results) i później zwracamy res.json jako obiekt z data: tasks i tam results
const get = async (req, res, next) => {
  try {
    const results = await service.getAlltasks();
    res.json({
      status: "success",
      code: 200,
      data: {
        tasks: results,
      },
    });
  } catch (e) {
    console.error(e);
    next(e);
  }
};

const getById = async (req, res, next) => {
  const { id } = req.params;
  try {
    // tu znów pokazuje się podział odpowiedzialności. Nie wpisujemy tu całej logiki, która jest w service, tylko chcemy otrzymać result z service z pomocą id z requestu i zwrócić response jako obiekt z konkretną datą (jak się nie uda to error)
    const result = await service.getTaskById(id);
    if (result) {
      res.json({
        status: "success",
        code: 200,
        data: { task: result },
      });
    } else {
      res.status(404).json({
        status: "error",
        code: 404,
        message: `Not found task id: ${id}`,
        data: "Not Found",
      });
    }
  } catch (e) {
    console.error(e);
    next(e);
  }
};

const create = async (req, res, next) => {
  const { title, text } = req.body;
  try {
    const result = await service.createTask({ title, text });

    res.status(201).json({
      status: "success",
      code: 201,
      data: { task: result },
    });
  } catch (e) {
    console.error(e);
    next(e);
  }
};

const update = async (req, res, next) => {
  const { id } = req.params;
  const { title, text } = req.body;
  try {
    const result = await service.updateTask(id, { title, text });
    if (result) {
      res.json({
        status: "success",
        code: 200,
        data: { task: result },
      });
    } else {
      res.status(404).json({
        status: "error",
        code: 404,
        message: `Not found task id: ${id}`,
        data: "Not Found",
      });
    }
  } catch (e) {
    console.error(e);
    next(e);
  }
};

const updateStatus = async (req, res, next) => {
  const { id } = req.params;
  const { isDone = false } = req.body;

  try {
    const result = await service.updateTask(id, { isDone });
    if (result) {
      res.json({
        status: "success",
        code: 200,
        data: { task: result },
      });
    } else {
      res.status(404).json({
        status: "error",
        code: 404,
        message: `Not found task id: ${id}`,
        data: "Not Found",
      });
    }
  } catch (e) {
    console.error(e);
    next(e);
  }
};

const remove = async (req, res, next) => {
  const { id } = req.params;

  try {
    const result = await service.removeTask(id);
    if (result) {
      res.json({
        status: "success",
        code: 200,
        data: { task: result },
      });
    } else {
      res.status(404).json({
        status: "error",
        code: 404,
        message: `Not found task id: ${id}`,
        data: "Not Found",
      });
    }
  } catch (e) {
    console.error(e);
    next(e);
  }
};

module.exports = {
  get,
  getById,
  create,
  update,
  updateStatus,
  remove,
};
