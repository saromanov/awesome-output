#!/usr/bin/env node
import Octokit = require('@octokit/rest');
import * as urls from 'get-urls';
const octokit = new Octokit();

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
        console.log(project);
        let data = project.split('/').reverse();
        let repo = data[0];
        let owner = data[1];
        console.log(repo, owner);
        octokit.repos.getReadme({owner, repo}).then(result => {
           let res = Buffer.from(result.data.content, 'base64').toString();
           res.split("\n").forEach(item => {
               console.log(findUrl(item));
           });
           //console.log(findUrls(res));
        }).catch(err => {
            console.log("unable to get readme: ", err)
        });
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

let out = new AwesomeOutput("");
out.get("https://github.com/avelino/awesome-go");

