// document.addEventListener("DOMContentLoaded", function () {
//   // Send the YouTube URL to the Flask server on popup load
//   sendYouTubeUrlOnLoad();
//   function sendYouTubeUrlOnLoad() {
//     // Get the current active tab
//     chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
//       var url = tabs[0].url;
//       console.log(url)
//    //   const youtubeUrl = extractYouTubeUrl(activeTab.url);

//     //   if (youtubeUrl) {
//     //     const data = {
//     //       youtube_url: youtubeUrl,
//     //     };
        
//         fetch("http://localhost:5000/video_data", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({youtubeUrl:url}),
//         })
//           .then((response) => response.json())
//           .then((data) => {
//             console.log("Response from Flask server:", data);
//           })
//         //   .catch((error) => {
//         //     console.error("Error sending data to server:", error);
//         //   }

//           return fetch('http://localhost:5000/video_data'),{
//             method:"GET",
//             headers: {
//         'Content-Type': 'application/json',
//       },
//           });
//         })
//      .then(response => response.json())
//      .then(data => {
//        // Now you can use the data in your extension
//        var gisttext=data['gist']
//        var gistpara=document.getElementById("summary")
//        gistpara.innerHTML=gisttext;
//     //    console.log(data);
//      })
//     //  .catch(error => console.error('Error:', error));

//     //   } else {
//     //     console.error("Not a valid YouTube video URL.");
//     //   }
    
  
//     });
// )
document.addEventListener("DOMContentLoaded", function () {
    // Handle the button click event
    document.getElementById("sendDataButton").addEventListener("click", async function () {
        await sendDataToServer();
        await getDataFromServer();
    });

    // Function to send POST request to the Flask server
    async function sendDataToServer() {
        const inputData = document.getElementById("dataInput").value;

        try {
            const response = await fetch("http://localhost:5000/post_data", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ input_data: inputData }),
            });

            const data = await response.json();
            console.log("Response from Flask server:", data);
        } catch (error) {
            console.error("Error sending data to server:", error);
        }
    }

    // Function to send a GET request to the Flask server on popup load
    async function getDataFromServer() {
        try {
            const response = await fetch("http://localhost:5000/post_data");
            const data = await response.json();

            console.log("Answer from Model:", data);

            var text = document.getElementById("answer")
            text.innerHTML = data['text'] + "<br>Time-stamp: " + data["time"];

        } catch (error) {
            console.error("Error fetching data from server:", error);
        }
    }
});



document.addEventListener("DOMContentLoaded", function () {
  // Send the YouTube URL to the Flask server on popup load
  sendYouTubeUrlOnLoad();

  async function sendYouTubeUrlOnLoad() {
    // Get the current active tab
    chrome.tabs.query({ active: true, currentWindow: true }, async function (tabs) {
      var url = tabs[0].url;
      console.log(url)

      try {
        const postResponse = await fetch("http://localhost:5000/video_data", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({youtubeUrl:url}),
        });
        const postData = await postResponse.json();
        console.log("Summary from Flask server:", postData);

        const getResponse = await fetch('http://localhost:5000/video_data', {
          method:"GET",
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const getData = await getResponse.json();
        console.log("Data from GET request:", getData); // Log the data from the GET request

        // Check if 'gist' is in the data
        if ('gist' in postData) {
        
          var gistElement = document.getElementById("summary")
          var gistElement = document.getElementById("summary");
for (var key in postData) {
    if (postData.hasOwnProperty(key)) {
        gistElement.innerHTML = postData[key] + " <br>";
    }
}

        //   gistElement.innerHTML = arr;
        } else {
          console.error("'gist' not in data");
        }
      } catch (error) {
        console.error('Error:', error);
      }
    });
  }
});
