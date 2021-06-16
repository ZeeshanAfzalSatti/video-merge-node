import concatFFMPEG from 'ffmpeg-concat'

export const mergeVideosFiles = async ({ files = [] }, res, next) => {
  try {
    if (files?.length <= 1) {
      throw new Error('Please upload more than 1 mp4 videos to merge')
    }

    const concatFiles = await concatFFMPEG({
      output: `${__dirname}test.mp4`,
      videos: files?.map(({ path }) => path),
      transition: {
        name: 'directionalWipe',
        duration: 500
      }

    })

    console.log(concatFiles)
    return res.status(201).json(concatFiles)
  } catch (err) {
    next(err)
  }
}
