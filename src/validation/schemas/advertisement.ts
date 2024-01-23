import * as yup from 'yup';

export const createAdValidationSchema = yup.object({
    title:yup.string(),
    description:yup.string(),
    category:yup.string(),
    price:yup.number(),
    file:yup.string(),
    duration: yup.number(),
});

export const updateAdValidationSchema = yup.object({
    title:yup.string().required(),
    description:yup.string(),
    category:yup.string().required(),
    price:yup.number().required(),
    file:yup.string(),
    publishedBy:yup.string().required(),
    publishedDate:yup.date().required(),
    duration: yup.number().required(),
    expirationDate: yup.date().required(),
    archived: yup.boolean(),
});