const submitButton = document.getElementById('submit-btn');
const resultElement = document.getElementById('result');
const previousSearchesList = document.getElementById('previous-searches-list');

async function getMessage(e) {
  e.preventDefault();

  const searchTerm = document.getElementById('search-bar').value;
  const finalSearchTerm = "Explain the following concept assuming that I'm a 5-year-old: " + searchTerm;

  const listItem = document.createElement('li');
  listItem.textContent = searchTerm;

  previousSearchesList.appendChild(listItem);

  const options = {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer PUT API KEY HERE',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: finalSearchTerm }],
      max_tokens: 100
    })
  };

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', options);
    const data = await response.json();

    const message = data.choices[0].message.content;

    resultElement.textContent = message;
  } catch (error) {
    console.error(error);
  }
}

submitButton.addEventListener('click', getMessage);
