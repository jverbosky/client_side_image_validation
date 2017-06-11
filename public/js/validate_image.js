// Compare uploaded image file signature against known MIME types
// Add more from:  http://en.wikipedia.org/wiki/List_of_file_signatures
function evaluateFileSignature(headerString) {
  switch (headerString) {
    case "89504e47":
      type = "image/png";
      break;
    case "47494638":
      type = "image/gif";
      break;
    case "ffd8ffe0":
    case "ffd8ffe1":
    case "ffd8ffe2":
      type = "image/jpeg";
      break;
    default:
      type = "unknown";
      break;
  }
  return type;
}

// Instantiate fileReader object, collect file signature and retrieve MIME type
function getMimeType(blob, callback) {
  
  var fileReader = new FileReader();  // instantiate new FileReader object

  fileReader.onloadend = function(e) {  // after file is loaded...
    var arr = (new Uint8Array(e.target.result)).subarray(0, 4);  // get file signature
    var header = "";  // tranlsate file signature from decimal to hex for easier comparison
    for(var i = 0; i < arr.length; i++) { header += arr[i].toString(16); }  
    var mimeType = evaluateFileSignature(header);
    callback(mimeType);  // retrieve mimeType for evaluation via evaluateMimeType()
  };

  fileReader.readAsArrayBuffer(blob);  // asynchronous function call
}

// ------------- line 1173 in results.js -------------

//////////////////upload photo
var input = document.querySelector("#inputFile");
input.addEventListener("change", function () {

//---- determine file signature via magic numbers ----

  var blob = input.files[0];  // retrieve file data

  getMimeType(blob, evaluateMimeType);  // fire off MIME type retrieval (asynchronous)

  // Callback function called in getMimeType() to evaluate mimeType for uploaded file
  function evaluateMimeType(mimeType) {
    if (mimeType === "unknown") {
      alert("Invalid file type - please load a valid image file.");
    } else {
      console.log(mimeType);  // log mimeType in console (review)

//---------------- logic to show image ----------------

      if (document.getElementById("showPic")) {
          $('#showPic').remove();
      }
      var file = input.files[0],
          url = URL.createObjectURL(file);
      img = document.createElement("img");
      img.src = url;
      img.style = "width:250px;height:250px"
      div = document.createElement("div");
      div.id = "showPic"
      div.appendChild(img);
      document.getElementById("showHere").appendChild(div);
    }
  }

//-------------- logic to add image to DB -------------

    // db2.get(id).then(function (doc) {
    //     return db2.put({


    //         _rev: doc._rev,
    //         _id: doc._id,
    //         auditnumber: $("#auditnumber").val(),
    //         workersexposed: doc.workersexposed,
    //         additionalcomments: doc.additionalcomments,
    //         exposures: doc.exposures,
    //         location: doc.location,
    //         submenu: doc.submenu,
    //         submenu2: doc.submenu2,
    //         interventions: doc.interventions,
    //         url: url,
    //         audit: doc.audit,
    //         _attachments: {
    //             "image": {
    //                 content_type: file.type,
    //                 data: file
    //             },

    //         },

    //     });


    // }).catch(function (err) {
    //     console.log(err);
    // }).then(function showAllTables() {
    //     showTablesLocal2();
    //     showTablesLocal();
    // });
})