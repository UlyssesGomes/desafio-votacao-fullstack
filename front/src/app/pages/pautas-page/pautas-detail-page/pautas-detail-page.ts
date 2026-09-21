import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { CommonModule, Location } from '@angular/common';

import { ButtonModule } from 'primeng/button';
import { ConfirmationService } from 'primeng/api';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { DividerModule } from 'primeng/divider';
import { MessageService } from 'primeng/api';

import { ContentPanel } from '../../../shared/components/content-panel/content-panel';
import { OpenSessionDialog } from './open-session-dialog/open-session-dialog';
import { PautaService } from '../service/pauta.service';
import { Pautas } from '../model/pautas';
import { PautaResult } from '../model/pauta-result';
import { ShowResultDialog } from './show-result-dialog/show-result-dialog';

@Component({
  selector: 'app-pautas-detail-page',
  imports: [CommonModule, ButtonModule, ConfirmDialog, ContentPanel, DividerModule, OpenSessionDialog, ShowResultDialog],
  templateUrl: './pautas-detail-page.html',
  styleUrl: './pautas-detail-page.scss',
})
export class PautasDetailPage implements OnInit {
  id!: any;
  pautaDetail?: any;
  pautaResult?: any;

  isOpenSessionDialogVisible = false;
  isOpenResultDialogVisible = false;

  constructor(private service: PautaService, private route: ActivatedRoute, private message: MessageService,
    private location: Location, private dialogService: ConfirmationService) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.loadDetails();
  }

  openSession() {
    this.isOpenSessionDialogVisible = true;
  }

  closeModalSessionEvent(event: any) {
    if (event.confirm) {
      this.service.openSessionById(this.id, { duracao: event.duration }).subscribe({
        next: (response) => {
          this.message.add({ severity: 'success', summary: 'Success', detail: response });
          this.loadDetails();
        },
        error: (error) => {
          this.message.add({ severity: 'error', summary: error.title, detail: error.message });
        }
      });
    }
  }

  countVotes() {
    this.service.countVotesById(this.id).subscribe((result: PautaResult) => {
      this.pautaResult = result;
      this.isOpenResultDialogVisible = true;
    });
  }

  confirmDelete(event: Event) {
    this.dialogService.confirm({
      target: event.target as EventTarget,
      message: 'Tem certeza que deseja deletar essa Pauta?',
      header: 'ATENÇÃO!',
      icon: 'pi pi-exclamation-triangle',
      rejectLabel: 'Cancelar',
      rejectButtonProps: {
        label: 'Cancelar',
        severity: 'secondary',
        outlined: true,
      },
      acceptButtonProps: {
        label: 'Deletar',
        severity: 'danger',
      },
      accept: () => {
        this.delete();
      }
    });
  }

  delete() {
    this.service.deleteById(this.id).subscribe({
      next: (response) => {
        this.message.add({ severity: 'success', summary: 'Success', detail: 'Pauta deletada com sucesso.' });
        this.location.back();
      },
      error: (error) => {
        this.message.add({ severity: 'error', summary: error.title, detail: error.message });
      }
    });
  }

  private loadDetails() {
    this.service.getById(+this.id).subscribe((pauta: Pautas) => {
      this.pautaDetail = pauta;
    });
  }
}
