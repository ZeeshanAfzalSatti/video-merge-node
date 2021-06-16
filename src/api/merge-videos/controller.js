import concatFFMPEG from 'ffmpeg-concat'
import { uuid } from 'uuidv4'

export const mergeVideosFiles = async ({ files = [] }, res, next) => {
  try {
    if (files?.length <= 1) {
      throw new Error('Please upload more than 1 mp4 videos to merge')
    }

    const filePaths = files?.map(({ path }) => {
      if (!path?.includes('.mp4')) {
        throw new Error('Please upload files in .mp4 format')
      }
      return path
    })

    const mergeFileName = `${uuid()}.mp4`

    await concatFFMPEG({
      output: `${__dirname}/../../../uploads/${mergeFileName}`,
      videos: filePaths,
      transition: {
        name: 'directionalWipe',
        duration: 10
      }
    })

    return res.status(201).json({
      filePaths: `${process.env.SERVER_URL}/${mergeFileName}`
    })
  } catch (err) {
    return res.status(400).json({ message: err?.message })
  }
}
