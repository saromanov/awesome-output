#!/usr/bin/env node
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
        console.log(project);
        var data = project.split('/').reverse();
        var repo = data[0];
        var owner = data[1];
        console.log(repo, owner);
        octokit.repos.getReadme({ owner: owner, repo: repo }).then(function (result) {
            var res = Buffer.from(result.data.content, 'base64').toString();
            //console.log(res);
            console.log(findUrls(res));
        })["catch"](function (err) {
            console.log("unable to get readme: ", err);
        });
    };
    return AwesomeOutput;
}());
function findUrls(text) {
    var urls = new RegExp("^|[ \t\r\n]((http|https):(([A-Za-z0-9$_.+!*(),;/?:@&~=-])|%[A-Fa-f0-9]{2}){2,}(#([a-zA-Z0-9][a-zA-Z0-9$_.+!*(),;/?:@&~=%-]*))?([A-Za-z0-9$_+!*();/?:~-]))", "g");
    return text.match(urls);
}
var out = new AwesomeOutput("");
out.get("https://github.com/avelino/awesome-go");
