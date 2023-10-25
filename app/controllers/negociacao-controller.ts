import { MensagemView } from "./../views/mensagem-view.js";
import { NegociacoesView } from "./../views/negociacoes-view.js";
import { Negociacao } from "../models/negociacao.js";
import { Negociacoes } from "../models/negociacoes.js";
import { DiasDaSemana } from "../enums/dias-da-semana.js";

export class NegociacaoController {
  private inputData: HTMLInputElement;
  private inputQuantidade: HTMLInputElement;
  private inputValor: HTMLInputElement;
  private negociacoes = new Negociacoes();
  private negociacoesView = new NegociacoesView("#negociacoesView", true);
  private mensagemView = new MensagemView("#mensagemView");

  constructor() {
    this.inputData = document.querySelector("#data") as HTMLInputElement;
    this.inputQuantidade = <HTMLInputElement>(
      document.querySelector("#quantidade")
    );
    this.inputValor = document.querySelector("#valor") as HTMLInputElement;
    this.negociacoesView.update(this.negociacoes);
  }

  public adiciona(): void {
    // const negociacao = this.criaNegociacao();
    const negociacao = Negociacao.criaDe(
      this.inputData.value,
      this.inputQuantidade.value,
      this.inputValor.value
    );
    if (!this.ehDiaUtil(negociacao.data)) {
      this.mensagemView.update("Apenas Negociações dentro de dias uteis");
      return;
    }
    this.negociacoes.adiciona(negociacao);
    console.log(this.negociacoes.lista());
    this.AtualizaView();
    this.limparFormulario();
  }

  private ehDiaUtil(data: Date) {
    const diaSemana = data.getDay();
    return (
      diaSemana !== DiasDaSemana.DOMINGO && diaSemana !== DiasDaSemana.SABADO
    );
  }

  // private criaNegociacao(): Negociacao {
  //   const exp = /-/g;
  //   const date = new Date(this.inputData.value.replace(exp, ","));
  //   const quantidade = parseInt(this.inputQuantidade.value);
  //   const valor = parseFloat(this.inputValor.value);
  //   return new Negociacao(date, quantidade, valor);
  // }

  private limparFormulario(): void {
    this.inputData.value = "";
    this.inputQuantidade.value = "";
    this.inputValor.value = "";
    this.inputData.focus();
  }

  private AtualizaView(): void {
    this.negociacoesView.update(this.negociacoes);
    this.mensagemView.update(`Sua negociação foi feita com sucesso.`);
  }
}
