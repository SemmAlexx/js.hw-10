import {
    PRIORITY_TYPES,
    ICON_TYPES,
    refs,
    uuidv4
} from './utils/constants';
import initialNotes from './modules/initialNotes';
import Notepad from './modules/notepad-model';
import {
    renderNoteList,
    addListItem
} from './modules/view';

const notepad = new Notepad(initialNotes);

function handleSubmit(event) {
    event.preventDefault();
    const [title, body] = event.target.elements;
    if (title.value.trim().length === 0 || body.value.trim().length === 0) {
        return alert('Необходимо заполнить все поля!');
    }
    const obj = {
        title: title.value,
        body: body.value,
    }
    const saveItem = notepad.saveListItem(obj);
    addListItem(refs.noteList, saveItem)
    
    event.currentTarget.reset();
}

refs.form.addEventListener('submit', handleSubmit);

function handleFilterChange(event) {
    const filteredItems = notepad.filterListItems(event.target.value);

    renderNoteList(refs.noteList, filteredItems);
}

function handleListClick(event) {
    if (event.target.nodeName !== 'I') return;

    if (event.target.textContent === ICON_TYPES.DELETE) {
        const parentItem = event.target.closest('.note-list__item');
        const id = parentItem.dataset.id;

        parentItem.remove();
        notepad.removeListItem(id);

    }
}

renderNoteList(refs.noteList, notepad.notes);


refs.filter.addEventListener('input', handleFilterChange);


refs.noteList.addEventListener('click', handleListClick);