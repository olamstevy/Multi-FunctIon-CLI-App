/*

PROJECTS
2. An application that optionally takes two dates and prints the most starred GitHub projects in that date range. Hint you can use GitHub’s search API

3. Bulk rename files in a directory. Hint you can use fs and path

4. Write a CLI application that takes a path as input and compresses all the images in that directory. It should accept an option for output path; if the output path is not given it should compress images in place otherwise write the compressed images to the output path. Hint you can use sharp. 
*/

// Simple prompt-input function
const readline = require("readline");
/** Returns the value of a requested prompt @param {string} text @returns string */
function input(text) {
	return new Promise((resolve) => {
		const rd = readline.createInterface(process.stdin, process.stdout);
		rd.question(`${text || ""}\n`, (value) => {
			rd.close();
			const inputValue = value;
			resolve(value);
		});
	});
}

// A CLI APP THAT TAKES IN URL AND CSS SELECTOR ARGUMENTS AND THEN PRINTS THE TEXT CONTENT OF THE ELEMENT THAT MATCHES THE SELECTOR
async function selectTextContent() {
	const cheerio = require("cheerio");
	/** Returns text context of selector in a url @param {string} url @param {string} selector @returns null */
	const getTextContent = (url, selector) =>
		fetch(url)
			.then((res) => res.text())
			.then((urlTextContent) => {
				const document = cheerio.load(urlTextContent);
				const heroTextContent = document(selector).text();
				console.log(heroTextContent);
			})
			.catch((err) => console.log(err));

	let url = await input("Please enter URL");
	let selector = await input("Please enter Selector");
	getTextContent(url, selector);
}

(async () => {
	const projects = ["selectTextContent"];
	const chosenProject = process.argv[2];
	if (!projects.includes(chosenProject))
		console.error("ERROR: Please choose a valid project");

	if (chosenProject === projects[0]) return await selectTextContent();
})();
