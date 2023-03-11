import { useEffect, useState } from 'react'
import { ObjectSchema } from 'yup'

export const useRegistrationErrors = (
    schema: ObjectSchema<any>,
    text: string,
    type: 'password' | 'username'
) => {
    const [errorsArr, setErrorsArr] = useState<string[]>([]);

    useEffect( () => {
        if (type === 'password') {
            const validate = async (password: string) => {
                await schema.validate(
                    {
                        password,
                    },
                    {abortEarly: false}
                ).then(() => setErrorsArr([])).catch(e => setErrorsArr(e.errors));
            }

           validate(text);
        }
        if (type === 'username') {
            const validate = async (username: string) => {
                await schema.validate(
                    {
                        username,
                    },
                    {abortEarly: false}
                ).then(() => setErrorsArr([])).catch(e => setErrorsArr(e.errors));
            }

            validate(text);
        }
    }, [text, schema, type])

    return { errorsArr }
}
