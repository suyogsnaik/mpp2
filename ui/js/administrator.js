$(document).ready(function () {
    document.getElementsByClassName('tablinks')[0].click()
    administratorList();
  });

  // Get all administrators to display
  function administratorList() {
    // Call Web API to get a list of administrators
    $.ajax({
      url: 'http://a73e3537f79c1490e8982e58c5ebf424-bc22ad9319137302.elb.us-east-1.amazonaws.com/administrator/getall',
      type: 'POST',
      dataType: 'json',
      success: function (administrators) {

        
          
        $.each(administrators, function (index, administrator) {



     
         if ($("#AdministratorTable tbody").length == 0) {
           $("#AdministratorTable").append("<tbody></tbody>");
         }
     
         // Append row to <table>
         $("#AdministratorTable tbody").append("<tr>" +
         "<td>" + administrator.id + "</td>" +
         "<td>" + administrator.name + "</td>" +
         "<td>" + administrator.email + "</td>" +
       "</tr>");
         });
     
      },
      error: function (request, message, error) {
        handleException(request, message, error);
      }
    });
  }
 



  // Handle click event on Add button
  function addAdministrator() {
    administrator = new Object();
    administrator.id = $("#Administratorid").val();
    administrator.name = $("#Administratorname").val();
    administrator.email = $("#Administratoremail").val();

    if ($("#updateButton").text().trim() == "Add") {
      administratorAdd(administrator);
    }
  }
  function administratorAdd(administrator) {
    console.log(administrator)
    // Call Web API to add a new administrator
    $.ajax({
      url: "http://a73e3537f79c1490e8982e58c5ebf424-bc22ad9319137302.elb.us-east-1.amazonaws.com/administrator/new",
      type: 'POST',
      contentType: "application/json;charset=utf-8",
      data:JSON.stringify(administrator),

      success: function (administrator) {

        administratorAddSuccess(administrator);
      },
      error: function (request, message, error) {
        handleException(request, message, error);
      }
    });
  }
  function formClear() {
    $("#Administratorid").val('');
    $("#Administratorname").val('');

    $("#Administratoremail").val('');
  }
  function administratorAddSuccess(administrator) {
  administratorList()
    formClear();
  }

  // Handle exceptions from AJAX calls
  function handleException(request, message, error) {
    var msg = "";

    msg += "Code: " + request.status + "\n";
    msg += "Text: " + request.statusText + "\n";
    if (request.responseJSON != null) {
      msg += "Message" + request.responseJSON.Message + "\n";
    }

    alert(msg);
  }