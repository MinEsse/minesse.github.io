
// cattura elementi 

let myNavbar = document.querySelector("#myNavbar"); 

let links = document.querySelectorAll(".nav-link"); 

let logo = document.querySelector(".img-logo");




// AddEvent NavBar

window.addEventListener("scroll", ()=>{
    let scrolled = window.scrollY; 
    if (scrolled > 0) {
       changeNavbar('nav-blur', 'logobianco', "var(--light)", "2px solid var(--gold)", "transparent");
    } else {
        myNavbar.classList.remove('nav-blur'); 
        
        changeNavbar('nav-custom', 'logonero', "var(--dark)", "transparent", "transparent");
    }
}); 

// Funzione generica NavBar

function changeNavbar(background, imgLogo, color1, color2, color3 ){
    myNavbar.classList.add(background); 
    logo.src = `http://127.0.0.1:5500/MEDIA/${imgLogo}.png`;

    links.forEach((link)=>{
        link.style.color = color1; 
        link.addEventListener("mouseenter", ()=>{
           link.style.borderBottom = color2; 

           link.addEventListener("mouseleave", ()=>{
                link.style.borderBottom = color3;
           })
        })
    })

}; 

/* Set Interval Contatore */

let firstNumber = document.querySelector('#firstNumber');
let secondNumber = document.querySelector('#secondNumber'); 
let thirdNumber = document.querySelector('#thirdNumber');


/* let interval = setInterval(() => {
    if (count < 100) {
    count++;
    firstNumber.innerHTML = count;
    } else {
        clearInterval(interval);
    }
}, 100); */

function createInterval(number, element, timing) {
    let count = 0;

    let interval = setInterval(() => {
        if (count < number) {
        count++;
        element.innerHTML = count;
        } else {
            clearInterval(interval);
        }
    }, timing);
 
}

createInterval( 200, firstNumber, 10); 
createInterval(2340, secondNumber, 1); 
createInterval(50, thirdNumber, 50);


//intersecazione

let confirm = false;

let observer = new IntersectionObserver((entries) =>{
    entries.forEach((entry) =>{
        if (entry.isIntersecting && confirm == false) {
            createInterval( 200, firstNumber, 10); 
            createInterval(2340, secondNumber, 1); 
            createInterval(50, thirdNumber, 50);
            confirm = true;
        } 
    })
    });

    observer.observe(firstNumber);

/* AOS */

AOS.init();


/* SWIPER JS */

const swiper = new Swiper('.swiper', {
    speed: 600,
    parallax: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  
  });
 


/* REVIEWS */

let reviews = [
    {name: 'Marco', title: 'Sito affidabile', description: 'Comprato diverse volte su questo sito, il prodotto arriva in ottime condizioni, nel giorno di consegna segnalato dal sito. Lo raccomando'},
    {name: 'Giuseppe', title: 'Problemi con la consegna', description: 'Un ottimo sito su cui fare acquisti, peccato per il ritardo della consegna, non so se sia dovuto alla tardiva spedizione o al corriere. Pacco arrivato comunque integro, prodotto perfetto.'}, 
    {name: 'Silvia', title: 'Prodotto eccellente', description: 'Non pensavo di trovarmi bene, invece devo ricredermi. Il pacco è arrivato nei tempi stabili e il prodotto è in condizioni perfette. Ho avuto un piccolo problema con la spedizione, ma il servizio clienti è stato celere nella risoluzione del problema.'}, 
    {name: 'Matteo', title: 'Pessima esperienza', description: 'Ho acquistato sul sito alcuni giorni fa, le indicazioni sui tempi di spedizione sono state rispettate, ma non mi è arrivato il prodotto che avevo ordinato'}, 
]; 

let swiperWrapper = document.querySelector('.swiper-wrapper'); 
let addReviews = document.querySelector('#addReviews'); 
let userName = document.querySelector('#userName'); 
let userTitle = document.querySelector('#userTitle'); 
let userDescription = document.querySelector('#userDescription'); 


function generateCards() {
    swiperWrapper.innerHTML ='';
    reviews.forEach((review)=>{
        let div = document.createElement('div'); 
        div.classList.add('swiper-slide'); 
        div.innerHTML = `
        <div class="title" data-swiper-parallax="-300">${review.name}</div>
        <div class="subtitle" data-swiper-parallax="-200">${review.title}</div>
        <div class="text" data-swiper-parallax="-100">
            <p>
                ${review.description}
            </p>
        </div>
        `
        swiperWrapper.appendChild(div);
    });
    

}

generateCards(); 

addReviews.addEventListener("click", ()=>{
    
    reviews.push({name: userName.value, title: userTitle.value, description: userDescription.value}); 
    
    
    generateCards(); 
    
    userName.value = ''; 
    userTitle.value = ''; 
    userDescription.value = ''; 
    swiper.update(); 
}); 


/* FETCH DEL FILE JSON */


/* fetch("./annunci.json").then( (response)=> response.json()).then( (data)=>{
    // l'oggetto dato dal clienti non va MAI modificato, occorre creare un clone
    // non serve il parametro perchè lo passa la fetch
    function setCategory(){
        let category = data.map((annuncio)=> annuncio.category); 

        let uniqueCategory = [];
        
        category.forEach((category)=>{
            if (!uniqueCategory.includes(category)){
                uniqueCategory.push(category);


            }

        })
    } 




});  */


//Dark mode

let btnDarkMode = document.querySelector("#btnDarkMode"); 

// servirà una variabile di appoggio per creare effetto interruttore

let isClicked = true; 

btnDarkMode.addEventListener("click", ()=>{
    if (isClicked) { //modalità dark mode
    
        document.documentElement.style.setProperty('--light', 'rgb(26, 26, 26)');
        document.documentElement.style.setProperty('--dark', 'rgb(250, 250, 250)');
         
        
        btnDarkMode.innerHTML = `
        <i class="fa-solid fa-sun" style="color: #FFFFFF;"></i>
        `;
        isClicked = false;
        localStorage.setItem( 'mode', 'dark'); 
    
        }else{ //light mode
    
        document.documentElement.style.setProperty('--light', 'rgb(250, 250, 250)');
        document.documentElement.style.setProperty('--dark', 'rgb(26, 26, 26)');
        
      
        btnDarkMode.innerHTML = `
        <i class="fa-solid fa-moon"></i>
        `;
        isClicked = true;
        localStorage.setItem( 'mode', 'light'); 
        } // dobbiamo leggere i dati utilizzando la proprietà local storage getItem()
    })
    
        let mode = localStorage.getItem('mode'); 
    
        if (mode === 'dark') {
        document.documentElement.style.setProperty('--light', 'rgb(26, 26, 26)');
        document.documentElement.style.setProperty('--dark', 'rgb(250, 250, 250)');
        
        btnDarkMode.innerHTML = `
        <i class="fa-solid fa-sun" style="color: #FFFFFF;"></i>
        `;
        isClicked = false;
        
        } else {
        document.documentElement.style.setProperty('--light', 'rgb(250, 250, 250)');
        document.documentElement.style.setProperty('--dark', 'rgb(26, 26, 26)'); 
        
        btnDarkMode.innerHTML = `
        <i class="fa-solid fa-moon"></i>
        `;
        isClicked = true;
        }






//documentElement = elemento radice avuto accesso all'elemento posso cambiare le proprietà stilistiche