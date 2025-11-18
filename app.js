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

let workers = [];
let staff = {
    id : Date.now(),
    nom : "",
    role : "",
    image : "",
    email : "", 
    phone : "",
    experiences : [],
};
let experience = {
    title : "",
    company : "",
    startDate : "",
    endDate : "",
    description : ""
};
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
})

const expArray = document.getElementsByClassName('experience-item');
saveBtn.addEventListener('click', (e)=>{
    e.preventDefault();
    if(!validateForm()){
        return;
    }
    staff.nom = staffName.value;
    staff.role = staffRole.value;
    staff.image = profilImg.src;
    staff.email = staffEmail.value;
    staff.phone = staffPhone.value;
    for (let i = 0; i < expArray.length; i++) {
        const item  = expArray[i];
        experience.title = item.querySelector('[name="exp-title"]').value.trim();
        experience.company = item.querySelector('[name="exp-company"]').value.trim();
        experience.startDate = item.querySelector('[name="start-date"]').value.trim();
        experience.endDate = item.querySelector('[name="end-date"]').value.trim();
        experience.description = item.querySelector('[name="exp-description"]').value || "this experience has no description";
        staff.experiences.unshift(experience);
    }
    
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

