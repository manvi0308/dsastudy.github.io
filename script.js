/*
    CREATE A DIV

    H2 -> PROBLEM NAME AND NUMBER
    P -> DESCRIPTION
    CODE -> RAW GITHUB LINK FOR EACH PROGRAM
    MARKDOWN -> NOTES

    TASKS
    1) FETCH THE QUESTIONS DATA
    2) Create a div and add elements to it.
*/

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

// Function to display the fetched data
function displayLeetcodeData() {
    fetchJSONData().then((leetcodeQuestionsData) => {
        if (leetcodeQuestionsData) {
            const questionsContainer = document.createElement("div");
            leetcodeQuestionsData.forEach(question => {
                const problemTitle = document.createElement("h3");
                const description = document.createElement("p");
                const codeContainer = document.createElement("iframe");
                problemTitle.textContent = `${question.id}.  ${question["Problem Name"]}`; // Including ID in title
                description.textContent = question.Description || "No description available."; // Fallback for empty description
                codeContainer.src = "https://raw.githubusercontent.com/manvi0308/DSAStudy/refs/heads/main/SlidingWindow/Problem1652.java";
                questionsContainer.appendChild(problemTitle);
                questionsContainer.appendChild(description);
                questionsContainer.appendChild(codeContainer);
                // https://rawcdn.githack.com/manvi0308/DSAStudy/refs/heads/main/SlidingWindow/Problem1652.java
            });

            document.body.appendChild(questionsContainer);
        } else {
            console.error("No data to display.");
        }
    });
}

// Call the function to display the data
displayLeetcodeData();