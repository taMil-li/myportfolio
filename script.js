
let Name = document.getElementById('name');
let email = document.getElementById('email');
let msg = document.getElementById('msg');
let nameErr = document.getElementById('nameErrMsg');
let emailErr = document.getElementById('emailErrMsg');
let msgErr = document.getElementById('msgErrMsg');
let contactForm = document.getElementById('contactForm');


let nameCheck = () => {
  nameErr.textContent = "";
  if (Name.value === "") {
    nameErr.textContent = "Required*";
    return true;
  }
};

let emailCheck = () => {
  emailErr.textContent = "";
  if (email.value == "") {
    emailErr.textContent = "Required*";
    return true;
  }
};

let msgCheck = () => {
  msgErr.textContent = "";
  if (msg.value === "") {
    msgErr.textContent = "Message should not be empty...";
    return true;
  }
};


let sections = document.querySelectorAll('[id^="section"]');

if (sections.length > 1) {
  let sectionOne = sections[0];
  sections.forEach((section) => {
    if (section != sectionOne) {
      $(section).css('cssText', 'display: none !important;');
    }
  });
}

const display = (sectionId) => {
  makeRemainingScreensInvisible(sectionId);
  let section = document.getElementById(sectionId);
  $(section).css('cssText', '');
  window.scrollTo(0, 0);
};

const makeRemainingScreensInvisible = (sectionId) => {
  let sections = document.querySelectorAll('[id^="section"]');
  sections.forEach((section) => {
    if ($(section).attr("id") != sectionId) {
      $(section).css('cssText', 'display: none !important;');
    }
  });
};

function send(event) {
  event.preventDefault();
  if(nameCheck()) return;
  if(emailCheck()) return;
  if(msgCheck()) return;

  const response = fetch("http://localhost:3000/send-email", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
       name: Name.value, 
       email: email.value, 
       message: msg.value
      })
  });

  const result= response.json();
  alert(result.message);
  reset();

}


//document.getElementById('clearBtn').addEventListener('click',clearForm);
Name.addEventListener("blur", nameCheck);
email.addEventListener('blur', emailCheck);
msg.addEventListener('blur', msgCheck);
contactForm.addEventListener('submit',sendMail);