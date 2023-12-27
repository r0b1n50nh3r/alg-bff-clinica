"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = exports.error404Handler = void 0;
const http_errors_1 = __importDefault(require("http-errors"));
const error404Handler = (next) => {
    next((0, http_errors_1.default)(404));
};
exports.error404Handler = error404Handler;
// eslint-disable-next-line
const errorHandler = (err, req, res) => {
    // set locals, only providing error in development
    res.locals.message = req;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    // render the error page
    res.status(res.statusCode || 500);
    res.send({ message: req });
};
exports.errorHandler = errorHandler;
