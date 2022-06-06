export default async function attachRandomParagraph(parentNode: HTMLElement) {
  const response = await fetch("http://metaphorpsum.com/sentences/10");
  const paragraph = await response.text();

  const htmlText = paragraph.split(" ").map((word, index) => {
    const span = document.createElement("span");

    span.textContent = word;
    span.setAttribute("id", (index + 1).toString());
    span.classList.add("panel__word");

    return span;
  });

  for (const child of htmlText) {
    const whitespace = document.createElement("span");

    whitespace.textContent = " ";
    parentNode.appendChild(child);

    parentNode.append(child, whitespace);
  }

  return { paragraph, htmlText };
}
