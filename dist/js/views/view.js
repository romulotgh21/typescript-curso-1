export class View {
    constructor(seletor) {
        this.elemento = document.querySelector(seletor);
    }
    template(model) {
        throw Error("Classe filha precissa implementar o metodo template.");
    }
    update(model) {
        const template = this.template(model);
        this.elemento.innerHTML = template;
    }
}
