import * as yup from 'yup';

export const signUpValidationSchema = yup.object({
    email:yup.string().required(),
    name:yup.string().required(),
    surname:yup.string().required(),
    password:yup.string().required(),
    role:yup.string().required(),
});

export const logInValidationSchema = yup.object({
    email:yup.string().required(),
    password:yup.string().required()
});

export const logOutValidationSchema = yup.object({
    email:yup.string().required()
});

export const refreshTokenValidationSchema = yup.object({
    refreshToken: yup.string().required(),
});