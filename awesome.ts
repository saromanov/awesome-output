#!/usr/bin/env node
import Octokit = require('@octokit/rest');
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
           console.log(res);
        }).catch(err => {
            console.log("unable to get readme: ", err)
        });
    }  
}

let out = new AwesomeOutput("");
out.get("https://github.com/avelino/awesome-go");

