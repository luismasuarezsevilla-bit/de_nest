import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    // Obtener la petición y la respuesta
    const context = host.switchToHttp();
    const request = context.getRequest<Request>();
    const response = context.getResponse<Response>();

    // Obtiene el código del error (400, 403, 404)
    const statusCode = exception.getStatus();

    // Obtiene el mensaje del error
    const errorResponse = exception.getResponse();
    let message: string;

    if (typeof errorResponse === 'string') {
      message = errorResponse;
    } else {
      const errorMessage = (errorResponse as any).message;

      if (Array.isArray(errorMessage)) {
      
        message = errorMessage.join(', ');
      } else {
        message = errorMessage ?? 'Bad Request';
      }
    }

    //Esto es oara Enviar la respuesta con formato uniforme
    response.status(statusCode).json({
      success: false,
      statusCode,
      message,
      path: request.url,
      timestamp: new Date().toISOString(),
    });
  }
}
