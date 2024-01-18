import * as yup from 'yup';

export const createAdValidationSchema = yup.object({
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