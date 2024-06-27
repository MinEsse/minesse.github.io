
// cattura elementi 

let myNavbar = document.querySelector("#myNavbar"); 

let links = document.querySelectorAll(".nav-link"); 

let logo = document.querySelector(".img-logo");




// AddEvent NavBar

window.addEventListener("scroll", ()=>{
    let scrolled = window.scrollY; 
    if (scrolled > 0) {
       changeNavbar('nav-blur', 'logobianco', "var(--white)", "2px solid var(--gold)", "transparent");
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

fetch("./annunci.json").then((response)=>response.json()).then((data)=>{

    //cattura elementi HTML
    
    let categoryWrapper = document.querySelector('#categoryWrapper'); 
    
    // funzione crea filtro categoria
    
    function setCategory() {
        
        let category = data.map((annuncio)=> annuncio.category); 
        
        let uniqueCategory = []; 
        
        
        category.forEach((category)=> {
            if (!uniqueCategory.includes(category)) {
                uniqueCategory.push(category);
            } 
        });
        
        
        uniqueCategory.forEach((category)=>{
            let div = document.createElement('div'); 
            div.classList.add('forms-check'); 
            div.innerHTML = `
            <input class="form-check-input" type="radio" name="category" id="${category}">
            <label class="form-check-label" for="${category}">
            ${category}
            </label>
            `
            categoryWrapper.appendChild(div);
        })
    }
    
    setCategory();
    
    let cardWrapper= document.querySelector('#cardWrapper');
    
    //funzione crea cards
    
    function showCards(array) {
        
        array.sort((a, b)=> b.price - a.price); // prezzo dal più piccolo al più grande

        cardWrapper.innerHTML =''; // svuota sempre innerHTML
        
        array.forEach((annuncio)=> {
            let div = document.createElement('div'); 
            div.classList.add('card', 'mb-4'); 
            div.style.width= "16rem"; 
            div.innerHTML = `
            <img src="${annuncio.image}" class="card-img-top" alt="...">
            <div class="card-body">
            <h5 class="card-title">${annuncio.name}</h5>
            <p class="card-text">${annuncio.category}</p>
            <p>${annuncio.price}</p>
            </div>
            
            `
            
            cardWrapper.appendChild(div)
        }); 
    }
    
    showCards(data);
    
    let radios = document.querySelectorAll('.form-check-input'); // crea una nodelist
    
    function filterByCategory() {
        
        let checked = Array.from(radios).find((button)=> button.checked);
        let categoria = checked.id;

        if (categoria != "all"){
            let filtered = data.filter((annuncio)=> annuncio.category == categoria);
        showCards(filtered);

        } else{
            showCards(data);
        }

        
    }
    
    filterByCategory(radios);
    
    radios.forEach((button)=>{
        button.addEventListener("click", ()=>{
            filterByCategory();
        })
    })
    


    // ACCORDION filtro PREZZO - 

    let inputPrice = document.querySelector("#inputPrice");
    //usiamo array.sort all'interno della funzione per catturare elemento con prezzo più alto
    let priceNumbers = document.querySelector("#priceNumbers"); 

    function setPriceInput() {
        let maxPrice = data[0].price

        inputPrice.max= maxPrice;

        inputPrice.value = maxPrice; 

        priceNumbers.innerHTML= maxPrice;
        
    }

    setPriceInput();

    inputPrice.addEventListener("input", ()=>{

        priceNumbers.innerHTML = inputPrice.value;
        filterByPrice(); 
    });


    function filterByPrice() {
        let filtered = data.filter((annuncio)=> +annuncio.price <= +inputPrice.value ); 
        showCards(filtered); // showCards agisce sulla variabile filter
        // + serve per trasformare il dato in dato numerico
    }

    // Filtro per parola

    let inputWord = document.querySelector("#inputWord");

    inputWord.addEventListener("input", ()=>{
        //console.log(inputWord.value);
        filterByWord();
    }); 

    function filterByWord() {
        let filtered = data.filter((annuncio)=> annuncio.name.toLowerCase().includes(inputWord.value.toLowerCase())); 
        showCards(filtered)
    }

   






});

// DARK MODE 

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
