import {Router} from 'express'
import multer from 'multer'

import {mergeVideosFiles} from './controller'

const router = new Router()

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads')
  },
  filename: function (req, file, cb) {
    cb(null, `${file?.fieldname}-${Date.now()}-${file?.originalname}`)
  }
})
const upload = multer({storage})


/**
 * @api {post} /merge-videos Create merge videos
 * @apiName CreateMergeVideos
 * @apiGroup MergeVideos
 * @apiParam videos mp4 video files.
 * @apiSuccess {Object} mergeVideos Merge videos's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Merge videos not found.
 */
router.post('/',
  upload.array('videos'),
  mergeVideosFiles)

export default router
