import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';

import { catchError, Observable, tap, throwError } from 'rxjs';

import { environment } from '../../../../environments/environment';
import { PaginatedResponse } from '../../../shared/models/paginated-response';
import { Pautas } from '../model/pautas';
import { PautaResult } from '../model/pauta-result';

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

  openSessionById(id: number, data: Partial<{ duracao: number }>): Observable<string> {
    const url = `${this.urlBase}${this.getEndpoint()}/${id}/abrir-sessao`;

    if (environment.enableDebug) {
      console.info(`PATCH ${this.getEndpoint()}/abrir-sessao: `, url, data);
    }

    return this.http.patch(url, data, { responseType: 'text' }).pipe(
      tap(response => {
        if (environment.enableDebug) {
          console.info(`${this.getEndpoint()}/abrir-sessao PATCH: `, response);
        }
      }),
      catchError(this.handleError)
    );
  }

  vote(id: number, data: Partial<any>): Observable<any> {
    const url = `${this.urlBase}${this.getEndpoint()}/${id}/votar`;
    const headers = this.getHeaders();

    if (environment.enableDebug) {
      console.info(`PATCH ${this.getEndpoint()}/votar: `, url, data);
    }

    return this.http.patch<any>(url, data).pipe(
      tap(response => {
        if (environment.enableDebug) {
          console.info(`${this.getEndpoint()}/votar PATCH: `, response);
        }
      }),
      catchError(this.handleError)
    );
  }

  countVotesById(id: number): Observable<PautaResult> {
    const url = `${this.urlBase}${this.getEndpoint()}/${id}/contabilizar-votos`;
    const headers = this.getHeaders();

    if (environment.enableDebug) {
      console.info(`GET ${this.getEndpoint()}/contabilizar-votos: `, url);
    }

    return this.http.get<PautaResult>(url, { headers }).pipe(
      tap(response => {
        if (environment.enableDebug) {
          console.info(`${this.getEndpoint()}/contabilizar-votos GET response by ID: `, response);
        }
      }),
      catchError(this.handleError)
    );
  }

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
          errorTitle = error.error.title;
      }

      if (error?.error) {
        errorMessage = `${error.error.detail}`;
      }
    }

    if (environment.enableDebug) {
      console.error('Error HTTP:', error.error);
    }

    return throwError(() => {
      return { title: errorTitle, message: errorMessage };
    });
  }
}
