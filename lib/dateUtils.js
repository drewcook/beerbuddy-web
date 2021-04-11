import { format } from 'date-fns'

const formatAsName = 'MMMM do, yyyy'
const formatAs = 'MM/dd/yyyy @ hh:mm a'

export const formatDate = date => (date ? format(date, formatAs) : format(new Date(), formatAs))

export const formatDateName = date =>
	date ? format(date, formatAsName) : format(new Date(), formatAsName)
