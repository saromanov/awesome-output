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
        let data = project.split('/').reverse();
        let repo = data[0];
        let owner = data[1];
        console.log(repo, owner);
        octokit.repos.getReadme({owner, repo}).then(result => {
           let res = atob(result.data.content);
           console.log(res);
        });
    }  
}


/*

ReadMeReader providers reading of README file and return output
*/
class ReadmeReader {
    public static read(){
        let data = 0;
    }
}

let out = new AwesomeOutput("");
out.get("https://github.com/avelino/awesome-go");
