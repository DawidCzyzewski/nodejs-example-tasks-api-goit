// To jest JS, wykorzystujący silnik nodejs i wykorzystuje expressa i korzysta z bazy danych Mongo i providera tej bazy danych Mongoose. server.js to jest nasze tradycyjne app.js. Nieraz jest wymagane, żeby to była app.js z tego względu że jest to domyślnie uruchamiany plik. Zawesze musi być jakiś plik, który jest domyślnie uruchamiany tak jak w przypadku frontend to index.html i to on później wywołuje js react itp

// wykorzystujemy express i mongoose.
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();
// uruchamiamy expressa
const app = express();

// parse application/json
// wkonujemy middlewary czyli express.json i cors
app.use(express.json());
// cors
app.use(cors());

// podłączamy routing. Dobrą praktyką dla backendu jest dodanie sofixu /api, czyli wszystko związane z backendem będzie po adresie/api/...  Jest to istotne bo często wystawiamy aplikację frontend i backend na jednym serwerze i adresy mogą być takie same i się mylić, więc żeby rozróżnić front od backendu to dodajemy te adresy po /api
const routerApi = require("./api");
app.use("/api", routerApi);
// Zazwyczaj jeśli chcemy wystawić frontend i backend na jednym serwerze to pisze się
// app.use("/", plikIndexHTMLorJSFrontend);

// Mamy tu jeszcze dwie rzeczy. Jeśli nie wszedł ten routing powyżej, to dodajemy middleware który zwraca errory:
app.use((_, res, __) => {
  res.status(404).json({
    status: "error",
    code: 404,
    message: "Use api on routes: /api/tasks",
    data: "Not found",
  });
});

app.use((err, _, res, __) => {
  console.log(err.stack);
  res.status(500).json({
    status: "fail",
    code: 500,
    message: err.message,
    data: "Internal Server Error",
  });
});

// Tu mamy informacje o naszym porcie, bo może będziemy chcieli zdefiniowaćinny niż local3000 i informacje o naszym URI Database
const PORT = process.env.PORT || 3000;
const uriDb = process.env.DB_HOST;

// tworzymy connection z mongoose (tu jest że najpierw łączymy się do bazy danych a później stawiamy api)
const connection = mongoose.connect(uriDb, {
  promiseLibrary: global.Promise,
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

// i jak już stworzyliśmy to (jak już połączyliśmy się z bazą danych) to dajemy app.listen i informacja że serwer is running, jeśli nie to catch i error
connection
  .then(() => {
    app.listen(PORT, function () {
      console.log(`Server running. Use our API on port: ${PORT}`);
    });
  })
  .catch((err) =>
    console.log(`Server not running. Error message: ${err.message}`)
  );
