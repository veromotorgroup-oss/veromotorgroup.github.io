// inventory.js - load cars and show modal on click
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

      const imageSrc = car.image ? `../images/${car.image}` : `../images/placeholder.jpg`;

      card.innerHTML = `
        <img src="${imageSrc}" alt="${car.make} ${car.model}">
        <div class="car-card-content">
          <h3>${car.year} ${car.make} ${car.model}</h3>
          <p>Price: $${car.price}</p>
          <p>Mileage: ${car.mileage}</p>
          <a href="#" class="details-btn">View Details</a>
        </div>
      `;

      container.appendChild(card);

      // Modal functionality
      const btn = card.querySelector('.details-btn');
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        showCarModal(car);
      });
    });
  })
  .catch(error => {
    console.error("Error loading inventory:", error);
    document.getElementById('inventory-container').innerHTML = "<p>Error loading inventory.</p>";
  });

// Modal function
function showCarModal(car) {
  const imageSrc = car.image ? `../images/${car.image}` : `../images/placeholder.jpg`;

  const modalHtml = `
    <div class="modal-overlay">
      <div class="modal-content">
        <span class="close-modal">&times;</span>
        <h2>${car.year} ${car.make} ${car.model}</h2>
        <img src="${imageSrc}" alt="${car.make} ${car.model}">
        <p>${car.description || 'No description available.'}</p>
        <p><strong>Carfax:</strong> ${car.carfax || 'No Carfax info.'}</p>
      </div>
    </div>
  `;
  document.body.insertAdjacentHTML('beforeend', modalHtml);

  const modal = document.querySelector('.modal-overlay');
  modal.querySelector('.close-modal').addEventListener('click', () => modal.remove());
}
