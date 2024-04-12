import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchResponse } from '../interfaces/gifs.interfaces';
const API_KEY = '2SamuS82SxwgENjJLsSoAnh7CjMImdZd';

@Injectable({providedIn: 'root'})
export class GifsService {

    private _tagHistory: string[] = [];
    private serviceUrl: string = 'https://api.giphy.com/v1/gifs';
    public gifList: Gif[] = [];
        
    constructor(private http: HttpClient) { 
        this.loadLocalStorage();
        console.log(`Gifs Service Load`);
    }
    
    get tagHistory() {
        return [...this._tagHistory];
    }

    public organizedHistory( tag: string ) {
        tag = tag.toLocaleLowerCase();

        if (this._tagHistory.includes(tag)) {
            this._tagHistory = this._tagHistory.filter(oldTag => oldTag !== tag);
        }

        this._tagHistory.unshift(tag);
        this._tagHistory = this._tagHistory.splice(0, 10);
        this.saveLocalStorage();
    }

    private saveLocalStorage(): void {
        localStorage.setItem('history', JSON.stringify(this._tagHistory));
    }

    private loadLocalStorage(): void {
        if (!localStorage.getItem('history')) return;
        this._tagHistory = JSON.parse(localStorage.getItem('history')!);
        if ( this._tagHistory.length === 0) return;
        this.searchTag(this._tagHistory[0]);
    }

    public searchTag(tag: string): void {
        if (tag.length === 0) return;
        this.organizedHistory(tag);

        // fetch('https://api.giphy.com/v1/gifs/search?api_key=2SamuS82SxwgENjJLsSoAnh7CjMImdZd&q=valorant&limit=10')
        //     .then(resp => resp.json())
        //     .then(data => console.log(data));

        const params = new HttpParams()
            .set('api_key', API_KEY)
            .set('limit', '10')
            .set('q', tag)

        this.http.get<SearchResponse>(`${ this.serviceUrl }/search`, { params: params }) //!o params solamente
            .subscribe(resp => {
                this.gifList = resp.data;
                // console.log({ gifs: this.gifList })
            });
    }
}