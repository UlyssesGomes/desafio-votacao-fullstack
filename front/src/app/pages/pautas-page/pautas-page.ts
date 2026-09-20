import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ButtonModule } from 'primeng/button';
import { PaginatorModule } from 'primeng/paginator';
import { SelectModule } from 'primeng/select';
import { TableModule } from 'primeng/table';

import { ContentPanel } from '../../shared/components/content-panel/content-panel';
import { PautaService } from './service/pauta.service';
import { Pautas } from './model/pautas';

@Component({
  selector: 'app-pautas-page',
  imports: [CommonModule, FormsModule, ContentPanel, ButtonModule, PaginatorModule, SelectModule, TableModule],
  templateUrl: './pautas-page.html',
  styleUrl: './pautas-page.scss',
})
export class PautasPage implements OnInit {

  pautasList!: Pautas[];

  first: number = 0;
  pageSize: number = 10;
  totalRecords = 100;
  options = [
    { label: 5, value: 5 },
    { label: 10, value: 10 },
    { label: 20, value: 20 },
    { label: 120, value: 120 }
  ];

  constructor(private service: PautaService) { }

  ngOnInit(): void {
    this.getPautasList();
  }

  onPageChange(event: any) {
    this.first = event.first ?? 0;
    this.pageSize = event.rows ?? 10;
    this.getPautasList();
  }

  changePageSize() {
    this.first = 0;
    this.getPautasList();
  }

  getPautasList() {
    this.service.listWithPagination(this.first, this.pageSize).subscribe(response => {
      this.pautasList = response.content;
      this.pageSize = response.page.size;
      this.first = response.page.number * this.pageSize;
      this.totalRecords = response.page.totalElements;
    });
  }
}
