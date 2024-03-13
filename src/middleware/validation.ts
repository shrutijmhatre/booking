import {body} from 'express-validator'

export const bookingInputValidation =[
    body('booking.title', 'title should not be empty').not().isEmpty(),
    body('booking.description', 'description should not be empty').not().isEmpty(),
]