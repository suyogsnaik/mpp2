$(document).ready(function () {
  document.getElementsByClassName('tablinks')[0].click()
    demandList();
  });

  // Get all demands to display
  function demandList() {
    // Call Web API to get a list of demands
    $.ajax({
      url: 'http://a73e3537f79c1490e8982e58c5ebf424-bc22ad9319137302.elb.us-east-1.amazonaws.com/demand/getall',
      type: 'POST',
      dataType: 'json',
      success: function (demands) {

        
          
        $.each(demands, function (index, demand) {


     
         if ($("#DemandTable tbody").length == 0) {
           $("#DemandTable").append("<tbody></tbody>");
         }
     
         // Append row to <table>
         $("#DemandTable tbody").append("<tr>" +
         "<td>" + demand.id + "</td>" +
         "<td>" + demand.quantity + "</td>" +
         "<td>" + demand.store + "</td>" +
       "</tr>");
         });
     
      },
      error: function (request, message, error) {
        handleException(request, message, error);
      }
    });
  }
 



  // Handle click event on Add button
  function addDemand() {
    demand = new Object();
    demand.id = $("#Demandid").val();
    demand.store = $("#Demandstore").val();
    demand.quantity = $("#Demandquantity").val();

    if ($("#updateButton").text().trim() == "Add") {
      demandAdd(demand);
    }
  }
  function demandAdd(demand) {
    // Call Web API to add a new demand
    $.ajax({
      url: "http://a73e3537f79c1490e8982e58c5ebf424-bc22ad9319137302.elb.us-east-1.amazonaws.com/demand/new",
      type: 'POST',
      contentType: "application/json;charset=utf-8",
      data:JSON.stringify(demand),

      success: function (demand) {

        demandAddSuccess(demand);
      },
      error: function (request, message, error) {
        handleException(request, message, error);
      }
    });
  }
  function demandformClear() {
    $("#Demandid").val('');
    $("#Demandquantity").val('');
    $("#Demandstore").val('');
  }
  function demandAddSuccess(demand) {
  demandList()
    demandformClear();
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