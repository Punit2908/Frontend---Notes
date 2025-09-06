{/* <div class="note">
        <div class="head">
            <i class="fa-regular fa-floppy-disk"></i>
            <i class="fa-solid fa-trash"></i>
        </div>
        <textarea id="text-area" placeholder="Enter your Text here"></textarea>
</div> */}

const btn = document.querySelector('button');
const body = document.querySelector('.main');

const savenotes = ()=>{
    const data = [];
    const notes = document.querySelectorAll('.note textarea');
    console.log(notes);
    notes.forEach((note)=>{
        data.push(note.value);
    })
    if(data.length === 0){
        localStorage.removeItem('notes');
    }else{
        localStorage.setItem('notes',JSON.stringify(data));
    }
}

btn.addEventListener('click',()=>{
    addNote();
})

const addNote = (text = '')=>{
    const note = document.createElement('div');
    note.classList.add('note');
    note.innerHTML = `
        <div class="head">
            <i class="fa-regular fa-floppy-disk save"></i>
            <i class="fa-solid fa-trash trash"></i>
        </div>
        <textarea placeholder="Enter your Text here">${text}</textarea>
    `;

    note.querySelector('.trash').addEventListener('click',()=>{
        note.remove();
        savenotes();
    })
    note.querySelector('.save').addEventListener('click',()=>{
        savenotes();
    })
    note.querySelector('textarea').addEventListener('focusout',()=>{
        savenotes();
    })
    body.appendChild(note);
    savenotes();
}
(
    function() {
        const lsNotes = JSON.parse(localStorage.getItem("notes"));
        if (lsNotes === null) {
            addNote()
        } else {
            lsNotes.forEach(
                (lsNote) => {
                    addNote(lsNote)
                }
            )
        }

    }
)()