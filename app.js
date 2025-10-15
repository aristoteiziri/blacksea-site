const menu = document.querySelector('#mobile-menu');
const menuLinks = document.querySelector('.navbar__menu');
const navLogo = document.querySelector('#navbar__logo');

// Display Mobile Menu
const mobileMenu = () => {
  menu.classList.toggle('is-active');
  menuLinks.classList.toggle('active');
};

menu.addEventListener('click', mobileMenu);

// Show active menu when scrolling
const highlightMenu = () => {
  const elem = document.querySelector('.highlight');
  const homeMenu = document.querySelector('#home-page');
  const aboutMenu = document.querySelector('#about-page');
  const servicesMenu = document.querySelector('#services-page');
  let scrollPos = window.scrollY;
  // console.log(scrollPos);

  // adds 'highlight' class to my menu items
  if (window.innerWidth > 960 && scrollPos < 600) {
    homeMenu.classList.add('highlight');
    aboutMenu.classList.remove('highlight');
    return;
  } else if (window.innerWidth > 960 && scrollPos < 1400) {
    aboutMenu.classList.add('highlight');
    homeMenu.classList.remove('highlight');
    servicesMenu.classList.remove('highlight');
    return;
  } else if (window.innerWidth > 960 && scrollPos < 2345) {
    servicesMenu.classList.add('highlight');
    aboutMenu.classList.remove('highlight');
    return;
  }

  if ((elem && window.innerWIdth < 960 && scrollPos < 600) || elem) {
    elem.classList.remove('highlight');
  }
};

window.addEventListener('scroll', highlightMenu);
window.addEventListener('click', highlightMenu);

//  Close mobile Menu when clicking on a menu item
const hideMobileMenu = () => {
  const menuBars = document.querySelector('.is-active');
  if (window.innerWidth <= 768 && menuBars) {
    menu.classList.toggle('is-active');
    menuLinks.classList.remove('active');
  }
};

menuLinks.addEventListener('click', hideMobileMenu);
navLogo.addEventListener('click', hideMobileMenu);

function sendMail() {
  const fullname = document.getElementById('name');
  const company = document.getElementById('company');
  const emailAddress = document.getElementById('email');
  const emailSubject = document.getElementById('subject');
  const emailContent = document.getElementById('message');
  const label = document.getElementById('info');

  //http://localhost:8340/api/v1/notification/sendmail
  fetch("https://dev.smartcustoms.app/api/v1/notification/sendmail", {
    method: "POST",
    body: JSON.stringify({
      "subject": emailSubject.value,
      "content": emailContent.value,
      "reference1": "Fullname : "+fullname.value,
      "reference2": "Company  : "+company.value,
      "reference3": "Email    : "+emailAddress.value,
      "to": [
          "contact@blackseatechnology.com"
      ]
    }),
    headers: {
      "Accept": "application/json",
      "Content-type": "application/json; charset=UTF-8",
      "GatewayKey": "a983a03e-cfdi-7536-mmod-b2aea3dc7ac1"
    }
  })
    .then((response) => {
      if (!response.ok) {
        label.innerText='Error : Mail not sent. Please retry later';
        console.log(label.value);      
        throw new Error('Network response was not ok');
      }   
    label.innerText='Mail successfully sent';
    console.log(label.value)})    
    fullname.value='';
    company.value='';
    emailAddress.value='';
    emailSubject.value='';
    emailContent.value='';
    fullname.focus();
}