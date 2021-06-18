import concatFFMPEG from 'ffmpeg-concat'
import * as rra from 'recursive-readdir-async'
import { uuid } from 'uuidv4'

export const mergeVideosFiles = async ({
  files = [],
  body: { folder } = ''
}, res) => {
  try {
    if (!folder) {
      throw new Error('Please send the folder name')
    }

    const list = await rra.list(`videos/${folder ?? ''}`, { ignoreFolders: true })

    if (list?.length <= 1) {
      throw new Error('Please send folder name that contains more than 1 mp4 videos')
    }

    if (list?.error) {
      throw new Error(list?.error)
    }

    const mergeFileName = `${uuid()}.mp4`

    await concatFFMPEG({
      output: `${__dirname}/../../../uploads/${mergeFileName}`,
      videos: list?.map(({ fullname }) => fullname),
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
