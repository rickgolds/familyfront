import axios from 'axios';
import {CommonModule} from '@angular/common';
import {Meta} from '@angular/platform-browser';
import {Component, OnInit} from '@angular/core';

import {Statistic} from '../../models/statistic.model';
import {HeaderComponent} from '../../components/header/header.component';
import {LoaderComponent} from '../../components/loader/loader.component';

@Component({
  selector: 'app-statistics',
  standalone: true,
  imports: [HeaderComponent, CommonModule, LoaderComponent],
  templateUrl: './statistics.component.html',
  styleUrl: './statistics.component.scss',
})
export class StatisticsComponent implements OnInit {
  loading: boolean = true;
  statisticType: string = 'Income';
  statistics: Statistic[] = [];
  rundomNumber: number = Math.floor(Math.random() * 100);

  constructor(private metaService: Meta) {}

  getStatistics() {
    const url = 'https://george-fx.github.io/apitex_api/api/statistics.json';
    axios
      .get<{statistics: Statistic[]}>(url)
      .then((response) => {
        this.statistics = response.data.statistics;
        console.log('this.statistics', this.statistics);
        this.loading = false;
      })
      .catch((error) => {
        console.error('Ошибка при получении данных:', error);
        this.loading = false;
      });
  }

  ngOnInit(): void {
    this.getStatistics();
    this.metaService.updateTag({name: 'theme-color', content: '#fff'});
    window.scrollTo(0, 0);
  }

  setStatisticType(value: string) {
    this.statisticType = value;
  }
}
