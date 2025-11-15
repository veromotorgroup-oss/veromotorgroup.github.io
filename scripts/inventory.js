fetch('inventory.json')
.then(response => response.json())
.then(data => {
  const container = document.getElementById('inventory-container');

  if (!data || data.length === 0) {
    container.innerHTML = "<p style='color: #f5f5f5;'>No vehicles available right now. Check back soon.</p>";
    return;
  }

  data.forEach(car => {
    const card = document.createElement('div');
    card.className = "car-card";

    const imageSrc = car.image ? `images/${car.image}` : `images/placeholder.jpg`;

    card.innerHTML = `
      <img src="${imageSrc}" alt="${car.make} ${car.model}">
      <div class="car-card-content">
        <h3>${car.year} ${car.make} ${car.model}</h3>
        <p>Price: $${car.price}</p>
        <p>Mileage: ${car.mileage}</p>
        <a href="vehicle.html?id=${car.id}" class="details-btn">View Details</a>
      </div>
    `;
    container.appendChild(card);
  });
})
.catch(error => {
  console.error("Error loading inventory:", error);
  document.getElementById('inventory-container').innerHTML = "<p style='color: #f5f5f5;'>Error loading inventory.</p>";
});


