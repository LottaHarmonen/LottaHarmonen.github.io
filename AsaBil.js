
//how an item looks like
class Item {
  constructor(name, description, price, imageUrl) {
    this.name = name;
    this.price = price;
    this.description = description;
    this.imageUrl = imageUrl;
  }
}

class CartItem {
  constructor(name, price, imageUrl, quantity) {
    this.name = name;
    this.price = price;
    this.imageUrl = imageUrl;
    this.quantity = quantity;
  }
}
let quantity = 0;

const itemsArray = [
    { name: "Motorolja Mobil 1 Esp 5w-30, Universal", description: "Mobil 1 ESP 5W-30 tillverkas med en äganderättsskyddad blandning av avancerade komponenter som framställts för att vara helt kompatibla med de senaste dieselpartikelfiltren (DPF) och katalysatorerna för bensinmotorer (CAT). Mobil 1 ESP 5W-30 har utvecklats för att leverera enastående prestanda och skydd och samtidigt ge avancerade bränsle-ekonomifördelar.", price: 549.90, imageUrl: "../Images/4449-154290_0.avif" },
    { name: "Mineralolja SAE 50 till veteranfordon, 5 liter", description: "För klassiska motorcyklar och vissa veteranfordon där en rak olja skall användas. Oljan är tjockflytande när den är kall – varmkör försiktigt. Tål mycket höga temperaturer. Lämplig för motorer med en separat oljetank som är placerad högre än vevhuset (motorcyklar), då oljan tack vare sin tjocka viskositet inte så lätt rinner igenom oljepumpen ner i vevhuset när motorn inte är igång. Ej lämplig vid mycket låga temperaturer ( -10 °C och kallare). Möter följande specifikationer: ACEA A2/B2, API SJ.", price: 269.90, imageUrl: "../Images/36-9023_xxl_1.avif" },
    { name: "Transmissionsolja SAE 80W-90, 1 liter", description: "Transmissionsolja av hypoidtyp avsedd för växellådor, slutväxlar, bakaxlar m.m. Rekommenderas till fordonstransmissioner där olja med kvalitetsnivå API GL-5 föreskrivs.", price: 89.90, imageUrl: "../Images/36-978_xl_1.avif" },
];

let cartArray = [];

const itemsList = document.querySelector("#items");
const cartItemsList = document.querySelector("#cartItems");
const cartItemsFooter = document.querySelector("#cartItemsFooter");
displayItems();
getWeather();

function displayItems() {

        const cartLi = document.createElement("li");
        const GoToCheckOutBtn = document.createElement("button");
        GoToCheckOutBtn.innerText = "Gå till kassan";
        GoToCheckOutBtn.onclick = () => {
          cartArray = [];
          showCartItems();
        };

        cartItemsFooter.appendChild(GoToCheckOutBtn);
        cartItemsList.appendChild(cartLi);
        
            if (cartArray.length === 0) {
                const emptyCart = document.createElement("p");
                emptyCart.innerText = "Varukorgen är tom";
                cartLi.appendChild(emptyCart);
              }

for (const item of itemsArray) {

        const card = document.createElement("div");
        const cardImg = document.createElement("img");
        const cardBody = document.createElement("div");
        const cardFooter = document.createElement("div");
        const cardTitle = document.createElement("h5");
        const cardDescription = document.createElement("p");
        const cardPrice = document.createElement("p");
        const AddToCartBtn = document.createElement("button");
        const ReadMoreBtn = document.createElement("button");

        applyStyles(card, cardImg, cardBody, cardFooter, cardTitle, cardDescription, cardPrice, item, AddToCartBtn, ReadMoreBtn);

        //Lägg till en vara i varukorgen efter knapptryck  
        AddToCartBtn.innerText = "Lägg till i varukorgen";
        AddToCartBtn.onclick = () => {
          AddToCartButtonClick(item, cartLi);
        };

//läs mer 
ReadMoreBtn.innerText = "Läs mer";
ReadMoreBtn.addEventListener('click', function() {

  const modalTitle = document.querySelector("#exampleModalLabel")
  const moreInfo = document.querySelector("#moreInfo");

  modalTitle.innerText = item.name;
  moreInfo.innerHTML = item.description;
  $('#exampleModal').modal('show'); 

});

        cardBody.appendChild(cardTitle);
        cardBody.appendChild(cardDescription);
        cardBody.appendChild(cardPrice);
        cardFooter.appendChild(AddToCartBtn);
        cardFooter.appendChild(ReadMoreBtn);
        card.appendChild(cardImg);
        card.appendChild(cardBody);
        card.appendChild(cardFooter);
        itemsList.appendChild(card);

    }

};

