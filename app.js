

const list =  document.getElementById('unassigned-list');
const showList = document.getElementById('unassigned-toggle');
const addStaff = document.getElementById('add-staff');
const search = document.getElementById("search-staff");
const unassignedCount = document.getElementById('number-unassigned');
const cancelBtn = document.getElementById("cancel");
const saveBtn = document.getElementById("save");
const staffExp = document.getElementById("staff-experience");
const imgUrl = document.getElementById("image-url");
const profilImg = document.getElementById("staff-image");
const staffRole = document.getElementById("role");
const staffPhone = document.getElementById("phone");
const staffEmail = document.getElementById("email");
const staffName = document.getElementById("name");
const modal = document.getElementById("new-staff");
const errorClass = document.querySelectorAll('.error-message');

let workers = JSON.parse(localStorage.getItem('workers')) || [];
saveToLocalstorage();
function saveToLocalstorage(){
 localStorage.setItem('workers',JSON.stringify(workers));
}
showList.addEventListener('click', ()=> {
    list.classList.toggle('hidden');
});

const phoneRegex = /^(05|06|07)[0-9]{8}$/;
const nameRegex = /^[A-Za-z\s]{2,30}$/;
const emailRegex = /^[^\s.@]+@[^\s.@]+\.[^\s.@]+$/;
const startDateRegex = /^(199[0-9]|200[0-9]|201[0-9]|202[0-5])$/;
const endDateRegex = /^((199[0-9]|200[0-9]|201[0-9]|202[0-5])|(present))$/;

function validateDuration(){
    let valid = true;
    if (!startDateRegex.test(document.getElementsByName('start-date').value)) {
        showError(errorClass[3], "Invalid date, expected a year!");
        valid = false;
    }
    else{
        clearError(errorClass[3]);
    }
    if (!endDateRegex.test(document.getElementsByName('end-date'))) {
        showError(errorClass[4], "Invalid date, expected a year|present");
        valid = false;
    }
    else{
        clearError(errorClass[4]);
    }
    return valid;
}

function showError(clss, message){
    clss.textContent = message;
}
function clearError(clss){
    clss.textContent = "";
}

function validateForm() {
    let valid = true;

    if (!nameRegex.test(staffName.value)) {
        showError(errorClass[0], "Invalid name!");
        valid = false;

    } else {
        clearError(errorClass[0]);
    }

    if (!emailRegex.test(staffEmail.value)) {
        showError(errorClass[1], "Invalid email!");
        valid = false;

    } else {
        clearError(errorClass[1]);
    }

    if (!phoneRegex.test(staffPhone.value)) {
        showError(errorClass[2], "Invalid phone!");
        valid = false;

    } else {
        clearError(errorClass[2]);
    }
    return valid;
}

const experienceForms = document.getElementById('experiences');

function newExp() {
    const exp = document.createElement('div');
    exp.className = 'experience-item flex  flex-col gap-2 p-3 mt-3 rounded-xl border border-gray-300 bg-gray-50';
    exp.innerHTML = `
        <div class="flex flex-row-reverse">
            <button
                onclick="closeIT(this)"
                type="button"
                class="text-2xl pr-3"
            >
                <i class="fa-solid fa-xmark rotating"></i>
            </button>
        </div>

        <label class="font-semibold">*Job Title :</label>
        <input
            name="exp-title"
            type="text"
            placeholder="Ex: Developer Full-stack"
            class="outline-none ring rounded-lg focus:ring-blue-600 focus:ring-1 w-full p-2 duration-300"
        >

        <label class="font-semibold">*Company :</label>
        <input
            name="exp-company"
            type="text"
            placeholder="YouCode"
            class="outline-none ring rounded-lg focus:ring-blue-600 focus:ring-1 w-full p-2 duration-300"
        >
        
        <label class="font-semibold">*Start date :</label>
        <input
            name="start-date"
            type="text"
            placeholder="Ex: 2025"
            class="outline-none ring rounded-lg focus:ring-blue-600 focus:ring-1 p-2 duration-300"
        >
        <p class="error-message mb-5 text-sm text-red-500"></p>
        <label class="font-semibold">End date :</label>
        <input
            name="end-date"
            type="text"
            placeholder="Ex: 2025-present"
            class="outline-none ring rounded-lg  focus:ring-blue-600 focus:ring-1 p-2 duration-300"
        >
        <p class="error-message mb-3 text-sm text-red-500"></p>
        <label class="font-semibold">Description :</label>
        <textarea
            name="exp-description"
            placeholder="What would you say about your last experience?"
            class="outline-none ring rounded-lg focus:ring-blue-600 focus:ring-1 w-full p-2 duration-300"
        ></textarea>
    `;

    experienceForms.appendChild(exp);
}

