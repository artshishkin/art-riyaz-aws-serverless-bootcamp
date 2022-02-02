import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

declare const API_ROOT: string;
declare const STAGE: string;

@Injectable()
export class NotesApiService {
    options;
    constructor(private httpClient: HttpClient) {}

    setOptions() {
        this.options = {
            headers: {
                app_user_id: '123454321',
                app_user_name: 'Art'
            }
        };
    }

    addNote(item) {
        let path = STAGE + '/notes';
        let endpoint = API_ROOT + path;
        
        let itemData;
        itemData = {
            content: item.content,
            cat: item.cat
        };

        if(item.title != "") {
            itemData.title = item.title;
        }

        let reqBody = {
            Item: itemData
        };
        this.setOptions();
        return this.httpClient.post(endpoint, reqBody, this.options);
    }

    updateNote(item) {
        let path = STAGE + `/notes/n/${item.note_id}`;
        let endpoint = API_ROOT + path;
        
        let itemData;
        itemData = {
            content: item.content,
            cat: item.cat,
            timestamp: parseInt(item.timestamp),
            note_id: item.note_id
        };

        if (item.title != "") {
            itemData.title = item.title;
        }

        let reqBody = {
            Item: itemData
        };
        this.setOptions();
        return this.httpClient.put(endpoint, reqBody, this.options);
    }

    deleteNote(timestamp) {
        let path = STAGE + '/notes/t/' + timestamp;
        let endpoint = API_ROOT + path;
        this.setOptions();
        return this.httpClient.delete(endpoint, this.options);
    }

    getNotes(start?): Observable<any> {
        let path = STAGE + '/notes?limit=8';
        
        if (start > 0) {
            path += '&start=' + start;
        }
        let endpoint = API_ROOT + path;
        this.setOptions();
        return this.httpClient.get(endpoint, this.options);
    }
}