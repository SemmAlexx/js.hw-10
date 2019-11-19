import {
    PRIORITY_TYPES,
    uuidv4,
} from '../utils/constants';


export default class Notepad {
    constructor(notes = []) {
        this._notes = notes;
    }

    get notes() {
        return this._notes;
    };

    saveListItem(note) {
        const newItem = {
            id: uuidv4(),
            title: note.title,
            body: note.body,
            priority: PRIORITY_TYPES.LOW,
        }

        this._notes.push(newItem);
        return newItem;
    }

    filterListItems(query = '') {
        return this._notes.filter(item => item.body.toLowerCase().includes(query.toLowerCase()) || item.title.toLowerCase().includes(query.toLowerCase()));
    }

    removeListItem(id) {
        this._notes = this._notes.filter(notes => notes.id !== id);
    }
}
