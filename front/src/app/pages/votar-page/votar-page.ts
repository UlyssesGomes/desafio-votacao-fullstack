import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputMaskModule } from 'primeng/inputmask';
import { InputNumber } from 'primeng/inputnumber';
import { InputText } from 'primeng/inputtext';
import { Message } from 'primeng/message';
import { MessageService } from 'primeng/api';
import { SelectModule } from 'primeng/select';

import { ContentPanel } from '../../shared/components/content-panel/content-panel';
import { PautaService } from '../pautas-page/service/pauta.service';

@Component({
  selector: 'app-votar-page',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, ButtonModule, ContentPanel, FloatLabelModule, InputMaskModule, InputNumber, InputText, Message, SelectModule],
  templateUrl: './votar-page.html',
  styleUrl: './votar-page.scss',
})
export class VotarPage {

  voteOptions = [
    { label: 'Sim', value: 'SIM' },
    { label: 'Não', value: 'NAO' }
  ];

  form!: FormGroup;

  constructor(private fb: FormBuilder, private service: PautaService, private messageService: MessageService) {
    this.form = this.fb.group({
      pautaId: this.fb.control(null, [Validators.required]),
      usuarioId: this.fb.control<number | null>(null, [Validators.required, Validators.min(1)]),
      cpf: this.fb.control<string | null>('', [Validators.required]),
      opcao: this.fb.control<'SIM' | 'NAO' | null>(null, [Validators.required])
    });
  }

  invalidField(name: string): boolean {
    const campo = this.form.controls[name];
    return campo.invalid && (campo.touched || campo.dirty);
  }

  errorMessage(name: string): string {
    const erros = this.form.controls[name].errors;
    if (!erros) return '';

    if (erros['required']) return 'Campo obrigatório.';
    if (erros['min']) return `O valor mínimo é ${erros['min'].min}.`;
    if (erros['cpfInvalido']) return 'CPF inválido.';
    return 'Valor inválido.';
  }

  save(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.service.vote(this.form.value['pautaId'], this.form.value).subscribe({
      next: () => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Pauta criada com sucesso.' });
      },
      error: (error) => {
        this.messageService.add({ severity: 'error', summary: error.title, detail: error.message });
      }
    });
  }
}
