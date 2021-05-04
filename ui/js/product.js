var bucketname = 'markretailbucket';
var s3 = new AWS.S3({
  apiVersion: '2006-03-01',
  params: {Bucket: bucketname}
});

$(document).ready(function () {
    document.getElementsByClassName('tablinks')[0].click()
    productList();
  });

  // Get all products to display
  function productList() {
    // Call Web API to get a list of products
    $.ajax({
      url: 'http://a73e3537f79c1490e8982e58c5ebf424-bc22ad9319137302.elb.us-east-1.amazonaws.com/product/getall',
      type: 'POST',
      dataType: 'json',
      success: function (products) {

        
          
        $.each(products, function (index, product) {


           // Add a row to the product table

     
         if ($("#ProductTable tbody").length == 0) {
           $("#ProductTable").append("<tbody></tbody>");
         }

         // Append row to <table>
         $("#ProductTable tbody").append("<tr>" +
         "<td>" + product.id + "</td>" +
         "<td>" + product.name + "</td>" +
         "<td>" + product.SKU + "</td>" +
         "<td>" + product.weight + "</td>" +
       "</tr>");
         });
     
      },
      error: function (request, message, error) {
        handleException(request, message, error);
      }
    });
  }
 



  // Handle click event on Add button
  function addProduct() {
    product = new Object();
    product.id = $("#Productid").val();
    product.name = $("#Productname").val();
    product.SKU = $("#ProductSKU").val();
    product.weight = $("#Productweight").val();

    if ($("#updateButton").text().trim() == "Add") {
      productAdd(product);
    }
  }
  function AddProductDataSheet(){
    if (!files.length) {
      return alert('Please choose a file to upload first.');
    }
    var file = files[0];
    var fileName = file.name;
    var actual_key ='datasheet/'+fileName
    s3.upload({
      Key: actual_key,
      Body: file
    }, function(err, data) {
      if (err) {
          console.log(file)

          console.log(err.message)

          return alert('There was an error uploading your resume: ', err.message);
      }
      jQuery(".loader_div").hide();
      alert('Successfully uploaded resume.');
     });
  

  }
  function productAdd(product) {
    // Call Web API to add a new product
    $.ajax({
      url: "http://a73e3537f79c1490e8982e58c5ebf424-bc22ad9319137302.elb.us-east-1.amazonaws.com/product/new",
      type: 'POST',
      contentType: "application/json;charset=utf-8",
      data:JSON.stringify(product),

      success: function (product) {

        productAddSuccess(product);
      },
      error: function (request, message, error) {
        handleException(request, message, error);
      }
    });
  }
  function productformClear() {
    console.log("emptying forms")
    $("#Productid").val('');
    $("#Productname").val('');
     $("#ProductSKU").val('');
    $("#Productweight").val('');
  }
  function productAddSuccess(product) {
    console.log(product)
    productformClear();
    productList()

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
