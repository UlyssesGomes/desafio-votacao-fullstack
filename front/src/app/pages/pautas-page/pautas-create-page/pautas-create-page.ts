import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Location } from '@angular/common';

import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { Message } from 'primeng/message';
import { TextareaModule } from 'primeng/textarea';

import { ContentPanel } from '../../../shared/components/content-panel/content-panel';
import { PautaService } from '../service/pauta.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-pautas-create-page',
  imports: [FormsModule, ReactiveFormsModule, ButtonModule, ContentPanel, FloatLabelModule, InputTextModule, Message, TextareaModule],
  templateUrl: './pautas-create-page.html',
  styleUrl: './pautas-create-page.scss',
})
export class PautasCreatePage {

  form!: FormGroup;

  constructor(private fb: FormBuilder, private service: PautaService, private messageService: MessageService, private location: Location) {

    this.form = this.fb.group({
      titulo: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(50),
          Validators.pattern(/\S/)
        ]
      ],
      descricao: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(2000),
          Validators.pattern(/\S/)
        ]
      ]
    });
  }

  invalidField(nome: 'titulo' | 'descricao'): boolean {
    const campo = this.form.controls[nome];
    return campo.invalid && (campo.touched || campo.dirty);
  }

  errorMessage(nome: 'titulo' | 'descricao'): string {
    const erros = this.form.controls[nome].errors;
    if (!erros) return '';

    if (erros['required']) return 'Campo obrigatório.';
    if (erros['pattern']) return 'O campo não pode conter apenas espaços.';
    if (erros['minlength']) return `Mínimo de ${erros['minlength'].requiredLength} caracteres.`;
    if (erros['maxlength']) return `Máximo de ${erros['maxlength'].requiredLength} caracteres.`;
    return 'Valor inválido.';
  }

  save(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.service.create(this.form.value).subscribe(() => {
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Pauta criada com sucesso.'});
      this.location.back();
    });
  }

}
