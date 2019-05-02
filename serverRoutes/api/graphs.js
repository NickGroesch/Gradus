const router = require("express").Router();
const graph = require("../../controller/index");

// Matches with "/api/graphs"
// router.route("/").post(graph.returnGraph);
router.route("/").post(graph.analyze);
// .post(booksController.create);

// Matches with "/api/books/:id"
// router
//   .route("/:id")
//   // .get(booksController.findById)
//   .put(booksController.update)
//   .delete(booksController.remove);

module.exports = router;
