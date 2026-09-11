// import { Octokit } from "octokit";
// import { inngest } from "../inngest/client";

// export async function issuesSolver(
//     repoUrl: string,
//     issueNumber: string
// ) {
//     const octokit = new Octokit();

//     const url = new URL(repoUrl);

//     const [owner, repo] = url.pathname
//         .split("/")
//         .filter(Boolean);

//     if (!owner || !repo) {
//         throw new Error("Invalid GitHub repository URL");
//     }

//     const { data: issue } = await octokit.rest.issues.get({
//         owner,
//         repo,
//         issue_number: Number(issueNumber),
//     });
//    //Inngest code here 
//    await inngest
    

//     return issue;
// }

