"use strict";
exports.__esModule = true;
var Octokit = require("@octokit/rest");
var octokit = new Octokit();
var AwesomeOutput = /** @class */ (function () {
    function AwesomeOutput(token) {
        this.token = token;
        this.github = octokit.authenticate({
            type: 'oauth',
            token: '123'
        });
    }
    AwesomeOutput.prototype.get = function (project) {
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
var out = new AwesomeOutput("123");
out.get("https://github.com/avelino/awesome-go");
