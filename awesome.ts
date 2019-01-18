import Octokit = require('@octokit/rest');
const octokit = new Octokit();

class AwesomeOutput {
    token:string;
    github: any;
    constructor(token:string ){
        this.token = token;
        this.github = octokit.authenticate({
            type: 'oauth',
            token: '123'
          })
    }

    get(project: string) {

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

let out = new AwesomeOutput("123");
out.get("https://github.com/avelino/awesome-go");
