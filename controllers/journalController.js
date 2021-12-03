const router = require("express").Router();
const {JournalService} = require('../services');
const {validateJWT} = require("../middlewares");


router.post("/new", validateJWT, async (req, res) => {
  const user = req.user;
  const {journal} = req.body;
  
  const {statusCode, message} = await new JournalService().createPost(user, journal);

  res.status(statusCode).json({
    message
  })
});

router.get("/allposts", async (req, res) => {
  const {statusCode, message, allPosts} = await new JournalService().getAllPosts();

  res.status(statusCode).json({
    message,
    allPosts
  })
});

router.get("/:title", async (req, res) => {
  const {title} = req.params;

  const {statusCode, message, postsByTitle} = await new JournalService().getByTitle(title);

  res.status(statusCode).json({
    message,
    postsByTitle
  })
})

router.route("/:id")
  .put(validateJWT, async (req, res) => {
    const user = req.user;
    const {journal} = req.body;
    const {id: journalId} = req.params;

    const {statusCode, message} = await new JournalService().updatePost(user, journal, journalId);

    res.status(statusCode).json({
      message
    })
  })

  .delete(validateJWT, async (req, res) => {
    const user = req.user;
    const {id: journalId} = req.params;

    const {statusCode, message} = await new JournalService().deletePost(user, journalId);

    res.status(statusCode).json({
      message
    })
  })


module.exports = router;