//fetch route from server

let sampleOne = document.getElementById('sample1');
let sampleTwo = document.getElementById('sample2');
let sampleThree = document.getElementById('sample3');
let textInput = "";

window.onload = function () {
  fetch("/scifi-random")
    .then(response => response.json())
    .then(data => {
      console.log(data.message);
      sampleTwo.innerHTML = data.message[1];
      textInput = data.message[0];
      sendVector();
    })
}

async function sendVector() {
  console.log("sending text");

  const data = {
    prompt: textInput
  }

  const info = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };

  console.log(data);

  const response = await fetch("/runwayml", info);
  console.log("input:", info.body);
  const outputs = await response.json();
  const script = outputs.generated_text;
  console.log("output:", script);
  console.log("got text");
  sampleOne.innerHTML = script;
}