function closeIT(button){
    const parent = button.closest('.experience-item');
    parent.remove();
    console.log("close works!");
    
}

staffExp.addEventListener('click',(e)=>{
    e.preventDefault();
    newExp();
});

function staffList(s){
     return `
    <div 
        onclick="showThisStaff(${s.id})"
        class=" bg-gray-50 rounded-xl p-4 border-2 border-gray-200 hover:border-blue-400 cursor-pointer">
        <div class="flex items-center space-x-3">
            <img src="${s.image}" class="w-12 h-12 bg-linear-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
            <div class="flex-1">
                <h3 class="font-semibold text-gray-800">${s.nom}</h3>
                <p class="text-sm text-gray-500">${s.role}</p>
            </div>
        </div>
    </div>`;
};
function updateList(update){
    list.innerHTML = update.map(staffList).join("");
    unassignedCount.textContent = workers.length;
}
function sortExperiences(exp){
    for (let i = 0; i < exp.length -1; i++) {
        for (let j = 0; j < exp.length - i -1; j++) {
            if (exp[j].startDate < exp[j + 1].startDate) {
                let temp = exp[j];
                exp[j] = exp[j + 1];
                exp[j + 1] = temp;
            }
        }
    }
    return exp;
}

function showThisStaff(id){
    
    const shown = workers.find(staff => staff.id === id);
    let shownExp = "";
    for (let i = 0; i < shown.experiences.length; i++) {
        let xp = shown.experiences[i];
        shownExp += `
            <li><span class="font-semibold">${xp.title}</span>- ${xp.company}  (${xp.startDate}-${xp.endDate})</li>
        `
    }
    const info = document.createElement('div');
    info.className = ' inset-0 fixed bg-black/50 flex flex-row justify-center items-center'
    info.innerHTML = `
    <div class="bg-gray-50 shown rounded-xl w-fit h-fit p-4 border-2 border-blue-400 cursor-pointer shadow-md transition duration-300">
                <div class="flex items-center space-x-4">
                    <img src="${shown.image}" 
                        alt="${shown.nom}" 
                        class="lg:w-24 lg:h-24 w-16 h-16 rounded-full border-2 border-blue-500 object-cover">
                    <div class="flex flex-col">
                        <h3 class="text-lg font-semibold text-gray-600 capitalize">full name : <span class="text-black font-semibold">${shown.nom}</span></h3>
                        <p class="text-sm text-gray-600 capitalize">Current Role : <span class="text-black font-semibold">${shown.role}</span></p>
                        <p class="text-sm text-gray-600 mt-1">Email: <span class="text-black font-semibold">${shown.email}</span></p>
                        <p class="text-sm text-gray-600">Phone: <span class="text-black font-semibold">${shown.phone}</span></p>
                    </div>
                </div>
                <div class="mt-3">
                    <h4 class="font-semibold text-gray-700">Experiences:</h4>
                    <ul class="list-disc list-inside text-sm text-gray-600 mt-1">
                        ${shownExp}
                    </ul>
                </div>
            </div>`
    document.body.appendChild(info);
    const card = info.firstElementChild;
    info.addEventListener('click', (e)=>{
        if (!card.contains(e.target)) {
            info.remove();
        }
    });
};

function clearForm(){
    staffName.value = "";
    staffPhone.value = "";
    staffEmail.value = "";
    profilImg.src = "https://i.pinimg.com/1200x/6e/59/95/6e599501252c23bcf02658617b29c894.jpg";
    for (let i = 0; i < expArray.length; i++) {
        const item = expArray[i];
        item.querySelector('[name="exp-title"]').value = "";
        item.querySelector('[name="exp-company"]').value = "";
        item.querySelector('[name="start-date"]').value = "";
        item.querySelector('[name="end-date"]').value = "";
    }
};

function checkDuplicate(staff){
    let valid = true ;
    console.log(workers);
    for (let i = 0; i < workers.length ; i++) {
        if (staff.email === workers[i].email || staff.phone === workers[i].phone) {
            alert('catch you haha !olreadi igzist!');
            if (staff.email === workers[i].email) {
                showError(errorClass[1], "This informations belong to an existing staff!");
                setTimeout(() => {
                    clearError(errorClass[1]);
                }, 10000);
                console.log('Check Duplicate works! :' + workers[i].email);
            }
            else{
                showError(errorClass[2], "This informations belong to an existing staff!");
                setTimeout(() => {
                    clearError(errorClass[2]);
                }, 10000);
                console.log('Check Duplicate works! :' + workers[i].phone);
            }
            valid = false ;
        }
    }
    return valid;
};
 
function saveStaff(staff){
    let i = workers.length;
    workers[i].push(staff);
    console.log('saved?');

};

