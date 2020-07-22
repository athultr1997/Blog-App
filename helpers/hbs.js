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
	},
	editIcon: (storyUser, loggedUser, storyId, floating=true) => {
		if(storyUser._id.toString() == loggedUser._id.toString()) {
			console.log("Working\n\n")
			if(floating) {
				return `<a href="/blogs/edit/${storyId}" class="btn-floating halfway-fab blue"><i class="fas fa-edit fa-small"></i></a>`
			} else {
				return `<a href="/blogs/edit/${storyId}"><i class="fas fa-edit"></i></a>`
			}
		} else {
			return ``
		}
	},
	select: (selected, options) => {
	    return options
			.fn(this)
			.replace(
				new RegExp(' value="' + selected + '"'),
				'$& selected="selected"'
			)
			.replace(
				new RegExp('>' + selected + '</option>'),
				' selected="selected"$&'
			)
	 },
}