#!/usr/bin/env node
import Octokit = require('@octokit/rest');
import * as urls from 'get-urls';
import * as ok from 'os';
const octokit = new Octokit();

type RepoPath = {owner:string, name:string};
class AwesomeOutput {
    token:string;
    github: any;
    constructor(token:string ){
        this.token = token;
        octokit.authenticate({
            type: 'oauth',
            token: this.token
          })
    }

    get(project: string) {
        let data = project.split('/').reverse();
        let repo = data[0];
        let owner = data[1];
        console.log(repo, owner);
        octokit.repos.getReadme({owner, repo}).then(result => {
           let res = Buffer.from(result.data.content, 'base64').toString();
           res.split("\n").forEach(item => {
               let url = findUrl(item);
               if (url != "" && url.indexOf("github.com") != -1) {
                 console.log(this.getRepo(url));
               }
           });
           //console.log(findUrls(res));
        }).catch(err => {
            console.log("unable to get readme: ", err)
        });
    }
    
    getRepo(path:string):RepoPath|null {
        let data = path.split('/').reverse();
        if (data.length < 2) {
            return null;
        }
        return {owner: data[1], name: data[0]};
    }
}

function findUrl(text:string): string {
    let reg = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
    let result = reg.exec(text);
    if (result == null){
        return "";
    }
    return result[0];
}

let token = process.argv.slice(2)[0];
console.log(token);
let out = new AwesomeOutput(token);
out.get("https://github.com/avelino/awesome-go");