function allowedRooms(role, allowed){
    let rooms = {
        conference : "conference",
        reception : "reception",
        serveurs : "serveurs",
        securite :"securite",
        personnel : "personnel",
        archive : "archive",
    };
    if (role === "Réceptionniste") {
        allowed.push(rooms.reception);
    }
    if (role === "Technicien IT") {
        allowed.push(rooms.serveurs);
    }
    if (role === "Agent de sécurite") {
        allowed.push(rooms.securite);
    }
    if (role === "Manager") {
        allowed.push(rooms.reception);
        allowed.push(rooms.serveurs);
        allowed.push(rooms.securite);
        allowed.push(rooms.archive);
        allowed.push(rooms.personnel);
        allowed.push(rooms.conference);
    }
    if (role === "Nettoyage") {
        allowed.push(rooms.reception);
        allowed.push(rooms.serveurs);
        allowed.push(rooms.securite);
        allowed.push(rooms.conference);
        allowed.push(rooms.personnel);
    }
    if (role === "Autres roles") {
        allowed.push(rooms.conference);
        allowed.push(rooms.personnel);
        allowed.push(rooms.archive);
    }
    return allowed;
}

const expArray = document.getElementsByClassName('experience-item');
saveBtn.addEventListener('click', (e)=>{
    let staff = {
        id : Date.now(),
        nom : "",
        role : "",
        image : "",
        email : "",
        possibleRoom : [], 
        phone : "",
        experiences : [],
    };
    
    e.preventDefault();
    if(!validateForm()){
        return;
    }
    staff.nom = staffName.value;
    staff.role = staffRole.value;
    allowedRooms(staff.role ,staff.possibleRoom);
    console.log(staff.possibleRoom);
    
    staff.image = profilImg.src;
    staff.email = staffEmail.value;
    staff.phone = staffPhone.value;
    if(!checkDuplicate(staff)){
        return;}
    for (let i = 0; i < expArray.length; i++) {
        const item  = expArray[i];
        const startV =  item.querySelector('[name="start-date"]').value.trim();
        const endV = item.querySelector('[name="end-date"]').value.trim();

        if (!startDateRegex.test(startV) || !endDateRegex.test(endV) ) {
            if (!startDateRegex.test(startV)) {
                const closestError = item.querySelector('[name="start-date"]').nextElementSibling;
                showError(closestError, "invalid value, must be a logic year(1990-2025)");
                return;
            }
            if(!endDateRegex.test(endV)){
                const closestError = item.querySelector('[name="end-date"]').nextElementSibling;
                showError(closestError, "invalid value, must be a logic year(1990-2025)");
                return;
            }
        }
        staff.experiences.unshift({
            title: item.querySelector('[name="exp-title"]').value.trim(),
            company: item.querySelector('[name="exp-company"]').value.trim(),
            startDate: startV,
            endDate: endV,
            description: item.querySelector('[name="exp-description"]').value.trim() || "this experience has no description"
        });
        clearError(errorClass);
    }

    console.log(workers.length);
    workers.push(staff);
    saveToLocalstorage();
    updateList(workers);
    
    modal.classList.add('hidden');
    clearForm();
});
imgUrl.addEventListener('input',()=>{
    if (imgUrl.value) {
        profilImg.src = imgUrl.value;
    }
    else {
        profilImg.src = 'https://i.pinimg.com/1200x/6e/59/95/6e599501252c23bcf02658617b29c894.jpg'
    }
});
addStaff.addEventListener('click', ()=> {
    modal.classList.remove('hidden');
});
cancelBtn.addEventListener('click',()=>{
    modal.classList.add('hidden');
});

for (let i = 0; i < workers.length; i++) {
    workers[i].experiences = sortExperiences(workers[i].experiences);
}
console.log('sorted');

for (let i = 0; i < workers.length; i++) {
    console.log(workers[i].experiences);
}
console.log('loged');


const reception = document.getElementById('reception');
const conference = document.getElementById('salle-conference');
const serveurs = document.getElementById('salle-serveurs');
const securite = document.getElementById('salle-securite');
const personnel = document.getElementById('salle-personnel');
const archive = document.getElementById('salle-archive');

function ableToEnter(room){
    let listed = "";
    for (let i = 0; i < workers.length; i++) {
        const element = array[i];
        
    }
}

document.addEventListener('click',(e)=>{
    if (reception.querySelector('button').contains(e.target)) {
        
    }
    if (conference.querySelector('button').contains(e.target)) {}
    if (serveurs.querySelector('button').contains(e.target)) {}
    if (securite.querySelector('button').contains(e.target)) {}
    if (personnel.querySelector('button').contains(e.target)) {}
    if (archive.querySelector('button').contains(e.target)) {}
})

updateList(workers);
window.closeIT = closeIT;