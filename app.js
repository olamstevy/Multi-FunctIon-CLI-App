/*
REMAINING PROJECTS
2. An application that optionally takes two dates and prints the most starred GitHub projects in that date range. Hint you can use GitHub’s search API

3. Bulk rename files in a directory. Hint you can use fs and path

4. Write a CLI application that takes a path as input and compresses all the images in that directory. It should accept an option for output path; if the output path is not given it should compress images in place otherwise write the compressed images to the output path. Hint you can use sharp. 
*/

const readline = require("readline");
/** Returns the value of a requested prompt in command line @param {string} text @returns string */
const input = (text) =>
	new Promise((resolve) => {
		const rd = readline.createInterface(process.stdin, process.stdout);
		rd.question(`${text || ""}\n`, (value) => {
			rd.close();
			const inputValue = value;
			resolve(value);
		});
	});

/** Prints text content of element that matches a given selector in a given url */
const printTextContent = async () => {
	try {
		const cheerio = require("cheerio");
		const url = await input("Please enter url");
		const selector = await input("Please enter selector");
		const urlTextContent = await (await fetch(url)).text();

		const $ = cheerio.load(urlTextContent);
		console.log($(selector).text() || "Error: This element does not exist");
	} catch (err) {
		console.error(err);
	}
};

/** Prints most starred project on github between two dates @param {string?} startDate @param {string?} endDate */
const printMostStarredProject = async () => {
	const octokit = new (await import("octokit")).Octokit({});
	const dateFrom = await input("Enter start date (YYYY-MM-DD)");
	const dateTo = await input("Enter end date (YYYY-MM-DD)");

	try {
		const res = await octokit.request(
			`GET /search/repositories?q=created:${dateFrom}..${dateTo}&sort=stars`,
			{ headers: { "X-GitHub-Api-Version": "2022-11-28" }, per_page: 1 }
		);

		if (res.data.items.length === 0) {
			console.log("No repositories found in the given date range.");
			return;
		}

		const repoDetails = res.data.items.map((repo) => ({
			name: repo.name,
			desc: repo.description,
			link: repo.html_url,
			created_at: repo.created_at,
			updated_at: repo.updated_at,
			pushed_at: repo.pushed_at,
			stars: repo.stargazers_count,
		}));
		console.log(repoDetails);
	} catch (err) {
		console.error(err);
	}
};

// MAIN
(async () => {
	const projects = ["selectTextContent", "mostStarredProject"];
	const chosenProject = process.argv[2];
	switch (chosenProject) {
		case projects[0]:
			await printTextContent();
			break;
		case projects[1]:
			await printMostStarredProject();
			break;
		default:
			console.error(`ERROR: Please choose a valid project e.g: [${projects}]`);
			break;
	}
})();
