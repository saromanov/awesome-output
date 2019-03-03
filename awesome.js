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
        var _this = this;
        var data = project.split('/').reverse();
        var repo = data[0];
        var owner = data[1];
        console.log(repo, owner);
        octokit.repos.getReadme({ owner: owner, repo: repo }).then(function (result) {
            var res = Buffer.from(result.data.content, 'base64').toString();
            res.split("\n").forEach(function (item) {
                var url = findUrl(item);
                if (url != "" && url.indexOf("github.com") != -1) {
                    var prop = _this.getRepoNames(url);
                    _this.getRepo(prop);
                }
            });
            //console.log(findUrls(res));
        })["catch"](function (err) {
            console.log("unable to get readme: ", err);
        });
    };
    AwesomeOutput.prototype.getRepoNames = function (path) {
        var data = path.split('/').reverse();
        if (data.length < 2) {
            return null;
        }
        return { owner: data[1], name: data[0] };
    };
    AwesomeOutput.prototype.getRepo = function (path) {
        octokit.repos.get({ owner: path.owner, repo: path.name }).then(function (result) {
            console.log(result.data.full_name, result.data.stargazers_count);
        });
    };
    return AwesomeOutput;
}());
function findUrl(text) {
    var reg = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
    var result = reg.exec(text);
    if (result == null) {
        return "";
    }
    return result[0];
}
var token = process.argv.slice(2)[0];
console.log(token);
var out = new AwesomeOutput(token);
out.get("https://github.com/avelino/awesome-go");
