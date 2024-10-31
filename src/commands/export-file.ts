// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.
import execa from 'execa'
import { existsSync, writeFileSync } from 'node:fs'
import { basename, resolve } from 'node:path'
import { log } from '../log'
import { ENGINE_DIR, SRC_DIR } from '../constants'
import { delay, ensureDirectory } from '../utils'

export const getPatchName = (file: string): string =>
  `${basename(file).replace(/\./g, '-')}.patch`

export const exportFile = async (file: string): Promise<void> => {
  log.info(`Exporting ${file}...`)

  if (!existsSync(resolve(ENGINE_DIR, file)))
    throw new Error(
      `File ${file} could not be found in engine directory. Check the path for any mistakes and try again.`
    )

  const proc = await execa(
    'git',
    [
      'diff',
      '--src-prefix=a/',
      '--dst-prefix=b/',
      '--full-index',
      resolve(ENGINE_DIR, file),
    ],
    {
      cwd: ENGINE_DIR,
      stripFinalNewline: false,
    }
  )
  const name = getPatchName(file)
  const patchPath = file.replace(/\./g, '-').split('/').slice(0, -1)

  await ensureDirectory(resolve(SRC_DIR, ...patchPath))

  if (proc.stdout.length >= 8000) {
    log.warning('')
    log.warning(
      `Exported patch is over 8000 characters. This patch may become hard to manage in the future.`
    )
    log.warning(
      `We recommend trying to decrease your patch size by making minimal edits to the source.`
    )
    log.warning('')
    await delay(2000)
  }

  writeFileSync(resolve(SRC_DIR, ...patchPath, name), proc.stdout)
  log.info(`Wrote "${name}" to patches directory.`)
  console.log()
}