function AddToCartButtonClick(
  item
  ) {

 const existingItem = cartArray.find(itemm => itemm.name === item.name);
    if (existingItem) {
      
        existingItem.quantity++;


    } else {
        cartArray.push(new CartItem(item.name, item.price, item.imageUrl,  1));
    }

    
showCartItems();
}

function showCartItems() {

cartItemsList.innerHTML = "";


    for (const cartItem of cartArray) {

              const cartLi = document.createElement("li");
              const itemRow = document.createElement("div"); 
              const detailsRow = document.createElement("div");
              const itemPrice = document.createElement("p");
              const itemName = document.createElement("p");
              const quantity = document.createElement("p");
              const removeBtn = document.createElement("button");
              removeBtn.onclick = () => {
                        removeButtonClick(cartItem);
              };

              const trashIcon = document.createElement("i");


  itemRow.classList.add("row");
  detailsRow.classList.add("row");

  itemRow.appendChild(itemName);
  detailsRow.appendChild(itemPrice);
  detailsRow.appendChild(quantity);
  detailsRow.appendChild(removeBtn);
  removeBtn.appendChild(trashIcon);

  cartLi.appendChild(itemRow);
  cartLi.appendChild(detailsRow);
  cartItemsList.appendChild(cartLi);
 

  itemName.innerText = cartItem.name;
  itemPrice.innerText = cartItem.price;
  quantity.innerText = cartItem.quantity;

      applyStylesCartItems(cartLi, itemPrice, itemName, quantity, removeBtn, trashIcon);
  
    }
}

function removeButtonClick(cartItem) {
  const index = cartArray.indexOf(cartItem);
  
  if (index !== -1) {
    cartItem.quantity--; 

  if (cartItem.quantity <= 0) {
      cartArray.splice(index, 1);
    }

  showCartItems();
  }
}

function applyStylesCartItems(cartLi, itemPrice, itemName, quantity, removeBtn, trashIcon) {
  cartLi.classList.add("list-item", "list-item-horizontal");
  itemName.classList.add("bold-title");
  itemPrice.classList.add("col");
  quantity.classList.add("col");
  removeBtn.classList.add("col", "remove-btn");
  trashIcon.classList.add("fas", "fa-trash-alt");

}
 

function applyStyles(
  card, 
  cardImg, 
  cardBody, 
  cardFooter, 
  cardTitle, 
  cardDescription, 
  cardPrice, 
  item, 
  AddToCartBtn, 
  ReadMoreBtn) {
    card.classList.add("card", "mb-3", "mt-4");

    cardImg.classList.add("card-img-def", "ml-5" ); 
    cardImg.src = item.imageUrl;
    cardImg.alt = item.name;

    cardImg.style.width = "100px";
    cardImg.style.height = "auto";

    cardBody.classList.add("card-body", "mt-3");
    cardBody.style.width = "500px";

    cardFooter.classList.add(
    "card-footer",
    "justify-content-center");

    cardTitle.classList.add("card-title");
    cardTitle.textContent = item.name;

    cardDescription.classList.add("card-text");
    cardDescription.textContent = item.description;

    cardPrice.classList.add("card-text", "text-muted");
    cardPrice.textContent = item.price.toFixed(2) + " kr";

    ReadMoreBtn.classList.add("btn", "mx-1", "col-3");
    AddToCartBtn.classList.add("btn", "btn-success", "mx-1", "col-6");

}

function ReadMoreBtnClick(item){

}

function getWeather(){

const apiUrl = 'https://api.open-meteo.com/v1/forecast?latitude=57.350647&longitude=12.12149&current=temperature_2m&timezone=auto';

fetch(apiUrl)
  .then(response => {return response.json();
  })
  .then(data => {
    const temperature = data.current.temperature_2m;
        const temperatureElement = document.getElementById('currentTemperature');
        temperatureElement.textContent = "Alltid bra shopping väder! Väder I Åsa just nu:" + ` ${temperature}°C`;

  })
}