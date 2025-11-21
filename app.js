const list =  document.getElementById('unassigned-list');
const showList = document.getElementById('unassigned-toggle');
const addStaff = document.getElementById('add-staff');
const sort = document.getElementById("sort-staff");
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

let staffInRoomCounter = {
    cntconference : 0,
    cntpersonnel :0,
    cntreception : 0,
    cntarchive : 0,
    cntsecurite  : 0,
    cntserveures : 0
};

let workers = JSON.parse(localStorage.getItem('workers')) || [];
saveToLocalstorage();
function saveToLocalstorage(){
 localStorage.setItem('workers',JSON.stringify(workers));
}
updateRooms();
updateList(workers);
showList.addEventListener('click', ()=> {
    updateList(workers);
    if(list.classList.contains('hidden')){
        list.classList.remove('hidden');
        showList.classList.add('bg-black/20');
    }
    else{
        list.classList.add('hidden');
        showList.classList.remove('bg-black/20');
    }
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
            type="date"
            
            class="outline-none ring rounded-lg focus:ring-blue-600 focus:ring-1 p-2 duration-300"
        >
        <p class="error-message mb-5 text-sm text-red-500"></p>
        <label class="font-semibold">End date :</label>
        <input
            name="end-date"
            type="date"
            
            class="outline-none ring rounded-lg  focus:ring-blue-600 focus:ring-1 p-2 duration-300"
        >
        <p class="error-message mb-3 text-sm text-red-500"></p>
        <label class="font-semibold">Description :</label>
        <textarea
            name="exp-description"
            placeholder="What would you say about your last experience?"
            class="outline-none ring rounded-lg focus:ring-blue-600 focus:ring-1 w-full p-2 duration-300"
        ></textarea>
        <p name="empty-exp" class=" text-sm text-red-500"></p>
    `;

    experienceForms.appendChild(exp);
}

function closeIT(button){
    const parent = button.closest('.experience-item');
    parent.remove();
}

staffExp.addEventListener('click',(e)=>{
    e.preventDefault();
    newExp();
});

function staffList(s){
     return `
    <div 
        onclick="showThisStaff(${s.id})"
        class=" bg-gray-50 rounded-xl p-4 border-2 shown border-gray-200 hover:border-blue-400 cursor-pointer">
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
    list.innerHTML = '';
    for (let i = 0; i < update.length; i++) {
        if (update[i].currentStatus == "unassigned"){
            list.innerHTML += staffList(update[i]);
        }
    }
    let unassigned = 0;
    if (workers.length) {
        for (let i = 0; i < workers.length; i++) {
            if (workers[i].currentStatus == "unassigned") {
                unassigned ++;
            }
        }
        unassignedCount.textContent = unassigned;
    }
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
            <li><span class="font-semibold">${xp.title}</span>- ${xp.company}  (${xp.startDate} | ${xp.endDate})</li>
            <p class="pl-3 w-120">Description : ${xp.description}</p>
        `
    }
    if(!shownExp){shownExp = `<h1 class="text-2xl not-lg:text-xl text-gray-600">This staff have not experience yet!</h1>`}
    
    const info = document.createElement('div');
    info.className = ' inset-0 fixed bg-black/50 unassigned-card flex flex-row justify-center items-center'
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
                <div
                    class="flex justify-end">
                    <button onclick="fireThisStaff(${shown.id}); this.closest('.unassigned-card').remove()" class=" capitalize bg-red-500 px-3 py-1 mt-3 text-white font-semibold rounded hover:bg-red-600">Fired?</button>
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
function fireThisStaff(id){
    workers =  workers.filter(staff => staff.id !== id);
    saveToLocalstorage();
    roomLimitation();
    updateRooms();
    updateList(workers);
    showNotification('Fired succefully!');
}

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
    for (let i = 0; i < workers.length ; i++) {
        if (staff.email === workers[i].email || staff.phone === workers[i].phone) {
            alert('catch you haha !olreadi igzist!');
            if (staff.email === workers[i].email) {
                showError(errorClass[1], "This informations belong to an existing staff!");
                setTimeout(() => {
                    clearError(errorClass[1]);
                }, 10000);
            }
            else{
                showError(errorClass[2], "This informations belong to an existing staff!");
                setTimeout(() => {
                    clearError(errorClass[2]);
                }, 10000);
            }
            valid = false ;
        }
    }
    return valid;
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
        currentStatus : "",
        currentRoom: "",
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
    staff.currentStatus = "unassigned";
    staff.image = profilImg.src;
    staff.email = staffEmail.value;
    staff.phone = staffPhone.value;
    if(!checkDuplicate(staff)){
        return;}
    for (let i = 0; i < expArray.length; i++) {
        const item  = expArray[i];
        const startV =  item.querySelector('[name="start-date"]').value;
        const endV = item.querySelector('[name="end-date"]').value;
        const title = item.querySelector('[name="exp-title"]').value.trim();
        const company = item.querySelector('[name="exp-company"]').value.trim();

        if (!startV || !endV || !title || !company) {
            item.querySelector('.empty-exp').textContent = "Fill out this field before saving!" ;return;
        }
        if (endV < startV ) {
            const closest2 = item.querySelector('[name="start-date"]').nextElementSibling;
            showError(closest2, "invalid value, must be a logic start date ");
        
            const closest1 = item.querySelector('[name="end-date"]').nextElementSibling;
            showError(closest1, "invalid value, must be a logic end date");
            return;
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


const reception = document.getElementById('reception');
const conference = document.getElementById('salle-conference');
const serveurs = document.getElementById('salle-serveurs');
const securite = document.getElementById('salle-securite');
const personnel = document.getElementById('salle-personnel');
const archive = document.getElementById('salle-archive');


function ableToEnter(room){
    let listed = "";
    let valid = false;
    if(workers.length === 0){return};
    for (let i = 0; i < workers.length; i++) {
        const ableStaff = workers[i];
        if(!ableStaff.possibleRoom)continue;
        if (ableStaff.possibleRoom.includes(room) && ableStaff.currentStatus === "unassigned"){

            valid = true;
            listed += `
            <div class="flex items-center justify-center  space-x-5 space-y-5">
                <img src="${ableStaff.image}" 
                    class="w-20 h-20 border-4 border-blue-700 rounded-full flex items-center justify-center text-white font-bold text-lg">

                <div class="flex-1">
                    <h3 class="font-semibold text-gray-800">${ableStaff.nom}</h3>
                    <p class="text-sm text-gray-500">${ableStaff.role}</p>
                </div>

                <button 
                    onclick="assignStaff(${ableStaff.id},'${room}')"
                    class="px-3 py-2 bg-orange-500 text-white rounded-lg shadow hover:bg-amber-800 hover:scale-90 transition">
                    Assign
                </button>
            </div>`;
        }
    }
    if (valid) {
        const ableList = document.createElement('div');
        ableList.className = 'inset-0  fixed able-list bg-black/50 flex items-center justify-center'
        ableList.innerHTML = `
        <div class=" bg-gray-50 py-4 px-3 shown rounded-xl w-fit h-fit border-2 border-gray-200 hover:border-blue-400 cursor-pointer">
            ${listed}
        </div>`;
        document.body.appendChild(ableList);
    }
    else{
        if (unassignedCount.textContent == 0) {
            showNotification('Unfortunately! There is no staff to assign, add workers first');
        }
        else{
            showNotification('No unassigned staff able to enter this zone');
        }
    }
}
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = `fixed notification px-3 py-3 w-fit hide rounded-lg bg-red-500 font-semibold text-white z-50`;
    notification.innerHTML = message;
    document.body.appendChild(notification);
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

function staffinRoom(s){
    return  `
        <img src="${s.image}" id="staff-${s.id}" class="w-12 h-12 not-lg:w-10 not-lg:h-10 rounded-full animate-pulse cursor-pointer border-2 border-green-600" 
        onclick="showThisAssigned(${s.id})">
    `
};
function updateRooms() {
    ['conference', 'reception', 'serveurs', 'securite', 'personnel', 'archive'].forEach(room => {
        const roomElement = document.getElementById(`assigned-${room}`);
        if (roomElement) roomElement.innerHTML = '';
    });
    
    for (let i = 0; i < workers.length; i++) {
        if (workers[i].currentStatus === "assigned" && workers[i].currentRoom) {
            const room = workers[i].currentRoom;
            const roomElement = document.getElementById(`assigned-${room}`);
            if (roomElement) {
                roomElement.innerHTML += staffinRoom(workers[i]);
            }
        }
    }
}
function updateRoom(id, room) {
    const assignedRoom = document.getElementById(`assigned-${room}`);
    const worker = workers.find(w => w.id === id);
    const existing = document.getElementById(`staff-${id}`);
    
    if (worker && worker.currentRoom === room && worker.currentStatus === "assigned") {
        if (!existing) {
            assignedRoom.innerHTML += staffinRoom(worker);
        }
    } else if (existing) {
        existing.remove();
    }
    roomLimitation();
}
function assignStaff(id,room){
    switch (room) {
        case "personnel":
            if (staffInRoomCounter.cntpersonnel < 6) {
                for (let i = 0; i < workers.length; i++) {
                    if (workers[i].id === id){
                        workers[i].currentStatus = "assigned";
                        workers[i].currentRoom = room;
                        roomLimitation();
                    }
                }
            }else{showNotification("this room have reached its maximum size!");}
            break;
        case "archive":
            if (staffInRoomCounter.cntarchive < 3) {
                for (let i = 0; i < workers.length; i++) {
                    if (workers[i].id === id){
                        workers[i].currentStatus = "assigned";
                        workers[i].currentRoom = room;
                        roomLimitation();
                    }
                }
            }else{showNotification("this room have reached its maximum size!");}
            break;
        case "serveurs": 
            if (staffInRoomCounter.cntserveures < 6) {
                for (let i = 0; i < workers.length; i++) {
                    if (workers[i].id === id){
                        workers[i].currentStatus = "assigned";
                        workers[i].currentRoom = room;
                        roomLimitation();
                    }
                }
            }else{showNotification("this room have reached its maximum size!");}
            break;
        case "securite" :
            if (staffInRoomCounter.cntsecurite < 6) {
                for (let i = 0; i < workers.length; i++) {
                    if (workers[i].id === id){
                        workers[i].currentStatus = "assigned";
                        workers[i].currentRoom = room;
                        roomLimitation();
                    }
                }
            }else{showNotification("this room have reached its maximum size!");}
            break;
        case "conference":
            if (staffInRoomCounter.cntconference < 8) {
                for (let i = 0; i < workers.length; i++) {
                    if (workers[i].id === id){
                        workers[i].currentStatus = "assigned";
                        workers[i].currentRoom = room;
                        roomLimitation();
                    }
                }
            }else{showNotification("this room have reached its maximum size!");}
            break;
        case "reception":
            if (staffInRoomCounter.cntreception < 12) {
                for (let i = 0; i < workers.length; i++) {
                    if (workers[i].id === id){
                        workers[i].currentStatus = "assigned";
                        workers[i].currentRoom = room;
                        roomLimitation();
                    }
                }
            }else{showNotification("this room have reached its maximum size!");}
            break;
        default:
            break;
    }
    
    updateRoom(id,room);
    updateList(workers);
    saveToLocalstorage();
    document.getElementsByClassName('able-list')[0].remove();
};
function showThisAssigned(id){
    let staff = workers.find(staff => staff.id === id);
    let shownExp = "";
    for (let i = 0; i < staff.experiences.length; i++) {
        let xp = staff.experiences[i];
        shownExp += `
            <li><span class="font-semibold">${xp.title}</span>- ${xp.company}  (${xp.startDate} | ${xp.endDate})</li>
            <p class="pl-3 w-120">Description : ${xp.description}</p>`
    }
    if(!shownExp){shownExp = `<h1 class="text-lg text-gray-600">This staff have not experience yet!</h1>`}
    
    let staffCard = document.createElement('div');
    staffCard.className = 'inset-0 unassign-card fixed bg-black/50 flex flex-row justify-center items-center';
    staffCard.innerHTML =  `
        <div class="bg-gray-50 shown rounded-xl w-2/5 not-lg:w-4/6  h-fit  p-4 border-2 border-blue-400 cursor-pointer shadow-md transition duration-300 relative">
            <button 
                onclick="unassignStaff(${staff.id},'${staff.currentRoom}'),closest('.unassign-card').remove();" alt="unassign"
                class="absolute top-2 right-2 aspect-square px-3 capitalize bg-red-500 text-white font-semibold rounded hover:bg-red-600">
                <i class="fa-solid fa-xmark"></i>
            </button>

            <div class="flex items-center space-x-4">
                <img src="${staff.image}" 
                    alt="${staff.nom}" 
                    class="lg:w-24 lg:h-24 w-16 h-16 rounded-full border-2 border-blue-500 object-cover">
                <div class="flex flex-col">
                    <h3 class="text-lg font-semibold text-gray-600 capitalize">
                        full name : <span class="text-black font-semibold">${staff.nom}</span>
                    </h3>
                    <p class="text-sm text-gray-600 capitalize">
                        Current Role : <span class="text-black font-semibold">${staff.role}</span>
                    </p>
                    <p class="text-sm text-gray-600 capitalize">
                        Current Localisation: <span class="text-black font-semibold">${staff.currentRoom}</span>
                    </p>
                    <p class="text-sm text-gray-600 mt-1">
                        Email: <span class="text-black font-semibold">${staff.email}</span>
                    </p>
                    <p class="text-sm text-gray-600">
                        Phone: <span class="text-black font-semibold">${staff.phone}</span>
                    </p>
                </div>
            </div>

            <div class="mt-3">
                <h4 class="font-semibold text-gray-700">Experiences:</h4>
                <ul class="list-disc list-inside text-sm text-gray-600 mt-1">
                    ${shownExp}
                </ul>
            </div>
        </div>`;
    document.body.appendChild(staffCard);
    const card = staffCard.firstElementChild;
    staffCard.addEventListener('click', (e)=>{
        if (!card.contains(e.target)) {
            staffCard.remove();
        }
    });
}
function unassignStaff(id,room){
    let Uroom = room;
    for (let i = 0; i < workers.length; i++) {
        if (workers[i].id === id) {
            workers[i].currentRoom = "";
            workers[i].currentStatus = "unassigned";
            updateRoom(id,Uroom);
        }
    }
    updateList(workers);
    updateRooms();
    roomLimitation();
    saveToLocalstorage();
}
roomLimitation();
function roomLimitation(){
    let cntpersonnel = 0;
    let cntconference = 0;
    let cntreception = 0;
    let cntserveures = 0;
    let cntsecurite = 0;
    let cntarchive = 0;
    for (let i = 0; i < workers.length; i++) {
        const w = workers[i];
        if(w.currentRoom === "personnel"){cntpersonnel++;
        }
        if(w.currentRoom === "conference"){cntconference++;}
        if(w.currentRoom === "reception"){cntreception++;}
        if(w.currentRoom === "serveurs"){cntserveures++;}
        if(w.currentRoom === "securite"){cntsecurite++;}
        if(w.currentRoom === "archive"){cntarchive++;}
    }
    if(cntreception === 0){reception.classList.add('bg-red-500', 'animate-pulse')}
    else{reception.classList.remove('bg-red-500', 'animate-pulse');}
    if(cntserveures === 0){serveurs.classList.add('bg-red-500', 'animate-pulse')}
    else{serveurs.classList.remove('bg-red-500', 'animate-pulse')}
    if(cntsecurite === 0){securite.classList.add('bg-red-500', 'animate-pulse')}
    else{securite.classList.remove('bg-red-500', 'animate-pulse')}
    if(cntarchive === 0){archive.classList.add('bg-red-500', 'animate-pulse')}
    else{archive.classList.remove('bg-red-500', 'animate-pulse')}
    staffInRoomCounter.cntarchive = cntarchive;
    staffInRoomCounter.cntpersonnel = cntpersonnel;
    staffInRoomCounter.cntconference = cntconference;
    staffInRoomCounter.cntreception = cntreception;
    staffInRoomCounter.cntsecurite = cntsecurite;
    staffInRoomCounter.cntserveures = cntserveures;
}
document.addEventListener('click',(e)=>{
    if (reception.querySelector('button').contains(e.target)) {
        ableToEnter("reception");
    }
    if (conference.querySelector('button').contains(e.target)) {
        ableToEnter("conference");
    }
    if (serveurs.querySelector('button').contains(e.target)) {
        ableToEnter("serveurs");
    }
    if (securite.querySelector('button').contains(e.target)) {
        ableToEnter("securite");
    }
    if (personnel.querySelector('button').contains(e.target)) {
        ableToEnter("personnel");
    }
    if (archive.querySelector('button').contains(e.target)) {
        ableToEnter("archive");
    }
})
sort.addEventListener('change',()=>{
    saveToLocalstorage();
    updateRooms();
    updateList(workers);
    if(sort.value !=="default"){
        list.innerHTML = "";
        list.classList.remove('hidden');
        showList.classList.add('bg-black/20');
        let selectedRole = [];
        const empty = `<p class="flex flex-row items-center space-x-1.5 justify-center text-gray-600 "><i class="fa-solid text-xl fa-folder-open"></i> <strong class="text-sm "> No unassigned staff has this role yet !</strong></p>`
        for (let i = 0; i < workers.length; i++) {
            const staff = workers[i];
            if (staff.role === sort.value && staff.currentStatus !== "assigned") {
                selectedRole.push(staff);
            }
        }
        if(selectedRole.length == 0){list.innerHTML = empty ; return}
        for (let i = 0; i < selectedRole.length; i++) {
            const staff = selectedRole[i];
            list.innerHTML += staffList(staff);
        }
    }
    if(sort.value ==="default" ){
        list.innerHTML = "";
        for(let i = 0 ; i < workers.length ; i++){
            if (workers[i].currentStatus === "unassigned") {
                list.innerHTML += staffList(workers[i]);
            }
            
        }
    }
})
saveToLocalstorage();
updateList(workers);
window.closeIT = closeIT;