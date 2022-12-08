const nodemailer = require("nodemailer")
const fs = require("fs")
const ejs = require("ejs")
const path = require("path")
require("dotenv").config()

const config = require("../config/config")

class Mail {
	extension = ".ejs"
	mails = path.join(config["views"], "mail")
	host = process.env.HOST
	port = process.env.PORT

	html(file_name, data) {
		data.asset = this.asset
		file_name.match(/.ejs/g) ? "" : (file_name += this.extension)
		let path_file = path.join(this.mails, file_name)
		let html = ejs.renderFile(path_file, data)
		return html
	}

	asset(path_file) {
		let url = config["public"]
		path_file = url + "/" + path_file
		return path_file
	}

	transporter = nodemailer.createTransport({
		host: process.env.MAIL_HOST,
		port: process.env.MAIL_PORT,
		service: "gmail",
		secure: false,
		auth: {
			user: process.env.MAIL_USERNAME,
			pass: process.env.MAIL_PASSWORD,
		},
	})
	attachments(array_pathFile) {
		let attachments = array_pathFile.map((pathFile) => {
			return {
				path: this.asset(pathFile),
				cid: pathFile,
			}
		})
		return attachments
	}
	sendMail = async function ({
		viewEjs,
		toEmail,
		subject,
		dataMail,
		attachments = [],
	}) {
		dataMail.asset = this.asset
		let html = await this.html(viewEjs, dataMail)
		await this.transporter.sendMail({
			from: "Web NodeJS By QuyVu",
			to: toEmail,
			subject: subject,
			html: html,
			attachments: this.attachments(attachments),
		})
	}
}

module.exports = new Mail()
