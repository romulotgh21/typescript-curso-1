import { MensagemView } from "./../views/mensagem-view.js";
import { NegociacoesView } from "./../views/negociacoes-view.js";
import { Negociacao } from "../models/negociacao.js";
import { Negociacoes } from "../models/negociacoes.js";
import { DiasDaSemana } from "../enums/dias-da-semana.js";
export class NegociacaoController {
    constructor() {
        this.negociacoes = new Negociacoes();
        this.negociacoesView = new NegociacoesView("#negociacoesView", true);
        this.mensagemView = new MensagemView("#mensagemView");
        this.inputData = document.querySelector("#data");
        this.inputQuantidade = document.querySelector("#quantidade");
        this.inputValor = document.querySelector("#valor");
        this.negociacoesView.update(this.negociacoes);
    }
    adiciona() {
        // const negociacao = this.criaNegociacao();
        const negociacao = Negociacao.criaDe(this.inputData.value, this.inputQuantidade.value, this.inputValor.value);
        if (!this.ehDiaUtil(negociacao.data)) {
            this.mensagemView.update("Apenas Negociações dentro de dias uteis");
            return;
        }
        this.negociacoes.adiciona(negociacao);
        console.log(this.negociacoes.lista());
        this.AtualizaView();
        this.limparFormulario();
    }
    ehDiaUtil(data) {
        const diaSemana = data.getDay();
        return (diaSemana !== DiasDaSemana.DOMINGO && diaSemana !== DiasDaSemana.SABADO);
    }
    // private criaNegociacao(): Negociacao {
    //   const exp = /-/g;
    //   const date = new Date(this.inputData.value.replace(exp, ","));
    //   const quantidade = parseInt(this.inputQuantidade.value);
    //   const valor = parseFloat(this.inputValor.value);
    //   return new Negociacao(date, quantidade, valor);
    // }
    limparFormulario() {
        this.inputData.value = "";
        this.inputQuantidade.value = "";
        this.inputValor.value = "";
        this.inputData.focus();
    }
    AtualizaView() {
        this.negociacoesView.update(this.negociacoes);
        this.mensagemView.update(`Sua negociação foi feita com sucesso.`);
    }
}
