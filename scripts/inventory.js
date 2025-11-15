// inventory.js - Load cars from inventory.json and display as cards

fetch('../inventory.json')
  .then(response => response.json())
  .then(data => {
    const container = document.getElementById('inventory-container');

    if (!data || data.length === 0) {
      container.innerHTML = "<p>No vehicles available right now. Check back soon.</p>";
      return;
    }

    data.forEach(car => {
      const card = document.createElement('div');
      card.className = "car-card";

      // Use placeholder if car.image is missing
      const imageSrc = car.image ? `../images/${car.image}` : `../images/placeholder.jpg`;

      card.innerHTML = `
        <img src="${imageSrc}" alt="${car.make} ${car.model}">
        <h3>${car.year} ${car.make} ${car.model}</h3>
        <p>Price: $${car.price}</p>
        <p>Mileage: ${car.mileage}</p>
      `;

      container.appendChild(card);
    });
  })
  .catch(error => {
    console.error("Error loading inventory:", error);
    document.getElementById('inventory-container').innerHTML = "<p>Error loading inventory.</p>";
  });

