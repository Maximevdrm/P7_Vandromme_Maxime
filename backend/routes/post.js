const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

const postCtrl = require('../controllers/post');

router.post('/', auth, multer, postCtrl.createThing);
router.put('/:id', auth, postCtrl.modifyThing);
router.delete('/:id', auth, postCtrl.deleteThing);

router.get('/:id', auth, postCtrl.getOneThing);

router.post('/:id/comment', auth, postCtrl.createThing);
router.post('/:id/like', auth, postCtrl.createThing);

module.exports = router;

// faire un get de tous les post