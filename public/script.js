let sampleOne = document.getElementById('sample1');

let textInput = 'This is a test input';
window.onload = sendVector();

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
  // console.log(outputs);
  const script = outputs.generated_text;
  console.log("output:", script);
  console.log("got text");
  sampleOne.innerHTML = script;
}
