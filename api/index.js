// Routes zostaną w głównym katalogu aplikacji, w folderze api. To jest to co użytkownik zobaczy. Z tego korzysta w server.js routerApi jako /api

const express = require("express");
const router = express.Router();
// importujemy z controllera jako ctrlTask, co później fajnie je uwidoczni wszystkie że są z tego pliku
const ctrlTask = require("../controller");

// tutaj mamy tylko router.metora('/url', nazwaFunkcjiZKontrolera )
// api jest tylko taką macierzą, przekaźnikiem. Drogowskazem, że jak chcemy post i np. adres tasks/:id to co ma wykonać
// Rozkład jazdy co ma się zadziać w razie czego

// wpada nam zapytanie GET na /tasks, używamy funkcji get(z dopiskiem z powyżej ctrlTask)
router.get("/tasks", ctrlTask.get);

router.get("/tasks/:id", ctrlTask.getById);

router.post("/tasks", ctrlTask.create);

router.put("/tasks/:id", ctrlTask.update);

router.patch("/tasks/:id/status", ctrlTask.updateStatus);

router.delete("/tasks/:id", ctrlTask.remove);

module.exports = router;
