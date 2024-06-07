export const validationErrros: ValidationErrors = {
    errors: [
        {
            property: "FirstName",
            error: "required"
        },
        {
            property: "LastName",
            error: "required"
        },
         {
            property: "LastName",
            error: "at least 2 characters"
        }, 
        {
            property: "Unknown",
            error: "this is the unknown property error"
        },
        {
            property: "Unknown",
            error: "this is another unknown property error with the same name"
        },
        {
            property: "Country",
            error: "Country error"
        },
        {
            property: "ZipCode",
            error: "zip code error"
        }

    ]
}

export type ValidationErrors = { errors: ValidationError[] }
export type ValidationError = { property: string, error: string }