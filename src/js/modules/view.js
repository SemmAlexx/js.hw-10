import {
    PRIORITY_TYPES,
    ICON_TYPES,
    NOTE_ACTIONS,
    refs,
    uuidv4
} from '../utils/constants';

import
Notepad
from './notepad-model'

function createEl(tagName, className, dataName = '', dataValue = '') {
    const newElement = document.createElement(tagName);
    const classNameArr = className.split(' ');
    for (let key of classNameArr) {
        newElement.classList.add(key);
    }
    if (dataValue !== '' && dataName !== '') {
        newElement.dataset[dataName] = dataValue;
    }
    return newElement;
};

function createActionButton(dataValue) {
    const newElement = document.createElement('button');
    newElement.classList.add('action');
    newElement.dataset.action = dataValue;
    return newElement;
}

function createActionIcon(text) {
    const newElement = document.createElement('i');
    newElement.classList.add('material-icons');
    newElement.classList.add('action__icon');
    newElement.textContent = text;
    return newElement;
}


export const renderNoteList = (listRef, notes) => {
    const list = notes.map(el => createListItem(el));
    
    listRef.innerHTML = '';
    
    listRef.append(...list);

    return listRef;
}



function createListItem(note) {
    const noteLi = createEl('li', 'note-list__item', 'id', note.id);
    const divNote = createEl('div', 'note');
    noteLi.appendChild(divNote);

    divNote.append(createNoteContent(note));
    divNote.append(createNoteFooter(note.priority));

    console.log('noteLi :', noteLi);
    return noteLi;
}

function createNoteContent(note) {
    const divNoteContent = createEl('div', 'note__title');

    const noteTitle = createEl('h2', 'note__title');
    noteTitle.textContent = note.title;

    const noteBody = createEl('p', 'note__body');
    noteBody.textContent = note.body;

    divNoteContent.append(noteTitle, noteBody);

    return divNoteContent;
}

function createNoteFooter(priority) {
    const noteFooter = createEl('footer', 'note__footer');
    const sectionTop = createEl('section', 'note__section');

    const buttonDecrease = createActionButton('decrease-priority');
    const iconMore = createActionIcon(ICON_TYPES.ARROW_DOWN);

    const buttonIncrease = createActionButton('increase-priority');
    const iconLess = createActionIcon(ICON_TYPES.ARROW_UP);

    const span = createEl('span', 'note__priority');
    span.textContent = `Priority: ${priority}`;

    const sectionBottom = createEl('section', 'note__section');

    const buttonEdit = createActionButton('edit-note');
    const iconEdit = createActionIcon(ICON_TYPES.EDIT);

    const buttonDelete = createActionButton('delete-note');
    const iconDelete = createActionIcon(ICON_TYPES.DELETE);

    noteFooter.append(sectionTop, sectionBottom);
    sectionTop.append(buttonDecrease, buttonIncrease, span);
    sectionBottom.append(buttonEdit, buttonDelete);

    buttonDecrease.appendChild(iconMore);
    buttonIncrease.appendChild(iconLess);

    buttonEdit.appendChild(iconEdit);
    buttonDelete.appendChild(iconDelete);

    return noteFooter;
}

export function addListItem(listRef, note) {
    const listItem = createListItem(note)
    listRef.appendChild(listItem)
}
