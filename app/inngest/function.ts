
// import { createSandbox } from "../lib/sandbox";
// import { inngest } from "./client";


// export const solveIssue = inngest.createFunction(
//     {
//         id: "solve-github-issue",
//         triggers: [
//             {
//                 event: "github/issue.solve",
//             },
//         ],
//     },
//     async ({ event, step }) => {
//         const sandboxInfo = await step.run(
//             "create-sandbox",
//             async () => {
//                 const sandbox = await createSandbox();

//                 return {
//                     sandboxId: sandbox.sandboxId,
//                 };
//             }
//         );

//         return {
//             success: true,
//             sandboxId: sandboxInfo.sandboxId,
//         };
//     }
// );