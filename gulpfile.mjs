import path from 'path'
import fs from 'fs'
import { glob } from 'glob'
import sharp from 'sharp'
import { series, watch } from 'gulp'
export async function images(done) {
    const srcDir = './src/resources';
    const buildDir = './build/resources';
    const images = await glob('./src/resources/**/*{jpeg,jpg,png}')
    images.forEach(file => {
        const relativePath = path.relative(srcDir, path.dirname(file))
        const outputSubDir = path.join(buildDir, relativePath)
        processImages(file, outputSubDir)
    })
    done()
}
function processImages(file, outputSubDir) {
    if (!fs.existsSync(outputSubDir)) fs.mkdirSync(outputSubDir, { recursive: true })
    const baseName = path.basename(file, path.extname(file))
    const outputFileWebp = path.join(outputSubDir, baseName + '.webp')
    const options = { quality: 80 }
    sharp(file).webp(options).toFile(outputFileWebp)
}
export function dev() {
    watch('./src/resources/**/*{jpeg,jpg,png}', images)
}
export default series( images, dev)