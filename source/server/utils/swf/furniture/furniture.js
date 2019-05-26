// @flow
import IO from 'fs'
import Download from 'download'

import Config, { downloadURL } from './config.json'
import Logger from '../../logger'
import Chalk from 'chalk'

import Parser from 'fast-xml-parser'
import Path from 'path'

export default class Furniture {

	revision: number
	className: string

	/**
	 * @param {number} revision - 
	 * @param {string} className - 
	 */
	constructor(revision: number, className: string) {
		this.revision = revision
		this.className = className

		this.download()
	}

	/**
	 * 
	 */
	async download(): Promise<void> {

		try {

			var URLPath = `${downloadURL}/${this.revision}/${this.className.concat('.swf')}`
			var localPath = Path.join(__dirname, 'out')
			var localFilePath = Path.join(localPath, this.className.concat('.swf'))

			await IO.exists(localFilePath, exists => {

				if (!exists) {

					Download(URLPath, localPath).then(data => {

						Logger.info(`Downloaded ${Chalk.red(this.className.concat('.swf'))} from ${Chalk.green(URLPath)}`)
					}).catch(error => {
						throw error
					})
				}
			})
		} catch(error) {
			Logger.error(error)
		}
	}
}