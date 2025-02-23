
const addBox = document.querySelector(".add-box"),
searchInput = document.querySelector(".search-icon input"),
searchIcon = document.querySelector(".search-icon span"),
popupBox = document.querySelector(".popup-box"),
popupTitle = popupBox.querySelector("header p") 
closeIcon = popupBox.querySelector("header i"),
titleTag = popupBox.querySelector("input"),
descTag = popupBox.querySelector("textarea"),
addBtn = popupBox.querySelector("button"); 

const months = ["January", "February", "March", "April", "May", "June", "July",
                "August", "September", "October", "November", "December"];

const notes = JSON.parse(localStorage.getItem("notes") || "[]");
let isUpdate = false, updateId;


searchIcon.addEventListener("click", () => {
    const searchTerm = searchInput.value.toLowerCase();
    const filteredNotes = searchNotes(notes, searchTerm);
    showNotes(filteredNotes);

});

searchInput.addEventListener("input", () => {
    const searchTerm = searchInput.value.toLowerCase();
    const filteredNotes = searchNotes(notes, searchTerm);
    showNotes(filteredNotes);
});

searchInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        const searchTerm = searchInput.value.toLowerCase();
        const filteredNotes = searchNotes(notes, searchTerm);
        showNotes(filteredNotes);
    }
});

addBox.addEventListener("click", () => {
    titleTag.focus();
    popupBox.classList.add("show");
});

closeIcon.addEventListener("click", () => {
    isUpdate = false;
    titleTag.value;
    descTag.value;
    addBtn.innerText = "Add Note";
    popupTitle.innerText = "Add a new Note";
    popupBox.classList.remove("show");
});


function searchNotes(notes, searchTerm) {
    return notes.filter(note => 
        note.title.toLowerCase().includes(searchTerm) || 
        note.description.toLowerCase().includes(searchTerm)
    );
}

function showNotes() {
    document.querySelectorAll(".note").forEach(note => note.remove());
    notes.forEach((note, index) => {
        let liTag = `<li class="note">
                    <div class="details">
                        <p>${note.title}</p>
                        <span>${note.description}</span>
                    </div>
                    <div class="bottom-content">
                        <span>${note.date}</span>
                        <div class="settings">
                            <i onclick="showMenu(this)" class="uil uil-ellipsis-h"></i>
                            <ul class="menu">
                                <li onclick="updateNote(${index}, '${note.title}', '${note.description}')"><i class="uil uil-pen"></i>Edit</li>
                                <li onclick="deleteNote(${index})"><i class="uil uil-trash"></i>Delete</li>
                            </ul>
                        </div>
                    </div>
                </li>`; 
        addBox.insertAdjacentHTML("afterend", liTag);
    });
}
showNotes();

function showMenu(elem) {
    elem.parentElement.classList.add("show");
    document.addEventListener("click", e => {
        if(e.target.tagName != "I" || e.target != elem) {
            elem.parentElement.classList.remove("show");
        }
    });
}

function deleteNote(noteId) {
// let confirmDel = confirm("sure?");
//     if(!confirm) return;
notes.splice(noteId, 1);
localStorage.setItem("notes", JSON.stringify(notes));
showNotes();
}


function updateNote(noteId, title, description) {
    isUpdate = true;
    updateId = noteId;
    addBox.click(); 
    titleTag.value = title;
    descTag.value = description;
    addBtn.innerText = "Update Note";
    popupTitle.innerText = "Update a Note";
}


addBtn.addEventListener("click", e => {
    e.preventDefault();
    let noteTitle = titleTag.value,
    noteDesc = descTag.value;
   

    if(noteTitle || noteDesc) {
        let dateObj = new Date(), 
        date = dateObj.getDate(),
        month = months[dateObj.getMonth()],
        day = dateObj.getDay(),
        year = dateObj.getFullYear();

        let noteInfo = {
            title: noteTitle, description: noteDesc,
            date: `${month} ${day}, ${year}`
        }
        if(!isUpdate) {
            notes.push(noteInfo);
        }  else {
            isUpdate = false;
            notes[updateId] = noteInfo;
        }
   
      localStorage.setItem("notes", JSON.stringify(notes));
      closeIcon.click();  
      showNotes();
    }
});