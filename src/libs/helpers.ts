import config from '../configuration';
// import { ENVIRONMENT } from '../common';
import { AsyncParser } from '@json2csv/node';

export const isLocal = true

export const convertJson2Csv = async (json: Record<string, any>[], headers: any) => {
    const parser = new AsyncParser({ fields: headers });
    const csv = await parser.parse(json).promise();
    return csv
}

export const exceptionHandler = async (error: any, request: any, reply: any) => {
    if (error.code === "FST_ERR_VALIDATION") {
        return reply.unprocessableEntity(error.message);
    }
    // we will make this logging more sophisticated later
    console.log("Exception: ", {
        name: error.name,
        statusCode: error.statusCode,
        validation: error.validation,
        validationContext: error.validationContext,
        stack: error.stack,
        message: error.message,
    })

    return reply.status(error.statusCode || 500).send({
        statusCode: error.statusCode,
        error: error.name || "InternalServerError",
        message: error.message || 'Internal Server Error',
    });

}