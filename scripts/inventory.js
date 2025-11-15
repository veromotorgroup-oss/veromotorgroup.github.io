// Load inventory.json and display vehicles
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

      card.innerHTML = `
        <img src="${car.image || 'images/placeholder.jpg'}" alt="${car.make} ${car.model}">
        <h3>${car.year} ${car.make} ${car.model}</h3>
        <p>Price: $${car.price}</p>
        <p>Mileage: ${car.mileage} km</p>
        <p>${car.description || ''}</p>
      `;

      container.appendChild(card);
    });
  })
  .catch(error => {
    console.error("Error loading inventory:", error);
    document.getElementById('inventory-container').innerHTML = "<p>Error loading inventory.</p>";
  });
