import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
    selector: 'gifs-search-box',
    template: `
        <h5>Buscar</h5>
        <input type="text"
        class="form-control"
        placeholder="buscar gifs..."
        (keyup.enter)="searchTag()"
        #txtTagInput
        >
    `
})

export class SearchBoxComponent{

    //? @ViewChild nos sirve para tomar una referencia local
    @ViewChild('txtTagInput')
    public tagInput!: ElementRef<HTMLInputElement>;

    searchTag(){
        const newTag = this.tagInput.nativeElement.value;
        console.log({ newTag });
    }
    constructor() { }
}