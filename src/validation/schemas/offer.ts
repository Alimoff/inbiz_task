import * as yup from 'yup';

export const createOfferValidationSchema = yup.object({
    adId: yup.string().required(),
    userId: yup.string().required(),
    price: yup.number(),
    description: yup.string(),
    date: yup.date().required(),
})

export const updateOfferValidationSchema = yup.object({
    price: yup.number(),
    description: yup.string(),
    date: yup.date().required(),
})