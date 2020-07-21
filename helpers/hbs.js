const moment = require('moment')

module.exports = {
	formatDate: (date, format) => {
		return moment(date).format(format)
	},
	truncate: function (string, maxLength) {
	    if (string.length > maxLength && string.length > 0) {
	      let validString = string + ' '
	      validString = string.substr(0, maxLength)
	      validString = string.substr(0, validString.lastIndexOf(' '))
	      validString = validString.length > 0 ? validString : string.substr(0, maxLength)
	      return validString + '...'
	    }
	    return string
	},
	stripTags: (string) => {
		return string.replace(/<(?:.|\n)*?>/gm, '')		
	}
}