import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, tap } from 'rxjs/operators';

export interface ContactFormData {
  name: string;
  email: string;
  company: string;
  driversCount: string;
  message: string;
  lgpdConsent: boolean;
}

export interface ContactResponse {
  success: boolean;
  message: string;
}

@Injectable({ providedIn: 'root' })
export class ContactService {
  private readonly apiUrl = '/api/contact';

  submitContact(data: ContactFormData): Observable<ContactResponse> {
    if (!data.lgpdConsent) {
      return throwError(() => new Error('LGPD consent is required'));
    }

    console.log('[ContactService] Submitting contact form (mock):', {
      ...data,
      email: '[REDACTED]',
    });

    return of({ success: true, message: 'Mensagem enviada com sucesso!' }).pipe(
      delay(1200),
      tap(() => console.log('[ContactService] Mock response sent')),
    );
  }
}
