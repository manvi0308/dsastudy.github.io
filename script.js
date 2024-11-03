let leetcodeQuestionsData = null; // Store fetched data globally


// Function to fetch JSON data
function fetchJSONData() {
   return fetch("./List.json")
       .then((res) => {
           if (!res.ok) {
               throw new Error(`HTTP error! Status: ${res.status}`);
           }
           return res.json(); // Return the parsed JSON data
       })
       .catch((error) => {
           console.error("Unable to fetch data:", error);
           return null; // Return null in case of error
       });
}


// Main function that displays all the questions list
function displayList() {
   fetchJSONData().then((data) => {
       if (data) {
           leetcodeQuestionsData = data; // Store the data
           const questionsContainer = document.createElement("div");


           leetcodeQuestionsData.forEach(question => {
               const itag = document.createElement("i");
               itag.classList.add("fa-solid", "fa-caret-down");


               const ptag = document.createElement("p");
               ptag.appendChild(itag);
               ptag.append(` ${question.id}. ${question["Problem Name"]}`);


               questionsContainer.appendChild(ptag);


               // Add click event listener
               ptag.addEventListener("click", () => displayLeetcodeData(question.id));
           });


           document.body.append(questionsContainer); // Append the container to the body
       }
   });
}


// Function to fetch code from a raw GitHub link
function fetchCode(url) {
   console.log(`fetchCode called with id ${url}`);
   return fetch(url)
       .then((res) => {
           if (!res.ok) {
               throw new Error(`HTTP error! Status: ${res.status}`);
           }
           return res.text(); // Return the raw code as text
       })
       .catch((error) => {
           console.error("Unable to fetch code:", error);
           return null; // Return null in case of error
       });
}


// Function to display the fetched data
function displayLeetcodeData(id) {
   console.log("displayLeetcodeData called");
   const existingDetailContainer = document.querySelector('.detail-container');
   if (existingDetailContainer) {
       existingDetailContainer.remove(); // Remove existing detail container if it exists
   }


   if (leetcodeQuestionsData) {
       leetcodeQuestionsData.forEach((d) => {
           if (d.id === id) {
               const detailContainer = document.createElement("div");
               detailContainer.classList.add("detail-container"); // Add a class for easy selection
              
               const problemNameAndNumber = document.createElement("h3");
               const problemDescription = document.createElement("p");
               const code = document.createElement("pre");
               const insideCode = document.createElement("code");


               problemNameAndNumber.innerText = `${d.id}. ${d["Problem Name"]}`; // Set problem name and number
               problemDescription.innerText = d.Description; // Set problem description


               fetchCode(d.CodeLink).then(codeData => {
                   if (codeData) {
                       insideCode.innerText = codeData; // Set the code text here
                   }
               });


               code.appendChild(insideCode); // Append insideCode to code
               detailContainer.append(problemNameAndNumber, problemDescription, code);
               document.body.append(detailContainer);
           }
       });
   }
}


displayList();


