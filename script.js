document.addEventListener('DOMContentLoaded', () => {
  const themeToggle = document.getElementById('theme-toggle');
  const totalFollowersElement = document.querySelector('.foll');

  // Function to toggle the theme
  const toggleTheme = () => {
      document.body.classList.toggle('dark-theme');
      document.body.classList.toggle('light-theme');
  };

  // Event listener for theme toggle button
  themeToggle.addEventListener('click', toggleTheme);

  // Fetch data and update dashboard once the content has loaded
  fetchDataAndUpdate();
});

async function fetchDataAndUpdate() {
  try {
      const response = await fetch('data.json');
      const data = await response.json();
      updateDashboard(data);
  } catch (error) {
      console.error('Error fetching data:', error);
  }
}

// Function to update the dashboard with fetched data
function updateDashboard(data) {
  const cardsWrapper = document.querySelector('.card-overview');
  const miniCardWrapper = document.querySelector('.card-two');
  const totalFollowersElement = document.querySelector('.foll');

  // Update total followers
  totalFollowersElement.textContent = `Total followers: ${data.totalFollowers.toLocaleString()}`;

  // Clear existing content
  cardsWrapper.innerHTML = '';
  miniCardWrapper.innerHTML = '';

  // Populate main cards
  data.cards.forEach(card => {
      const cardElement = document.createElement('div');
      cardElement.className = `card ${card.type}`;
      cardElement.innerHTML = `
          <div class="card-header">
              <p><img class="img" src="${card.icon}" alt="${card.platform}">@${card.username}</p>
          </div>
          <div class="card-body">
              <h2>${card.followers}</h2>
              <p>FOLLOWERS</p>
              <div class="count"><img class="icon" src="${card.changeIcon}" alt="">${card.change} Today</div>
          </div>
      `;
      cardsWrapper.appendChild(cardElement);
  });

  // Populate mini cards
  data.miniCards.forEach(miniCard => {
      const miniCardElement = document.createElement('div');
      miniCardElement.className = 'card1';
      miniCardElement.innerHTML = `
          <div class="card-header">
              <p>${miniCard.title}<img class="image" src="${miniCard.icon}" alt="${miniCard.platform}"></p>
          </div>
          <div class="card1-body">
              <h2 class="no">${miniCard.number}</h2>
              <div class="fig"><img class="sign" src="${miniCard.changeIcon}" alt="">${miniCard.percentage}%</div>
          </div>
      `;
      miniCardWrapper.appendChild(miniCardElement);
  });
}
