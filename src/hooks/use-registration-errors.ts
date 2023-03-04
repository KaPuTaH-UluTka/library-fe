import { useEffect, useState } from 'react'
import { ObjectSchema } from 'yup'

export const useRegistrationErrors = (
    schema: ObjectSchema<any>,
    text: string,
    type: 'password' | 'username'
) => {
    const [errorsArr, setErrorsArr] = useState<string[]>([])

    useEffect(() => {
        if (type === 'password') {
            const validate = async (password: string) => {
                try {
                    const result = await schema.validate(
                        {
                            password,
                        },
                        { abortEarly: false }
                    )

                    if (result) {
                        setErrorsArr([])
                    }
                } catch (e: any) {
                    setErrorsArr(e.errors)
                }
            }

            validate(text)
        }
        if (type === 'username') {
            const validate = async (username: string) => {
                try {
                    const result = await schema.validate(
                        {
                            username,
                        },
                        { abortEarly: false }
                    )

                    if (result) {
                        setErrorsArr([])
                    }
                } catch (e: any) {
                    setErrorsArr(e.errors)
                }
            }

            validate(text)
        }
    }, [text, schema, type])

    return { errorsArr }
}
