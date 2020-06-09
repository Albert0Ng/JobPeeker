//This code is by Gabe

function vis() {
    ​
    $("button").click(function(){
    var db = $("#db").val();
    var name = $("#name").val();
    var querytype = $("#query").val();
    ​
    ​
      $.post("demo_test.asp", function(data, status){
        alert("Data: " + data + "\nStatus: " + status);
      });
    });
    ​
    parser = new DOMParser();
    xmlDoc = parser.parseFromString(text,"text/xml");
    ​
    return xmlDoc;
    }

    //This code is by Gabe