function getNewUser() {
  fetch('https://randomuser.me/api/')
    .then(response => response.json())
    .then(data => {
      const newUser = data.results[0];
      const activeCard = document.querySelector('.user-card.active');
      updateCard(activeCard, newUser);
    });
}

function updateCard(card, newUser) {
  
  card.dataset.id = newUser.login.uuid;
  card.dataset.gender = newUser.gender;

  const iconEls = card.querySelectorAll('.values_list li');

  // Update card title and image
  card.querySelector('.user_title').textContent = `${newUser.name.first} ${newUser.name.last}`;
  card.querySelector('.round-image img').setAttribute('src', newUser.picture.large);

  // Update card values
  iconEls.forEach((iconEl) => {
    const label = iconEl.getAttribute('data-label');
    const userValueEl = card.querySelector(`#user_value_${card.dataset.id}`);

    switch (label) {
      case 'name':
        userValueEl.textContent = `${newUser.name.first} ${newUser.name.last}`;
        break;
      case 'location':
        userValueEl.textContent = `${newUser.location.street.number} ${newUser.location.street.name}`;
        break;
      case 'birthday':
        const birthday = new Date(newUser.dob.date);
        const birthdayString = `${birthday.getMonth() + 1}/${birthday.getDate()}/${birthday.getFullYear()}`;
        userValueEl.textContent = birthdayString;
        break;
      case 'pass':
        userValueEl.textContent = newUser.login.password;
        break;
      default:
        userValueEl.textContent = newUser[label];
        break;
    }
  });
}




// Select all user cards
let userCards = document.querySelectorAll('.user-card');

// Loop through all the user cards
userCards.forEach(card => {
  // Select all the icons
    let iconEls = card.querySelectorAll('.values_list li');
    iconEls[0].classList.add('active');

    // Add an event listener for mouseenter on each user card
    card.addEventListener('mouseenter', () => {
      // Remove the 'active' class from all user cards
        userCards.forEach(c => c.classList.remove('active'));
// Add the 'active' class to the current user card
        card.classList.add('active');
// Get the current user from the dataUsers array based on the current user card's ID
        let activeCard = document.querySelector('.user-card.active');
        let currentUser = dataUsers.find(user => user.login.uuid === activeCard.dataset.id);
// Add an event listener for mouseover on each icon
        iconEls.forEach((iconEl) => {
            iconEl.addEventListener('mouseover', (event) => {
               // Remove the 'active' class from all icons
                iconEls.forEach((el) => {
                el.classList.remove('active');
                });
        
                 // Add the 'active' class to the current icon
                 iconEl.classList.add('active');
        
                  // Get the label, title, user ID, and user value element based on the current icon
                let label = iconEl.getAttribute('data-label');
                let title = iconEl.getAttribute('data-title');
                let userId = card.getAttribute('data-id');
                let userValueEl = card.querySelector(`#user_value_${userId}`);
                    
                // Set the title of the user value element to the current icon's title
                card.querySelector('.user_title').textContent = title;


                // Set the user value based on the current icon's label
                    if (label === 'name') {
                        userValueEl.textContent = `${currentUser.name.first} ${currentUser.name.last}`;
                      } else if (label === 'location') {
                        userValueEl.textContent = ` ${currentUser.location.street.number} ${currentUser.location.street.name}`;
                      } else if (label === 'birthday') {
                        let birthday = new Date(currentUser.dob.date);
                        let birthdayString = `${birthday.getMonth()+1}/${birthday.getDate()}/${birthday.getFullYear()}`;
                        userValueEl.textContent = birthdayString;
                      } else if (label === 'pass') {
                        userValueEl.textContent = currentUser.login.password;
                      } else {
                        userValueEl.textContent = currentUser[label];
                      }
                      
        });
        });
    });
});


//•	a gender filter

const allButton = document.querySelector('[data-gender="all"]');
const maleButton = document.querySelector('[data-gender="male"]');
const femaleButton = document.querySelector('[data-gender="female"]');


allButton.addEventListener('click', function() {

  document.querySelectorAll('.user-card').forEach(function(card) {
    card.style.display = 'flex';
  });

  document.querySelectorAll('.gender-button').forEach(function(button) {
    button.classList.remove('active');
  });

  allButton.classList.add('active');
});

maleButton.addEventListener('click', function() {

  document.querySelectorAll('.user-card').forEach(function(card) {
    if (card.dataset.gender !== 'male') {
      card.style.display = 'none';
    } else {
      card.style.display = 'flex';
    }
  });

  document.querySelectorAll('.gender-button').forEach(function(button) {
    button.classList.remove('active');
  });

  maleButton.classList.add('active');
});

femaleButton.addEventListener('click', function() {

  document.querySelectorAll('.user-card').forEach(function(card) {
    if (card.dataset.gender !== 'female') {
      card.style.display = 'none';
    } else {
      card.style.display = 'flex';
    }
  });

  document.querySelectorAll('.gender-button').forEach(function(button) {
    button.classList.remove('active');
  });

  femaleButton.classList.add('active');
});

//•	delete a specific user card

const deleteButtons = document.querySelectorAll('.delete-button');
deleteButtons.forEach(button => {
  button.addEventListener('click', () => {
    const card = button.parentNode.parentNode;
    card.remove();
  });
});


  