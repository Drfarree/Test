
const ERRORS_CODES = {
    METAMASK_HAS_ALREADY_REQUEST: {
        CODE: -32002,
        MESSAGE_TO_SHOW: 'Please check Metamask notifications!'
    }
}


export const ErrorHandler = (error) => {
    switch (error.code) {
        case ERRORS_CODES.METAMASK_HAS_ALREADY_REQUEST.CODE:
            return new Error(ERRORS_CODES.METAMASK_HAS_ALREADY_REQUEST.MESSAGE_TO_SHOW)
        default:
            break;
    }
}
