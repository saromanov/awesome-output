"use strict";
exports.__esModule = true;
var Octokit = require("@octokit/rest");
var octokit = new Octokit();
var AwesomeOutput = /** @class */ (function () {
    function AwesomeOutput(token) {
        this.token = token;
        octokit.authenticate({
            type: 'oauth',
            token: this.token
        });
    }
    AwesomeOutput.prototype.get = function (project) {
        var data = project.split('/').reverse();
        var repo = data[0];
        var owner = data[1];
        console.log(repo, owner);
        octokit.repos.getReadme({ owner: owner, repo: repo }).then(function (result) {
            console.log(result);
        });
    };
    return AwesomeOutput;
}());
/*

ReadMeReader providers reading of README file and return output
*/
var ReadmeReader = /** @class */ (function () {
    function ReadmeReader() {
    }
    ReadmeReader.read = function () {
        var data = 0;
    };
    return ReadmeReader;
}());
var out = new AwesomeOutput("dabad95396a45fcf290b711d99cbb55b695fee48");
out.get("https://github.com/avelino/awesome-go");
