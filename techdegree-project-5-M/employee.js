let employees = [];



  // Capatilazes first word of strings
  function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

// Builds each object 
function addEmployeesToDirectory(employees) {
  var galleryHTML = "<ul class='directory'>";
  $.each(employees, function(i, employee) {
      var firstName = capitalize(employee.name.first);
      var lastName = capitalize(employee.name.last);
      var city = capitalize(employee.location.city);
      galleryHTML += '<li id="' + i + '">';
      galleryHTML += '<a> <img src="' + employee.picture.large + '"></a>';
      galleryHTML += '<p><strong>' + firstName + ' ' + lastName + '</strong><br>';
      galleryHTML += employee.email + '<br>';
      galleryHTML += city + '</p></li>';
  });
  galleryHTML += '</ul>'
  $('.employee-directory').html(galleryHTML);
}

//Adds information to the modal (email, number, adress, birthday, username)
function employeeClickEventListener() {
  $('li').click(function() {
    var id = $(this).attr('id');
    var idNumber = parseInt(id, 10);
    employeeModal(idNumber);
  })
}

//Brings out the modal and blocks the background
function employeeModal(index) {
  var employee = employees[index];
  var firstName = capitalize(employee.name.first);
  var lastName = capitalize(employee.name.last);
  var dateOfBirth = formatDateOfBirth(employee.dob);
  var modalContent = '<div class="modal-content">';
  let address = formatAddress(employee);
  modalContent += '<span class="close">&times;</span>';
  modalContent += '<img src=" ' + employee.picture.large + '">';
  modalContent += '<p><strong>' + firstName + ' ' + lastName + '</strong><br>';
  modalContent += '<br>' + employee.login.username + '<br>' + employee.email + '<br>';
  modalContent += '<br><hr><br>' + employee.cell + '<br><br>';
  modalContent += address + '<br>';
  modalContent += 'Birthday: ' + dateOfBirth + '</p>';
  modalContent += '<span class="buttons">';
  modalContent += '<button class="back">Back</button>';
  modalContent += '<button class="next">Next Employee</button></span>';
  modalContent += '</div>';
  $('#employee-modal').append(modalContent);
  $('.modal').css('display', 'block');
  addEventListenerToModal(index);
}

//Adds date to date of birth
function formatDateOfBirth(string) {
  var date = new Date(Date.parse(string));
  var month = date.getMonth() + 1;
  var day = date.getDate();
  var year = date.getYear();
  var dateOfBirth = month + '-' + day + "-" + year;
  return dateOfBirth;
}

//adds address to modal
function formatAddress(employee) {
  var city = capitalize(employee.location.city);
  var state = capitalize(employee.location.state);
  var address = employee.location.street + '<br>'
  address += city + ', ' + state;
  address += ' ' + employee.location.postcode + ', ';
  address += employee.nat + '<br>';
  return address;
}

//Adding the 'x', next, and back button in the modal
function addEventListenerToModal(idNumber) {
  $('.close').click(function() {
    $('.modal').css('display', 'none');
    $('.modal-content').remove();
  })

  $('.back').click(function() {
    var last = idNumber - 1;
    if (idNumber > 0) {
      $('.modal-content').remove();
      employeeModal(last);
    }
  })

  $('.next').click(function() {
    var next = idNumber + 1;
    if (idNumber <11) {
      $('.modal-content').remove();
      employeeModal(next);
    }
  })
}

//shows employess that match , what is added in the searh input
function searchEmployees(input) {
  var searchTerm = input.toLowerCase();
  var $employees = $('p:contains(' + searchTerm + ')').closest('li');
  $('li').hide();
  $employees.show();
}

$('#search').keyup(function() {
  var searchTerm = $('#search').val()
  searchEmployees(searchTerm);
})

//Gets  12 employees from the API
$.ajax({
  url: 'https://randomuser.me/api/?results=12&nat=us',
  dataType: 'json',
  success: function(data) {
    employees = data.results;
    addEmployeesToDirectory(employees);
    employeeClickEventListener();
  }
});
