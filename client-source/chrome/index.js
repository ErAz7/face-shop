const commandLine = require("child_process");

const pathToChrome = `C:/Program Files (x86)/Google/Chrome/Application/chrome.exe`;

commandLine.exec(
	`"${pathToChrome}" localhost --disable-web-security --user-data-dir=./chrome/tmp`,
	(error, stdout, stderr) => {
		console.log(error || "", stdout, stderr);
	}
);
