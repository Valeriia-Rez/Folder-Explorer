const structure = [{
        'folder': true,
        'title': 'Films',
        'children': [{
                'title': 'Iron Man.avi'
            },
            {
                'folder': true,
                'title': 'Fantasy',
                'children': [{
                        'title': 'The Lord of the Rings.avi'
                    },
                    {
                        'folder': true,
                        'title': 'New folder 1',
                        'children': false
                    }
                ]
            }
        ]
    },
    {
        'folder': true,
        'title': 'Documents',
        'children': [{
            'folder': true,
            'title': 'EPAM Homework answers',
            'children': null
        }]
    }
];

const rootNode = document.getElementById('root');
const minusOne = -1;
const eight = 8;
const onClickCircle = document.createElement('div');
document.body.appendChild(onClickCircle);

function generateLiWithContent(liContentText, iconName) {
    const li = document.createElement('li');
    li.innerHTML = `<div class="select"><i class='material-icons'>${iconName}</i><span>${liContentText}</span></div>`
    return li;
}

function onMouseDown(e) {
    onClickCircle.style.left = e.pageX - eight + 'px';
    onClickCircle.style.top = e.pageY - eight + 'px';
    onClickCircle.classList.add('circle');
}

function onMouseUp(e) {
    onClickCircle.style.left = e.pageX - eight + 'px';
    onClickCircle.style.top = e.pageY - eight + 'px';
    onClickCircle.classList.remove('circle');
}

function onSectionClick(id) {
    const element = document.getElementById(id);
    const parentElem = element.parentElement;
    const icon = parentElem.querySelector('.material-icons');
    if (element.className.indexOf('show') === minusOne) {
        element.className += ' show';
        icon.innerText = 'folder_open';
    } else {
        element.className = element.className.replace(' show', ' hide');
        icon.innerText = 'folder';
    }
}

function walkThroughFolders(item) {
    const ul = document.createElement('ul');
    ul.id = item.title;
    ul.className = ' hide';
    item.children.forEach(function(innerItemEl) {
        if (innerItemEl.folder && innerItemEl.children) {
            const li = generateLiWithContent(innerItemEl.title, 'folder');
            const liInnerItems = walkThroughFolders(innerItemEl);
            li.appendChild(liInnerItems);
            li.addEventListener('click', (e) => {
                e.stopPropagation();
                onSectionClick(innerItemEl.title);
            });
            li.addEventListener('mousedown', onMouseDown);
            li.addEventListener('mouseup', onMouseUp);
            ul.appendChild(li);
        } else if (innerItemEl.folder && !innerItemEl.children && innerItemEl.children !== 'undefined') {
            const li = generateLiWithContent(innerItemEl.title, 'folder');
            const innerUl = document.createElement('ul');
            const innerLi = document.createElement('li');
            innerUl.className = ' hide';
            innerUl.id = innerItemEl.title;
            innerLi.className = 'select';
            innerLi.appendChild(document.createTextNode('Folder is empty'));
            innerLi.style.fontStyle = 'italic';
            innerUl.appendChild(innerLi);
            li.addEventListener('click', (e) => {
                e.stopPropagation();
                onSectionClick(innerItemEl.title);
            });
            li.addEventListener('mousedown', onMouseDown);
            li.addEventListener('mouseup', onMouseUp);
            li.appendChild(innerUl);
            ul.appendChild(li);
        } else {
            const li = generateLiWithContent(innerItemEl.title, 'insert_drive_file');
            li.className = 'liFile';
            ul.appendChild(li);
        }
    })
    return ul;
}

function createTree() {
    const testUl = document.createElement('ul');
    structure.forEach(function(el) {
        const li = generateLiWithContent(el.title, 'folder');
        li.addEventListener('click', (e) => {
            e.stopPropagation();
            onSectionClick(el.title);
        });
        li.addEventListener('mousedown', onMouseDown);
        li.addEventListener('mouseup', onMouseUp);
        const liInnerItems = walkThroughFolders(el);
        li.appendChild(liInnerItems);
        testUl.appendChild(li);
    });
    rootNode.appendChild(testUl);
}

createTree();