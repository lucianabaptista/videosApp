import { GeneroService } from './../services/genero.service';
import { IFilmeApi } from './../models/IFilmeAPI.model';
import { FilmeService } from './../services/filme.service';
import { DadosService } from './../services/dados.service';
import { IFilme } from '../models/IFilme.model';
import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { IListaFilmes } from '../models/IFilmeAPI.model';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page implements OnInit {

  titulo = 'Filmes';

  listaVideos: IFilme[] = [
    {
      nome: 'Coringa (2019)',
      lancamento: '03/10/2019',
      duracao: '2h 2m',
      classificacao: 82,
      cartaz:
        'https://www.themoviedb.org/t/p/w1280/xLxgVxFWvb9hhUyCDDXxRPPnFck.jpg',
      generos: ['Crime', 'Thriller', 'Drama'],
    },
    {
      nome: 'Tom & Jerry - O Filme (2021)',
      lancamento: '11/02/2021',
      duracao: '1h 41m',
      classificacao: 73,
      cartaz:
        'https://www.themoviedb.org/t/p/w1280/9NvYyM8H6d5KAVGqpyFV9YPO5cU.jpg',
      generos: ['Comédia', 'Família', 'Animação'],
    },
    {
      nome: 'Convenção das Bruxas (2020)',
      lancamento: '19/11/2020',
      duracao: '1h 46m',
      classificacao: 67,
      cartaz:
        'https://www.themoviedb.org/t/p/w1280/orrJiQs30G6zSkT8is4QOAtRpFM.jpg',
      generos: ['Família', 'Fantasia', 'Aventura', 'Comédia', 'Terror'],
    },
    {
      nome: 'Twist (2021)',
      lancamento: '22/01/2021',
      duracao: '1h 31m',
      classificacao: 65,
      cartaz:
        'https://www.themoviedb.org/t/p/w1280/h3oT6lZcYC2khtZnzHBgqthj5W.jpg',
      generos: ['Crime', 'Drama', 'Ação'],
    },
    {
      nome: 'The Last - Naruto O Filme (2014)',
      lancamento: '28/05/2015',
      duracao: '1h 54m',
      classificacao: 78,
      cartaz:
        'https://www.themoviedb.org/t/p/w1280/1lt7uwXxNXxurOQqnEyosG6Y5zb.jpg',
      generos: ['Ação', 'Romance', 'Animação'],
    },
  ];

  listaFilmes: IListaFilmes;

  generos: string[] = [];

  constructor(
    public alertController: AlertController,
    public toastController: ToastController,
    public dadosService: DadosService,
    public filmeService: FilmeService,
    public generoService: GeneroService,
    public route: Router) {}

  buscarFilmes(evento: any){
    console.log(evento.target.value);
    const busca = evento.target.value;
    if (busca && busca.trim() !== '') {
      this.filmeService.buscarFilmes(busca).subscribe(dados => {
        console.log(dados);
        this.listaFilmes = dados;
      });
    }
  }

  exibirFilme(filme: IFilmeApi) {
    this.dadosService.guardarDados('filme', filme);
    this.route.navigateByUrl('/dados-filme');
  }

  async exibirAlertaFavorito() {
    const alert = await this.alertController.create({
      header: 'Alerta!',
      message: 'Deseja realmente favoritar o filme?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          },
        },
        {
          text: 'SIM, favoritar',
          handler: () => {
            this.apresentarToast();
          },
        },
      ],
    });

    await alert.present();
  }

  async apresentarToast() {
    const toast = await this.toastController.create({
      message: 'Filme adicionado aos favoritos.',
      duration: 2000,
      color: 'success',
    });
    toast.present();
  }

  ngOnInit(){
    this.generoService.buscarGeneros().subscribe(dados =>{
      console.log('Generos: ', dados.genres);
      dados.genres.forEach(genero => {
        this.generos[genero.id] = genero.name;
      });

      this.dadosService.guardarDados('generos', this.generos);
    });
  }
}
