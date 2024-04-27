// Fetching data from the API and checking for errors
fetch('https://hp-api.onrender.com/api/characters')
  .then(response => {
    // Checking if the response is okay
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    // Converting the response to JSON format
    return response.json();
  })
  // Rendering the fetched data
  .then(result => {
    // Check if the result contains the expected structure
    if (!Array.isArray(result)) {
      throw new Error('Unexpected data structure in API response');
    }
    // Calling the function to render characters
    renderCharacters(result);
  })
  // Catching and logging errors
  .catch(error => console.error("Error occurred while fetching data", error));

// Function to render characters onto the webpage
function renderCharacters(characters) {
  // Selecting the container where characters will be rendered
  const cardContainer = document.querySelector(".cardContainer");

  // Looping through each character to create a card for it
  characters.forEach(character => {
    // Extracting information about the character
    const { name, image, alternate_names, house, ancestry, actor } = character;
    // Creating a card element for the character
    const card = createCard(name, image, alternate_names, house, ancestry, actor);
    // Appending the card to the container
    cardContainer.appendChild(card);
  });
}

// Function to create a card for a character
function createCard(name, image, alternate_names, house, ancestry, actor) {
  // Creating a div element for the card
  const card = document.createElement("div");
  card.classList.add("col-lg-4", "col-md-6", "mb-4");

  // HTML content for the card
  const cardContent = `
    <div class="card">
      <img src="${image}" class="card-img-top" alt="${name}">
      <div class="card-body">
        <h5 class="card-title">${name}</h5>
        <p class="alternate_names">Alternate Names: ${alternate_names}</p>
        <p class="house">House: ${house}</p>
        <p class="ancestry">Ancestry: ${ancestry}</p>
        <p class="actor">Actor: ${actor}</p>
      </div>
    </div>
  `;

  // Setting the HTML content to the card element
  card.innerHTML = cardContent;
  // Returning the card element
  return card;
}
