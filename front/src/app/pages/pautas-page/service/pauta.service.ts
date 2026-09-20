import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';

import { catchError, Observable, tap, throwError } from 'rxjs';

import { environment } from '../../../../environments/environment';
import { PaginatedResponse } from '../../../shared/models/paginated-response';
import { Pautas } from '../model/pautas';

@Injectable({
  providedIn: 'root',
})
export class PautaService {
  protected urlBase = environment.apiUrl;

  constructor(protected readonly http: HttpClient) {
    if (environment.enableDebug) {
      console.info('Backend API URL:', this.urlBase);
    }
  }

  create(model: Pautas) {
    const url = this.urlBase + this.getEndpoint();
    const headers = this.getHeaders();

    if (environment.enableDebug) {
      console.info(`POST ${this.getEndpoint()}: `, url, model);
    }

    return this.http.post<Pautas>(url, model, { headers }).pipe(
      tap(response => {
        if (environment.enableDebug) {
          console.info(`${this.getEndpoint()} POST response: `, response);
        }
      }),
      catchError(this.handleError)
    );
  }

  getById(id: number): Observable<Pautas> {
    const url = `${this.urlBase}${this.getEndpoint()}/${id}`;
    const headers = this.getHeaders();

    if (environment.enableDebug) {
      console.info(`GET ${this.getEndpoint()}: `, url);
    }

    return this.http.get<Pautas>(url, { headers }).pipe(
      tap(response => {
        if (environment.enableDebug) {
          console.info(`${this.getEndpoint()} GET response by ID: `, response);
        }
      }),
      catchError(this.handleError)
    );
  }

  listWithPagination(
    first: number = 1,
    pageSize: number = 10,
    filters?: { [key: string]: any }
  ): Observable<any> {
    const url = `${this.urlBase}${this.getEndpoint()}`;
    const headers = this.getHeaders();

    const page = first / pageSize;

    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', pageSize.toString());

    if (filters) {
      Object.keys(filters).forEach(key => {
        if (filters[key] !== null && filters[key] !== undefined && filters[key] !== '') {
          params = params.set(key, filters[key].toString());
        }
      });
    }

    if (environment.enableDebug) {
      console.info(`GET all paginated ${this.getEndpoint()}: `, url, params.toString());
    }

    return this.http.get<PaginatedResponse<Pautas>>(url, { headers, params }).pipe(
      tap(response => {
        if (environment.enableDebug) {
          console.info(`${this.getEndpoint()} GET all paginated response: `, response);
        }
      }),
      catchError(this.handleError)
    );
  }

  patchById(id: number, data: Partial<Pautas>): Observable<Pautas> {
    const url = `${this.urlBase}${this.getEndpoint()}/${id}`;
    const headers = this.getHeaders();

    if (environment.enableDebug) {
      console.info(`PATCH ${this.getEndpoint()}: `, url, data);
    }

    return this.http.patch<Pautas>(url, data, { headers }).pipe(
      tap(response => {
        if (environment.enableDebug) {
          console.info(`${this.getEndpoint()} PATCH: `, response);
        }
      }),
      catchError(this.handleError)
    );
  }

  deleteById(id: number): Observable<void> {
    const url = `${this.urlBase}${this.getEndpoint()}/${id}`;
    const headers = this.getHeaders();

    if (environment.enableDebug) {
      console.info(`DELETE ${this.getEndpoint()}: `, url);
    }

    return this.http.delete<void>(url, { headers }).pipe(
      tap(() => {
        if (environment.enableDebug) {
          console.info(`${this.getEndpoint()} DELETE was deleted with success. `);
        }
      }),
      catchError(this.handleError)
    );
  }

  /**
   * Implement to tell which source this api will consume.
   * Ex: if you are in user feature, return string 'user'.
   */
  private getEndpoint(): string {
    return 'api/v1/pautas';
  }

  private getHeaders(): HttpHeaders {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return headers;
  }

  /**
 * Tratamento de erros
 */
  protected handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'Ocorreu um erro desconhecido';
    let errorTitle = 'Erro';

    if (error.error instanceof ErrorEvent) {
      // Erro do lado do cliente
      errorMessage = `Erro: ${error.error.message}`;
    } else {
      // Erro do lado do servidor
      switch (error.status) {
        case 400:
          errorTitle = 'Requisição inválida';
          break;
        case 401:
          errorTitle = 'Não autorizado';
          break;
        case 403:
          errorTitle = 'Acesso negado';
          break;
        case 404:
          errorTitle = 'Recurso não encontrado';
          break;
        case 500:
          errorTitle = 'Erro interno do servidor';
          break;
        case 503:
          errorTitle = 'Serviço indisponível';
          break;
        default:
          errorTitle = `Erro ${error.status}`;
      }

      // Adiciona mensagem do backend se existir
      if (error?.error.error) {
        errorMessage = `${error.error.error}`;
      } else if (error?.error) {
        errorMessage = `${error.error}`;
      } else if (error.status) {
        errorMessage = errorTitle;
      }
    }

    if (environment.enableDebug) {
      console.error('Error HTTP:', error);
      console.error('Message:', errorMessage);
    }

    return throwError(() => { title: errorTitle; message: errorMessage; });
  }
}
