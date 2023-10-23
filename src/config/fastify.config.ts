import configs from "../configuration";

const envToLogger: Record<string, any> = {
    dev: {
        transport: {
            target: "pino-pretty",
            options: {
                colorize: true,
                colorizeObjects: true,
                singleLine: true,
                ignore: "pid,hostname",
                translateTime: "hh:MM:ss:l TT Z",
            },
        },
    },
    local: {
        transport: {
            target: "pino-pretty",
            options: {
                colorize: true,
                colorizeObjects: true,
                singleLine: true,
                ignore: "pid,hostname",
                translateTime: "hh:MM:ss:l TT Z",
            },
        },
    },
    prod: false,
    stag: false,
}

export const fastifyConfigs = {
    logger: true,
    caseSensitive: false,
    ignoreTrailingSlash: true,
    ignoreDuplicateSlashes: true,
}