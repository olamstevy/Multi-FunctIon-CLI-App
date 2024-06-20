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

/** Bulk rename files in a directory */
const bulkRenameFiles = async () => {
	const fs = require("fs");
	const path = require("path");

	/* // Prompt input for folder path
	const folder = await input("Enter folder path:"); */

	// For a folder in current working directory. e.g /images:
	const folder = path.join(__dirname, "images");

	const files = fs.readdirSync(folder);

	// Rename all the files in the folder
	files.forEach((file, index) => {
		const filePath = path.join(folder, file);
		const newFilePath = path.join(folder, `img${index + path.parse(file).ext}`);
		fs.rename(filePath, newFilePath, (err) => console.error(err || ""));
	});
};

/** Compress multiple images */
const bulkCompressImages = async () => {
	try {
		const path = require("path");
		const fs = require("fs");
		const sharp = require("sharp");

		// Recieve input and output paths
		const inputImgDir = await input("Please enter directory containing images");
		const outputImgDir =
			(await input("Please enter output directory")) || inputImgDir;
		if (!fs.existsSync(outputImgDir)) fs.mkdirSync(outputImgDir);

		// Get all images, compress them and save into output folder
		fs.readdirSync(inputImgDir).forEach((img) => {
			try {
				const outputFileName =
					inputImgDir === outputImgDir ? `compressed--${img}` : img;
				const outputPath = path.join(outputImgDir, outputFileName);

				sharp(path.join(inputImgDir, img))
					.resize(200, 200, { strategy: "cover" })
					.toFile(outputPath, (err) => {
						if (err) throw err;
						console.log(`..compressed ${img} into ${outputPath}`);
					});
			} catch (err) {
				console.error("Error: ", err.message);
			}
		});
	} catch (err) {
		console.error(err.message);
	}
};

// MAIN
(async () => {
	const projects = [
		"selectTextContent",
		"mostStarredProject",
		"bulkRenameFiles",
		"bulkCompressImages",
	];
	const chosenProject = process.argv[2];
	switch (chosenProject) {
		case projects[0]:
			await printTextContent();
			break;
		case projects[1]:
			await printMostStarredProject();
			break;
		case projects[2]:
			await bulkRenameFiles();
			break;
		case projects[3]:
			await bulkCompressImages();
			break;
		default:
			console.error(`ERROR: Please choose a valid project e.g: [${projects}]`);
			break;
	}
})();
