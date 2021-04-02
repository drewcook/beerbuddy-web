import { format } from 'date-fns'

const formatAs = 'MM/dd/yyyy @ hh:mm a'

export const formatDate = date => (date ? format(date, formatAs) : format(new Date(), formatAs))
