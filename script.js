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

// Main function that display all the questions list
function displayList() {
    fetchJSONData().then((leetcodeQuestionsData) => {
        if (leetcodeQuestionsData) {
            const questionsContainer = document.createElement("div");

            leetcodeQuestionsData.forEach(question => {
                const ptag = document.createElement("p"); // Create a new <p> for each question
                ptag.innerHTML = `${question.id}. ${question["Problem Name"]}`; // Set the inner HTML with question details
                questionsContainer.appendChild(ptag); // Append the new <p> to the container
                
                // Fix: Use an anonymous function to call displayLeetcodeData
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
    fetchJSONData().then((data) => {
        console.log("displayLeetcodeData called");
        if (data) {
            data.forEach((d) => {
                if (d.id === id) {
                    const detailContainer = document.createElement("div");
                    const problemNameAndNumber = document.createElement("h3");
                    const problemDescription = document.createElement("p");
                    const code = document.createElement("pre");
                    const insideCode = document.createElement("code");
                    code.append(insideCode);

                    problemNameAndNumber.innerText = `${d.id}. ${d["Problem Name"]}`; // Set problem name and number
                    problemDescription.innerText = d.Description; // Set problem description

                    fetchCode(d.CodeLink).then(codeData => {
                        if (codeData) {
                            insideCode.innerText = codeData; // Set the code text here
                        }
                    });

                    detailContainer.append(problemNameAndNumber);
                    detailContainer.append(problemDescription);
                    detailContainer.append(code);
                    document.body.append(detailContainer);
                }
            });
        }
    });
}

displayList();